import { type components } from "./schema";
import { UNITDATA_CATEGORY, UNITDATA_CLASS } from "./schema";

export type UnitData = components["schemas"]["UnitData"];
export type UnitMovement = components["schemas"]["UnitMovement"];
export type SquareData = components["schemas"]["SquareData"];
export type MapData = components["schemas"]["MapData"];
export type GameState = components["schemas"]["GameState"];
export type MatchData = components["schemas"]["MatchData"];

export { UNITDATA_CATEGORY, UNITDATA_CLASS };
