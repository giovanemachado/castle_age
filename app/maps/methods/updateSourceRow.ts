import { MapData, SquareData, UnitData } from "@/schema/types";
import { DraggableLocation } from "@hello-pangea/dnd";
import { getRowIndex, getSquareIndex } from "./utils";

export const updateSourceRow = (
    source: DraggableLocation,
    mapData: MapData
): {
    sourceRow: SquareData[];
    sourceRowIndex: number;
    unitRemoved: UnitData;
} => {
    const sourceRowIndex = getRowIndex(mapData.rows, source.droppableId);
    let sourceRow = mapData.rows[sourceRowIndex];

    const sourceSquareIndex = getSquareIndex(sourceRow, source.droppableId);
    const sourceSquare = sourceRow[sourceSquareIndex];

    if (!sourceSquare.unit) {
        throw "Failed to move unit because it doesnt exists";
    }

    const newSquare: SquareData = {
        ...sourceSquare,
        unit: undefined,
    };
    sourceRow[sourceSquareIndex] = newSquare;

    return { sourceRow, sourceRowIndex, unitRemoved: sourceSquare.unit };
};
