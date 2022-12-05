import {
  crawl,
  stumble,
  gallop,
  east,
  west,
  north,
  south,
  southEast,
  southWest,
  northEast,
  northWest,
  goTowardsFire,
} from "./move";
import { glean, dig, drain } from "./gather";
import { lick, drink, guzzle } from "./consume";
import { fire } from "./burn";
import { play } from "./play";
import { giveUp } from "./special";
import { hungry, sludgeRich, drained, byTheFire } from "./gates";

export interface Operation {
  name: string;
  category: string;
  description: string;
  cost: string;
  f: () => boolean;
}

export const operations: Operation[] = [
  // --- MOVE
  {
    name: "east",
    category: "move",
    description: "If you believe in God, believe in death row east",
    cost: "energy: 10",
    f: east,
  },
  {
    name: "west",
    category: "move",
    description: "If you want to go east, don't go west",
    cost: "energy: 10",
    f: west,
  },
  {
    name: "north",
    category: "move",
    description: "Fist of the north star",
    cost: "energy: 10",
    f: north,
  },
  {
    name: "south",
    category: "move",
    description: "The south will rise, beware...",
    cost: "energy: 10",
    f: south,
  },
  {
    name: "south-east",
    category: "move",
    description: "Move south-east",
    cost: "energy: 10",
    f: southEast,
  },
  {
    name: "south-west",
    category: "move",
    description: "Move south-west",
    cost: "energy: 10",
    f: southWest,
  },
  {
    name: "north-east",
    category: "move",
    description: "Move north-east",
    cost: "energy: 10",
    f: northEast,
  },
  {
    name: "north-west",
    category: "move",
    description: "Move north-west",
    cost: "energy: 10",
    f: northWest,
  },
  {
    name: "crawl",
    category: "move",
    description: "Move 1 step in random direction",
    cost: "energy: 10",
    f: crawl,
  },
  {
    name: "stumble",
    category: "move",
    description: "Move 3 steps in random direction",
    cost: "energy: 30",
    f: stumble,
  },
  {
    name: "gallop",
    category: "move",
    description: "Move 5 steps in random direction",
    cost: "energy: 50",
    f: gallop,
  },
  {
    name: "walk towards fire",
    category: "move",
    description: "Go to fire",
    cost: "energy: 10",
    f: goTowardsFire,
  },
  // --- CONSUME
  {
    name: "lick",
    category: "consume",
    description: "Have yourself a little something",
    cost: "sludge: 5",
    f: lick,
  },
  {
    name: "drink",
    category: "consume",
    description: "Time for a meal",
    cost: "sludge: 10",
    f: drink,
  },
  {
    name: "guzzle",
    category: "consume",
    description: "The hunger needs to be stilled",
    cost: "sludge: 20",
    f: guzzle,
  },
  // --- GATHER
  {
    name: "glean",
    category: "gather",
    description: "All I see are shrubs, leftovers and other bits",
    cost: "energy: 50",
    f: glean,
  },
  {
    name: "dig",
    category: "gather",
    description: "I can make use of this...",
    cost: "energy: 100",
    f: dig,
  },
  {
    name: "drain",
    category: "gather",
    description: "Keep collecting before we run out",
    cost: "energy: 200",
    f: drain,
  },
  // --- BURN
  {
    name: "fire",
    category: "burn",
    description: "This will keep me warm me at night",
    cost: "resource: 100, energy: 50",
    f: fire,
  },
  // {
  //   name: "bonfire",
  //   category: "burn",
  //   description: "Let ashes blow over the fields for days on end",
  //   cost: "resource: 500, energy: 50",
  //   f: bonfire,
  // },
  // --- PLAY
  {
    name: "serenade",
    category: "play",
    description: "(╥﹏╥)",
    cost: "energy: 100",
    f: play,
  },
  // --- SPECIAL
  {
    name: "give up",
    category: "special",
    description: "What is the point to it all, anyways",
    cost: "energy: all of it",
    f: giveUp,
  },
  // --- GATES
  {
    name: "hungry?",
    category: "gate",
    description: "Are you hungry?",
    cost: "Continue if energy is under 100",
    f: hungry,
  },
  {
    name: "drained?",
    category: "gate",
    description: "Has someone already drained all the sludge in this soil?",
    cost: "Continue if tile has sludge",
    f: drained,
  },
  {
    name: "sludge rich?",
    category: "gate",
    description: "Are you carrying enough sludge to survive for a while?",
    cost: "Continue if resource is over 100",
    f: sludgeRich,
  },
  {
    name: "by the fire?",
    category: "gate",
    description: "Are you by the fire?",
    cost: "Continue if you are by a fire.",
    f: byTheFire,
  },
];
