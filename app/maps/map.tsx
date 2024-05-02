"use client";
import Square from "../squares/square";
import { DragDropContext, DropResult } from "@hello-pangea/dnd";
import { SquareData } from "@/schema/types";
import { validDropResult } from "./methods/utils";
import { useGameStore } from "../store/gameStoreProvider";

/**
 * Represents the whole map of the game, showing all Squares and Cards in it.
 */
const Map = () => {
    const { gameMap, setUnitMovement } = useGameStore((state) => state);

    const onDragEnd = (dropResult: DropResult) => {
        const result = validDropResult(dropResult);

        if (!result) {
            return;
        }

        const { destination, draggableId } = result;
        setUnitMovement(draggableId, destination.droppableId);
    };

    return (
        <div className="flex-col content-center">
            <DragDropContext onDragEnd={onDragEnd}>
                <div className="map">
                    {gameMap.rows.map((row: SquareData[], rIndex: number) => (
                        <div key={`${rIndex}`} className="map-row">
                            {row.map((square: SquareData, index: number) => (
                                <div key={`${rIndex}-${index}`}>
                                    <Square droppableId={square.id} />
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </DragDropContext>
        </div>
    );
};

export default Map;
