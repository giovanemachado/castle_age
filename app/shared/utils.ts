import { UnitData } from "../maps/types/unit_data";
import { UNIT_CATEGORY } from "wheelbarrow";

export const unitIsStructure = (unitData: UnitData): boolean => {
    return unitData.category == UNIT_CATEGORY.STRUCTURE;
};
