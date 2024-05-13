import { GameState, UNITDATA_CLASS, UnitData } from "@/schema/types";
import { GameStore } from "./gameStore";

const getUnitIndex = (units: UnitData[], unitId: string): number => {
    const unitIndex = units.findIndex((unit) => unit.id === unitId);

    if (unitIndex == -1) {
        throw "No unitIndex";
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

export const setUnitMovement = (
    state: GameStore,
    unitId: string,
    localization: string,
) => {
    const unitsInStore: UnitData[] = Array.from(state.units);
    const unitInStoreIndex = getUnitIndex(state.units, unitId);

    unitsInStore[unitInStoreIndex].movementInTurn.moved = true;
    unitsInStore[unitInStoreIndex].movementInTurn.turn = state.turns;
    unitsInStore[unitInStoreIndex].movement.localization = localization;

    return { units: unitsInStore };
};

export const setCanBeReached = (state: GameStore, unitId?: string) => {
    if (!unitId) {
        return {
            canBeReached: [],
        };
    }

    const unitsInStore: UnitData[] = Array.from(state.units);
    const unitInStoreIndex = getUnitIndex(state.units, unitId);

    const { localization, distance } = unitsInStore[unitInStoreIndex].movement;

    const { rowId, colId } = getLocalizationIds(localization);

    const leftMovement = createSquareId(rowId, colId - distance);
    const rightMovement = createSquareId(rowId, colId + distance);
    const upMovement = createSquareId(rowId - distance, colId);
    const downMovement = createSquareId(rowId + distance, colId);

    const gateUnitReachable = unitsInStore.find(
        (unit) =>
            unit.class === UNITDATA_CLASS.GATE &&
            [leftMovement, rightMovement, upMovement, downMovement].includes(
                unit.movement.localization,
            ),
    );

    let upMovementGate = "";
    let downMovementGate = "";

    if (gateUnitReachable) {
        const { rowId, colId } = getLocalizationIds(
            gateUnitReachable.movement.localization,
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

export const setInitialLoadState = (initialLoad: GameState) => {
    return { ...initialLoad };
};

export const setToken = (token: string) => {
    return { token };
};
