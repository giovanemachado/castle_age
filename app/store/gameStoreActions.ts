import {
  MatchStateUnitsMovement,
  UNITDATA_CLASS,
  UnitData,
} from "@/schema/types";
import { GameStore } from "./gameStore";

const getUnitIndex = (
  units: MatchStateUnitsMovement[],
  unitId: string,
): number => {
  const unitIndex = units.findIndex((unit) => unit.id === unitId);

  if (unitIndex == -1) {
    throw "No unitIndex";
  }

  return unitIndex;
};

const getUnitDataIndex = (units: UnitData[], unitId: string): number => {
  const unitIndex = units.findIndex((unit) => unit.id === unitId);

  if (unitIndex == -1) {
    throw "No unitDataIndex";
  }

  return unitIndex;
};

const getLocalizationIds = (localization: string) => {
  const ids = localization.split("_")[1].split("-");
  const rowId = +ids[0];
  const colId = +ids[1];

  return { rowId, colId };
};

const createSquareId = (rowId: number, colId: number) => {
  return `square_${rowId}-${colId}`;
};

export const setUnitNewLocalization = (
  state: GameStore,
  unitId: string,
  localization: string,
) => {
  const unitsInStore: MatchStateUnitsMovement[] = Array.from(
    state.unitsMovement,
  );
  const unitInStoreIndex = getUnitIndex(state.unitsMovement, unitId);

  unitsInStore[unitInStoreIndex].localization = localization;
  unitsInStore[unitInStoreIndex].movedInTurn = true;

  return { unitsMovement: unitsInStore };
};

export const setCanBeReached = (state: GameStore, unitId?: string) => {
  // TODO this logic should be on the backend
  if (!unitId) {
    return {
      canBeReached: [],
    };
  }

  if (!state.gameMap) {
    throw "No Game Map data";
  }

  const unitsInStore: UnitData[] = Array.from(state.gameMap.units);
  const unitInStoreIndex = getUnitDataIndex(state.gameMap.units, unitId);
  const unitInStoreIndexD = getUnitIndex(state.unitsMovement, unitId);
  const currentLocalization =
    state.unitsMovement[unitInStoreIndexD].localization;

  const { distance } = unitsInStore[unitInStoreIndex].movement;

  const { rowId, colId } = getLocalizationIds(currentLocalization);

  const leftMovement = createSquareId(rowId, colId - distance);
  const rightMovement = createSquareId(rowId, colId + distance);
  const upMovement = createSquareId(rowId - distance, colId);
  const downMovement = createSquareId(rowId + distance, colId);

  const gateUnitReachable = unitsInStore.find(
    (unit) =>
      unit.class === UNITDATA_CLASS.GATE &&
      [leftMovement, rightMovement, upMovement, downMovement].includes(
        unit.movement.initialLocalization,
      ),
  );

  let upMovementGate = "";
  let downMovementGate = "";

  if (gateUnitReachable) {
    const { rowId, colId } = getLocalizationIds(
      gateUnitReachable.movement.initialLocalization,
    );
    upMovementGate = createSquareId(rowId - 1, colId);
    downMovementGate = createSquareId(rowId + 1, colId);
  }

  return {
    canBeReached: [
      leftMovement,
      rightMovement,
      upMovement,
      downMovement,
      upMovementGate,
      downMovementGate,
    ],
  };
};

export const setToken = (token: string) => {
  return { token };
};
