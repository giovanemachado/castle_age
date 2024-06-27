"use client";

import { Draggable, DraggableProvided } from "@hello-pangea/dnd";
import CardImage from "./cardImage";
import { MatchStateUnitsMovement } from "@/schema/types";
import { unitIsStructure } from "../../shared/utils";
import { useEffect, useState } from "react";
import { useGameStore } from "@/app/store/gameStoreProvider";

type DraggableCardProps = {
  imageComponent: React.ReactNode;
  isDragEnabled: boolean;
  unitMovedInTurn: boolean;
  unitIsDragging: boolean;
};

type CardProps = {
  unit: MatchStateUnitsMovement;
};

const draggable = ({
  draggableProps,
  dragHandleProps,
  innerRef,
  imageComponent,
  isDragEnabled,
  unitMovedInTurn,
  unitIsDragging,
}: DraggableProvided & DraggableCardProps) => {
  return (
    <div {...draggableProps} {...dragHandleProps} ref={innerRef}>
      {isDragEnabled && !unitMovedInTurn && (
        <span className="indicator-item badge badge-secondary">
          {unitIsDragging ? "..." : "!"}
        </span>
      )}
      {imageComponent}
    </div>
  );
};

/**
 * Representation of a Card in the game (an unit). It's a draggable item, and you can interact with most of them.
 */
const Card = ({ unit }: CardProps) => {
  const { gameMap, match, player, waitingOtherPlayers } = useGameStore(
    (state) => state,
  );
  const [isDragEnabled, setIsDragEnabled] = useState(false);
  const [isRed, setIsRed] = useState(false);
  const [unitClass, setUnitClass] = useState("");

  useEffect(() => {
    const currentUnit = gameMap?.units.find((u: any) => u.id == unit.id);

    if (!currentUnit || !match) {
      return;
    }

    const isPlayersUnit = currentUnit.playerId == player?.playerId;
    const isUnitMovable = !unitIsStructure(currentUnit);

    setIsRed(currentUnit?.playerId == match.players[0]);
    setIsDragEnabled(isPlayersUnit && isUnitMovable && !waitingOtherPlayers);
    setUnitClass(currentUnit.class);
  }, [match, unit.id, gameMap, player, waitingOtherPlayers]);

  return (
    <div className="indicator">
      <div
        className="tooltip tooltip-bottom"
        data-tip={unitClass.charAt(0).toUpperCase() + unitClass.slice(1)}
      >
        <Draggable
          draggableId={unit.id}
          index={0}
          isDragDisabled={!isDragEnabled || unit.movedInTurn}
        >
          {(provided, snapshot) =>
            draggable({
              imageComponent: CardImage({
                unitClass,
                isDragging: snapshot.isDragging,
                isRed,
              }),
              isDragEnabled,
              unitMovedInTurn: unit.movedInTurn,
              unitIsDragging: snapshot.isDragging,
              ...provided,
            })
          }
        </Draggable>
      </div>
    </div>
  );
};

export default Card;
