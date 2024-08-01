import { MatchStateUnitsMovement } from "@/schema/types";
import { GameStore } from "./gameStore";

const getUnitIndex = (
  units: MatchStateUnitsMovement[],
  unitId: string
): number => {
  const unitIndex = units.findIndex((unit) => unit.id === unitId);

  if (unitIndex == -1) {
    throw "No unitIndex";
  }

  return unitIndex;
};

export const setUnitNewLocalization = (
  state: GameStore,
  unitId: string,
  localization: string
) => {
  const unitsInStore = Array.from(state.unitsMovement);
  const unitInStoreIndex = getUnitIndex(state.unitsMovement, unitId);

  unitsInStore[unitInStoreIndex].localization = localization;
  unitsInStore[unitInStoreIndex].movedInTurn = true;

  return { unitsMovement: unitsInStore };
};

export const setToken = (token: string) => {
  return { token };
};
