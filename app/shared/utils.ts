import { UnitData, UNITDATA_CATEGORY } from "@/schema/types";

export const unitIsStructure = (unit: UnitData): boolean => {
    return unit.category == UNITDATA_CATEGORY.STRUCTURE;
};
