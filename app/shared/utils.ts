import { UnitData, UNITDATA_CATEGORY } from "@/schema/types";

export const unitIsStructure = (unitData: UnitData): boolean => {
    return unitData.category == UNITDATA_CATEGORY.STRUCTURE;
};
