import { type components } from "./schema";
import { UNITDATA_CATEGORY, UNITDATA_CLASS } from "./schema";

export type UnitData = components["schemas"]["UnitData"];
export type UnitMovement = components["schemas"]["UnitMovement"];

export type MatchData = components["schemas"]["MatchData"];

export type SquareData = components["schemas"]["SquareData"];

export type MatchState = components["schemas"]["MatchState"];
export type MatchStateUnitsMovement =
  components["schemas"]["MatchStateUnitsMovement"];

export { UNITDATA_CATEGORY, UNITDATA_CLASS };
