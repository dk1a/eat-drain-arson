import { get } from "svelte/store";
import { network, blockNumber } from "../../stores/network";
import { entities } from "../../stores/entities";
import { playerAddress } from "../../stores/player";

export function south() {
  if (get(entities)[get(playerAddress)].energy >= 30) {
    get(network).api?.move(30, 3);
    return true;
  } else {
    console.log("Walk: not enough energy");
    return false;
  }
}
