"use client";

import { BeforeCapture, DragDropContext, DropResult } from "@hello-pangea/dnd";
import { SquareData } from "@/schema/types";
import { validDropResult } from "./utils";
import { useGameStore } from "@/app/store/gameStoreProvider";
import Square from "../squares/square";
import { useShallow } from "zustand/react/shallow";

/**
 * Represents the whole map of the game, showing all Squares and Cards in it.
 */
const Map = () => {
  const { gameMap, setUnitNewLocalization, setCanBeReached } = useGameStore(
    useShallow((state) => ({
      gameMap: state.gameMap,
      setUnitNewLocalization: state.setUnitNewLocalization,
      setCanBeReached: state.setCanBeReached,
    })),
  );

  const onBeforeCapture = (beforeCapture: BeforeCapture) => {
    setCanBeReached(beforeCapture.draggableId);
  };

  const onDragEnd = (dropResult: DropResult) => {
    const result = validDropResult(dropResult);
    setCanBeReached();

    if (!result) {
      return;
    }

    const { destination, draggableId } = result;
    setUnitNewLocalization(draggableId, destination.droppableId);
  };

  return (
    <div className="flex-col">
      <DragDropContext onBeforeCapture={onBeforeCapture} onDragEnd={onDragEnd}>
        <div className="map">
          {gameMap?.rows.map((row: SquareData[], rIndex: number) => (
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
