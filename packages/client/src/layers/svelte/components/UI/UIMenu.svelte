<script>
  import { fade } from "svelte/transition";
  import { menuVisible, uiState, speed, fragSpeed } from "./index";
  import { playSound } from "../../../howler";
  import { playerAddress } from "../../modules/player";

  const toggle = () => {
    playSound("cursor", "ui");
    $menuVisible = !$menuVisible;
  };
</script>

{#if $playerAddress}
  <div class="ui-menu-container" class:open={$menuVisible}>
    <button class="ui-button" on:click={toggle}>Menu</button>

    {#if $menuVisible}
      <ul class="ui-menu">
        {#each Object.values($uiState) as item, i (item.id)}
          {#if !item.options.persistent && !item.hidden}
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <li
              in:fade={{ duration: $speed + $fragSpeed * i }}
              class="ui-menu-item"
              on:click={() => {
                uiState.toggle(item.id, "active");
              }}
            >
              [{item.active ? "x" : "/"}] {item.title}
            </li>
          {/if}
        {/each}
      </ul>
    {/if}
  </div>
{/if}

<style>
  .ui-menu-container {
    position: fixed;
    top: var(--row-gap);
    left: var(--row-gap);
    border: var(--outer-border);
    z-index: 9;
    transition: all 0.2s ease-out;
    height: var(--taskbar-height);
    width: 54px;
    background-color: var(--background);
    /* background-color: rgba(var(--background-rgb), var(--muted-opacity)); */
    /* backdrop-filter: var(--backdrop);
    -webkit-backdrop-filter: var(--backdrop); */
    user-select: none;
  }
  .ui-menu-container.open {
    width: 200px;
    height: 140px;
    /* position: fixed; */
  }

  .ui-button {
    all: unset;
    box-sizing: border-box;
    padding: var(--padding-button);
    /* height: auto; */
    cursor: pointer;
    font-weight: bold;
  }

  .ui-menu {
    all: unset;
    display: block;
    cursor: pointer;
    list-style-type: none;
    z-index: 999;
    padding: var(--padding-button);
    font-weight: bold;
    overflow-x: hidden;
  }

  .ui-menu-item {
    white-space: nowrap;
  }
</style>
