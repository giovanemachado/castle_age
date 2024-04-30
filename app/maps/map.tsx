"use client";
import grassImage from "../../public/grass1.png";
import grass2Image from "../../public/grass2.png";
import Square from "./components/square";
import { useEffect, useState } from "react";
import { DragDropContext, DropResult } from "@hello-pangea/dnd";
import { SquareData, MapData } from "@/schema/types";
import { updateDestinationRow } from "./methods/updateDestinationRow";
import { updateSourceRow } from "./methods/updateSourceRow";
import { validDropResult } from "./methods/utils";
import { useGameStore } from "../store/gameStoreProvider";

const renderRow = (rowIndex: number, rowData: SquareData[]) => {
    return (
        <div key={`${rowIndex}`} className="map-row">
            {rowData.map((row: SquareData, index: number) =>
                renderSquare(rowIndex, index, row)
            )}
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

const Map = () => {
    const { gameMap } = useGameStore((state) => state);

    useEffect(() => {
        setState(gameMap);
    }, [gameMap]);

    const [state, setState] = useState<MapData>();

    const onDragEnd = (dropResult: DropResult) => {
        if (!state) {
            return;
        }

        const result = validDropResult(dropResult);

        if (!result) {
            return;
        }

        const { destination, source, draggableId } = result;
        const modifiedState = state;

        const { sourceRow, sourceRowIndex, unitRemoved } = updateSourceRow(
            source,
            state
        );
        modifiedState.rows[sourceRowIndex] = sourceRow;

        const { destinationRow, destinationRowIndex } = updateDestinationRow(
            destination,
            unitRemoved,
            state
        );
        modifiedState.rows[destinationRowIndex] = destinationRow;

        setState({
            ...modifiedState,
        });
    };

    return (
        <div className="flex-col content-center">
            {state ? (
                <DragDropContext onDragEnd={onDragEnd}>
                    <div className="map">
                        {state.rows.map((row: SquareData[], index: number) =>
                            renderRow(index, row)
                        )}
                    </div>
                </DragDropContext>
            ) : null}
        </div>
    );
};

export default Map;
