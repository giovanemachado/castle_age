import { Draggable } from "@hello-pangea/dnd";
import Illustration from "./illustration";
import { MatchStateUnitsMovement } from "@/schema/types";
import { unitIsStructure } from "../../shared/utils";
import { memo, useCallback, useEffect, useState } from "react";
import { useGameStore } from "@/app/store/gameStoreProvider";
import Indicator from "./indicator";
import { useShallow } from "zustand/react/shallow";

type CardProps = {
  unit: MatchStateUnitsMovement;
};

/**
 * Representation of a Card in the game (an unit). It's a draggable item, and you can interact with most of them.
 */
export const Card = memo(function Card({ unit }: CardProps) {
  const { gameMap, match, player, waitingOtherPlayers } = useGameStore(
    useShallow((state) => ({
      gameMap: state.gameMap,
      match: state.match,
      player: state.player,
      waitingOtherPlayers: state.waitingOtherPlayers,
    })),
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

  const getRandomHP = useCallback(() => {
    const value = Math.floor(Math.random() * 15 + 1).toString();
    return value;
  }, []);

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
                  HP={getRandomHP()} // TODO random HP temp
                />
              }
            </Indicator>
          </div>
        );
      }}
    </Draggable>
  );
});
