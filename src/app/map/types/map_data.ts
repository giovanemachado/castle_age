import { SquareData } from "./square_data";
import { UnitData } from "./unit_data";

export type MapData = {
    units: UnitData[];
    rows: SquareData[][];
};
