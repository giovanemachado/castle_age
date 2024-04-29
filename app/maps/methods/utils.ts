import { SquareData } from "@/schema/types";
import { DropResult } from "@hello-pangea/dnd";

export const getRowIndex = (rows: SquareData[][], droppableId: string) => {
    return rows.findIndex(
        (squares) =>
            squares.findIndex((square) => square.id == droppableId) != -1
    );
};

export const getSquareIndex = (row: SquareData[], droppableId: string) => {
    return row.findIndex((square) => square.id == droppableId);
};

export const validDropResult = (result: DropResult) => {
    if (!result.destination) {
        return null;
    }

    const { destination, source, draggableId } = result;

    if (!destination) {
        return null;
    }

    if (
        destination.droppableId === source.droppableId &&
        destination.index === source.index
    ) {
        return null;
    }

    return { destination, source, draggableId };
};
