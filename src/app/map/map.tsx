"use client";
import grassImage from "../../../public/grass1.png";
import grass2Image from "../../../public/grass2.png";
import Square from "./components/square";
import { SquareData } from "./types/square_data";
import { useEffect, useState } from "react";
import { MapData } from "./types/map_data";
import {
    DragDropContext,
    DraggableLocation,
    DropResult,
} from "@hello-pangea/dnd";

const renderRow = (row: number, rowData: SquareData[]) => {
    const squares = [];

    for (let col = 0; col < rowData.length; col++) {
        squares.push(renderSquare(row, col, rowData[col]));
    }

    return (
        <div key={`${row}`} className="map-row">
            {squares}
        </div>
    );
};

const renderSquare = (row: number, col: number, square: SquareData) => {
    let backgroundImage = `url(${grassImage.src})`;

    if (square.type === "water") {
        backgroundImage = `url(${grass2Image.src})`;
    }

    return (
        <div key={`${row}-${col}`}>
            <Square
                droppableId={square.id}
                units={square.unitIds}
                row={row}
                col={col}
                type={square.type}
                onClick={handleClick}
                backgroundImage={backgroundImage}
            />
        </div>
    );
};

const handleClick = (row: number, col: number) => {
    console.log(`Square clicked: ${row}-${col}`);
};

const Map = (data: { data: MapData }) => {
    const [state, setState] = useState<MapData>(data.data);

    const validResult = (result: DropResult) => {
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

    const getRowIndex = (rows: SquareData[][], droppableId: string) => {
        return rows.findIndex(
            (squares) =>
                squares.findIndex((square) => square.id == droppableId) != -1
        );
    };

    const getSquareIndex = (row: SquareData[], droppableId: string) => {
        return row.findIndex((square) => square.id == droppableId);
    };

    const updateSourceRow = (source: DraggableLocation) => {
        const sourceRowIndex = getRowIndex(state.rows, source.droppableId);
        let sourceRow = state.rows[sourceRowIndex];

        const sourceSquareIndex = getSquareIndex(sourceRow, source.droppableId);
        const sourceSquare = sourceRow[sourceSquareIndex];

        const newUnitIds = Array.from(sourceSquare.unitIds);
        newUnitIds.splice(source.index, 1);

        const newSquare = {
            ...sourceSquare,
            unitIds: newUnitIds,
        };
        sourceRow[sourceSquareIndex] = newSquare;

        return { sourceRow, sourceRowIndex };
    };

    const updateDestinationRow = (
        destination: DraggableLocation,
        draggableId: string
    ) => {
        const destinationRowIndex = getRowIndex(
            state.rows,
            destination.droppableId
        );
        let destinationRow = state.rows[destinationRowIndex];
        const destinationSquareIndex = getSquareIndex(
            destinationRow,
            destination.droppableId
        );
        const destinationSquare = destinationRow[destinationSquareIndex];
        const destinationNewUnitIds = Array.from(destinationSquare.unitIds);

        destinationNewUnitIds.splice(destination.index, 0, draggableId);

        const destinationNewSquare = {
            ...destinationSquare,
            unitIds: destinationNewUnitIds,
        };
        destinationRow[destinationSquareIndex] = destinationNewSquare;

        return { destinationRow, destinationRowIndex };
    };

    const onDragEnd = (dropResult: DropResult) => {
        const result = validResult(dropResult);

        if (!result) {
            return;
        }

        const { destination, source, draggableId } = result;
        const modifiedState = state;

        const { sourceRow, sourceRowIndex } = updateSourceRow(source);
        modifiedState.rows[sourceRowIndex] = sourceRow;

        const { destinationRow, destinationRowIndex } = updateDestinationRow(
            destination,
            draggableId
        );
        modifiedState.rows[destinationRowIndex] = destinationRow;

        setState({
            ...modifiedState,
        });
    };

    const rows = [];

    for (let row = 0; row < state.rows.length; row++) {
        rows.push(renderRow(row, state.rows[row]));
    }

    return (
        <div className="flex-col content-center">
            <h1>Game Map</h1>
            <DragDropContext onDragEnd={onDragEnd}>
                <div className="map">{rows}</div>
            </DragDropContext>
        </div>
    );
};

export default Map;
