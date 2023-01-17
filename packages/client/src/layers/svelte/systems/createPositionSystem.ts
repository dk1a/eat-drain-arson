import { get } from "svelte/store";
import { defineComponentSystem } from "@latticexyz/recs";
import type { NetworkLayer } from "../../network";
import { entities, indexToID } from "../modules/entities";
import { positionsToTransformation, transformationToDirection } from "../utils/space";
import { playerDirection, playerAddress } from "../modules/player";
import { addToLog, EventCategory } from "../modules/narrator";

export function createPositionSystem(network: NetworkLayer) {
  const {
    world,
    components: { Position },
  } = network;

  defineComponentSystem(world, Position, (update) => {
    console.log("==> Position system: ", update);
    const from = update.value[1];
    const to = update.value[0];
    entities.update((value) => {
      if (!value[indexToID(update.entity)]) value[indexToID(update.entity)] = {};
      value[indexToID(update.entity)].position = to;
      return value;
    });

    // if (from) {
    //   addToLog(update, EventCategory.Move);
    //   // If this is the player, set current direction
    //   if (indexToID(update.entity) == get(playerAddress)) {
    //     playerDirection.set(transformationToDirection(positionsToTransformation(from, to)));
    //   }
    // }
  });
}
