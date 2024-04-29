"use client";
import grassImage from "../../public/grass1.png";
import grass2Image from "../../public/grass2.png";
import Square from "./components/square";
import { useEffect, useState } from "react";
import { DragDropContext, DropResult } from "@hello-pangea/dnd";
import { SquareData, MapData, UnitData } from "@/schema/types";
import { updateDestinationRow } from "./methods/updateDestinationRow";
import { updateSourceRow } from "./methods/updateSourceRow";
import { validDropResult } from "./methods/utils";

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
                unit={square.unit}
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
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch("http://localhost:3001/games/map");
            const jsonData = await response.json();
            setState(jsonData);
            setIsLoading(false);
        };

        fetchData();
    }, []);

    const [state, setState] = useState<MapData>();
    const [isLoading, setIsLoading] = useState(true);

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

        console.log(draggableId);

        setState({
            ...modifiedState,
        });
    };

    return (
        <div className="flex-col content-center">
            {isLoading ? <div>Loading</div> : null}
            {!isLoading && state ? (
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
