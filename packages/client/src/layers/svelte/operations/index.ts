import { crawl, walk, run, east, west, north, south, southEast, southWest, northEast, northWest } from "./move";
import { gather, hoard, stockpile } from "./gather";
import { nibble, eat, feast } from "./consume";
import { fire } from "./burn";
import { suicide } from "./special";

export interface Operation {
  name: string;
  category: string;
  f: () => boolean;
}

export const operations: Operation[] = [
  // --- MOVE
  { name: "east", category: "move", f: east },
  { name: "west", category: "move", f: west },
  { name: "north", category: "move", f: north },
  { name: "south", category: "move", f: south },
  { name: "south-east", category: "move", f: southEast },
  { name: "south-west", category: "move", f: southWest },
  { name: "north-east", category: "move", f: northEast },
  { name: "north-west", category: "move", f: northWest },
  { name: "crawl", category: "move", f: crawl },
  { name: "walk", category: "move", f: walk },
  { name: "run", category: "move", f: run },
  // --- CONSUME
  { name: "nibble", category: "consume", f: nibble },
  { name: "eat", category: "consume", f: eat },
  { name: "feast", category: "consume", f: feast },
  { name: "gather", category: "gather", f: gather },
  { name: "hoard", category: "gather", f: hoard },
  { name: "stockpile", category: "gather", f: stockpile },
  // --- BURN
  { name: "fire", category: "burn", f: fire },
  // --- SPECIAL
  { name: "suicide", category: "special", f: suicide },
];
