<script lang="ts">
  import { onMount } from "svelte";
  import { bootGame } from "./boot";
  import UIContainer from "./components/UI/UIContainer.svelte";
  import UIMenu from "./components/UI/UIMenu.svelte";
  import { createComponentSystem, createLoadingStateSystem } from "./systems";
  import { network as networkStore, blockNumber } from "./modules/network";
  import { playerCore } from "./modules/player";
  import { initActionSequencer } from "./modules/actionSequencer";

  onMount(async () => {
    const layers = await bootGame();

    networkStore.set(layers.network);

    // Create systems to listen to component changes
    for (const componentKey of Object.keys(layers.network.components)) {
      if (componentKey === "LoadingState") {
        createLoadingStateSystem(layers.network);
      } else {
        createComponentSystem(layers.network, componentKey);
      }
    }

    // Initialize the action sequencer
    initActionSequencer();

    layers.network.network.blockNumber$.subscribe((x) => {
      blockNumber.set(x);
    });
  });
</script>

{#if $playerCore}
  <UIMenu />
{/if}
<main>
  <UIContainer />
</main>
