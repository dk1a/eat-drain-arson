<script lang="ts">
  import { playerBaseEntity } from "../../modules/player";
  import { network } from "../../modules/network";

  let spawning = false;

  function spawn() {
    spawning = true;
    $network.api?.spawn();
  }
</script>

<div class="ui-spawn">
  {#if spawning}
    <div>Spawning...</div>
  {:else}
    <button on:click={spawn}>
      {#if $playerBaseEntity}
        Spawn
      {:else}
        Spawn
      {/if}
    </button>
  {/if}
</div>

<style>
  .ui-spawn {
    width: 100%;
    height: 100%;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  button {
    display: block;
    cursor: pointer;
    color: var(--foreground);
    font-family: var(--font-family);
    text-transform: uppercase;
    position: relative;
    padding: var(--padding-button);
    background: transparent;
    border: 1px solid white;
  }
</style>
