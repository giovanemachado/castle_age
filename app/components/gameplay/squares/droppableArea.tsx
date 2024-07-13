import { MatchStateUnitsMovement } from "@/schema/types";
import { DroppableProvided } from "@hello-pangea/dnd";
import { Card } from "../cards/card";

type DroppableAreaProps = {
  unit?: MatchStateUnitsMovement;
  isDraggingOver: boolean;
  isDropDisabled: boolean;
};

export const DroppableArea = ({
  unit,
  droppableProps,
  isDropDisabled,
  innerRef,
  placeholder,
  isDraggingOver,
}: DroppableProvided & DroppableAreaProps) => {
  return (
    <div
      className={`h-full w-full ${
        isDraggingOver
          ? "bg-secondary/100"
          : !isDropDisabled
            ? "bg-secondary/50"
            : ""
      }`}
      {...droppableProps}
      ref={innerRef}
    >
      {unit ? <Card unit={unit} /> : null}
      {placeholder}
    </div>
  );
};
