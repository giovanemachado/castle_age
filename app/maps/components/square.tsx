import Card from "@/app/cards/card";
import { StrictModeDroppable } from "@/app/shared/droppable";
import { UnitData } from "@/schema/types";
import { DroppableProvided } from "@hello-pangea/dnd";

type SquareDroppableProps = {
    unit?: UnitData;
    isDraggingOver: boolean;
};

const droppable = ({
    unit,
    droppableProps,
    innerRef,
    placeholder,
    isDraggingOver,
}: DroppableProvided & SquareDroppableProps) => {
    return (
        <div
            className={`h-full w-full ${
                isDraggingOver ? "bg-secondary/50" : ""
            }`}
            {...droppableProps}
            ref={innerRef}
        >
            {unit ? <Card unit={unit} /> : null}
            {placeholder}
        </div>
    );
};

const Square = ({
    droppableId,
    unit,
    row,
    col,
    type,
    onClick,
    backgroundImage,
}: {
    droppableId: string;
    unit?: UnitData;
    row: number;
    col: number;
    type: string;
    onClick: (row: number, col: number) => void;
    backgroundImage: string;
}) => {
    const handleClick = () => {
        onClick(row, col);
    };

    return (
        <div
            className={`square ${type} h-full w-full`}
            onClick={handleClick}
            style={{ backgroundImage }}
        >
            <StrictModeDroppable
                droppableId={droppableId}
                isDropDisabled={!!unit}
            >
                {(provided, snapshot) =>
                    droppable({
                        unit,
                        isDraggingOver: snapshot.isDraggingOver,
                        ...provided,
                    })
                }
            </StrictModeDroppable>
        </div>
    );
};

export default Square;
