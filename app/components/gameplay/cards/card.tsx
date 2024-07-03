"use client";

import { Draggable } from "@hello-pangea/dnd";
import Illustration from "./illustration";
import { MatchStateUnitsMovement } from "@/schema/types";
import { unitIsStructure } from "../../shared/utils";
import { useEffect, useState } from "react";
import { useGameStore } from "@/app/store/gameStoreProvider";
import Indicator from "./indicator";

type CardProps = {
  unit: MatchStateUnitsMovement;
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
    <Draggable
      draggableId={unit.id}
      index={0}
      isDragDisabled={!isDragEnabled || unit.movedInTurn}
    >
      {(provided, snapshot) => {
        return (
          <div
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
          >
            <Indicator
              isDragEnabled={isDragEnabled}
              unitMovedInTurn={unit.movedInTurn}
              unitIsDragging={snapshot.isDragging}
              unitClass={unitClass}
            >
              {
                <Illustration
                  unitClass={unitClass}
                  isDragging={snapshot.isDragging}
                  isRed={isRed}
                  HP={Math.floor(Math.random() * 15 + 1).toString()} // TODO random HP temp
                />
              }
            </Indicator>
          </div>
        );
      }}
    </Draggable>
  );
};

export default Card;
