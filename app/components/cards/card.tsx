"use client";

import { Draggable, DraggableProvided } from "@hello-pangea/dnd";
import CardImage from "./components/cardImage";
import { UnitData } from "@/schema/types";
import { unitIsStructure } from "../shared/utils";
import { useEffect, useState } from "react";
import { useGameStore } from "@/app/store/gameStoreProvider";

type DraggableCardProps = {
  imageComponent: React.ReactNode;
};

type CardProps = {
  unit: UnitData;
};

const draggable = ({
  draggableProps,
  dragHandleProps,
  innerRef,
  imageComponent,
}: DraggableProvided & DraggableCardProps) => {
  return (
    <div {...draggableProps} {...dragHandleProps} ref={innerRef}>
      {imageComponent}
    </div>
  );
};

/**
 * Representation of a Card in the game (an unit). It's a draggable item, and you can interact with most of them.
 */
const Card = ({ unit }: CardProps) => {
  const { units, match, currentPlayerId } = useGameStore((state) => state);
  const [isDragEnabled, setIsDragEnabled] = useState(false);
  const [isRed, setIsRed] = useState(false);

  useEffect(() => {
    const currentUnit = units.find((u: any) => u.id == unit.id);

    if (!currentUnit) {
      return;
    }

    const isPlayersUnit = currentUnit.playerId == currentPlayerId;
    const isUnitMovable = !unitIsStructure(currentUnit);

    setIsRed(currentUnit?.playerId == match.players[0]);
    setIsDragEnabled(isPlayersUnit && isUnitMovable);
  }, [currentPlayerId, match.players, unit.id, units]);

  return (
    <Draggable
      draggableId={unit.id}
      index={0}
      isDragDisabled={!isDragEnabled || unit.movementInTurn.moved}
    >
      {(provided, snapshot) =>
        draggable({
          imageComponent: CardImage({
            unitClass: unit.class,
            isDragging: snapshot.isDragging,
            isRed,
          }),
          ...provided,
        })
      }
    </Draggable>
  );
};

export default Card;
