import { UnitData, MapData, SquareData } from "@/schema/types";
import { DraggableLocation } from "@hello-pangea/dnd";
import { getRowIndex, getSquareIndex } from "./utils";

export const updateDestinationRow = (
    destination: DraggableLocation,
    unitToAdd: UnitData,
    mapData: MapData
) => {
    const destinationRowIndex = getRowIndex(
        mapData.rows,
        destination.droppableId
    );
    let destinationRow = mapData.rows[destinationRowIndex];
    const destinationSquareIndex = getSquareIndex(
        destinationRow,
        destination.droppableId
    );
    const destinationSquare = destinationRow[destinationSquareIndex];

    const destinationNewSquare: SquareData = {
        ...destinationSquare,
        unit: unitToAdd,
    };

    destinationRow[destinationSquareIndex] = destinationNewSquare;

    return { destinationRow, destinationRowIndex };
};
