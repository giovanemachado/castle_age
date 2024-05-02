import { UnitData } from "@/schema/types";
import { GameStore } from "./gameStore";

export const setUnitMovement = (
    state: GameStore,
    unitId: string,
    localization: string
) => {
    const unitsInStore: UnitData[] = Array.from(state.units);

    const unitInStoreIndex = unitsInStore.findIndex(
        (unit) => unit.id === unitId
    );

    if (unitInStoreIndex == -1) {
        throw "No unitInStoreIndex";
    }

    unitsInStore[unitInStoreIndex].movementInTurn.moved = true;
    unitsInStore[unitInStoreIndex].movementInTurn.turn = state.turns;
    unitsInStore[unitInStoreIndex].movement.localization = localization;

    return { units: unitsInStore };
};
