import { StrictModeDroppable } from "@/app/components/shared/droppable";
import { useGameStore } from "@/app/store/gameStoreProvider";
import { MatchStateUnitsMovement } from "@/schema/types";
import { memo, useEffect, useState } from "react";
import grass1Image from "@/public/grass1.png";
import grass2Image from "@/public/grass2.png";
import { DroppableArea } from "./droppableArea";

type SquareProps = {
  droppableId: string;
  isReachable: boolean;
  unit?: MatchStateUnitsMovement;
};

/**
 * Representation of a Square in the map (one space where you can move units to). It's a droppable area, as you can
 * drop 1 card in each of these.
 */
export const Square = memo(function Square({
  droppableId,
  isReachable,
  unit,
}: SquareProps) {
  // temporary non-random to test images (will come from backend)
  let backgroundImage = `url(${
    Math.random() > 100 ? grass1Image.src : grass2Image.src
  })`;

  const isDropDisabled = !!unit || isReachable;

  return (
    <div className={`square h-full w-full`} style={{ backgroundImage }}>
      <StrictModeDroppable
        droppableId={droppableId}
        isDropDisabled={isDropDisabled}
      >
        {(provided, snapshot) =>
          DroppableArea({
            unit,
            isDropDisabled,
            isDraggingOver: snapshot.isDraggingOver,
            ...provided,
          })
        }
      </StrictModeDroppable>
    </div>
  );
});
