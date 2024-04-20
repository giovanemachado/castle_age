"use client";
import grassImage from "../../public/grass1.png";
import grass2Image from "../../public/grass2.png";
import Square from "./components/square";
import { SquareData } from "./types/square_data";
import { useEffect, useState } from "react";
import { MapData } from "./types/map_data";
import {
    DragDropContext,
    DraggableLocation,
    DropResult,
} from "@hello-pangea/dnd";

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

    const updateSourceRow = (source: DraggableLocation, mapData: MapData) => {
        const sourceRowIndex = getRowIndex(mapData.rows, source.droppableId);
        let sourceRow = mapData.rows[sourceRowIndex];

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
        draggableId: string,
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
        if (!state) {
            return;
        }

        const result = validResult(dropResult);

        if (!result) {
            return;
        }

        const { destination, source, draggableId } = result;
        const modifiedState = state;

        const { sourceRow, sourceRowIndex } = updateSourceRow(source, state);
        modifiedState.rows[sourceRowIndex] = sourceRow;

        const { destinationRow, destinationRowIndex } = updateDestinationRow(
            destination,
            draggableId,
            state
        );
        modifiedState.rows[destinationRowIndex] = destinationRow;

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
