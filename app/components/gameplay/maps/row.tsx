import { MatchStateUnitsMovement, SquareData } from "@/schema/types";
import { memo, useCallback } from "react";
import { Square } from "../squares/square";
import { useGameStore } from "@/app/store/gameStoreProvider";

type RowProps = {
  row: SquareData[];
  rowsIndex: number;
};

export const Row = memo(function Row({ row, rowsIndex }: RowProps) {
  const unitsMovement = useGameStore((state) => state.unitsMovement);
  const unitInDrag = useGameStore((state) => state.unitInDrag);

  const checkForUnitsInSquare = useCallback(
    (droppableId: string) => {
      const foundUnit = unitsMovement.find(
        (unit: MatchStateUnitsMovement) => unit.localization === droppableId,
      );

      return foundUnit;
    },
    [unitsMovement],
  );

  const isReachable = useCallback(
    (droppableId: string) => {
      const reachableLocalizations = unitInDrag?.reachableLocalizations ?? [];
      return !reachableLocalizations?.includes(droppableId);
    },
    [unitInDrag?.reachableLocalizations],
  );

  return row.map((square: SquareData, rowIndex: number) => (
    <div key={`${rowsIndex}-${rowIndex}`}>
      <Square
        droppableId={square.id}
        isReachable={isReachable(square.id)}
        unit={checkForUnitsInSquare(square.id)}
      />
    </div>
  ));
});
