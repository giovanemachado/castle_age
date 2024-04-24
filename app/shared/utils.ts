import { UNIT_CATEGORY, UnitData } from "../maps/types/unit_data";

export const unitIsStructure = (unitData: UnitData): boolean => {
    return unitData.category == UNIT_CATEGORY.STRUCTURE;
};
