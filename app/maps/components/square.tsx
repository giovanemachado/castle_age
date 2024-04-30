import Card from "@/app/cards/card";
import { StrictModeDroppable } from "@/app/shared/droppable";
import { useGameStore } from "@/app/store/gameStoreProvider";
import { UnitData } from "@/schema/types";
import { DroppableProvided } from "@hello-pangea/dnd";
import { useEffect, useState } from "react";

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
    row,
    col,
    type,
    onClick,
    backgroundImage,
}: {
    droppableId: string;
    row: number;
    col: number;
    type: string;
    onClick: (row: number, col: number) => void;
    backgroundImage: string;
}) => {
    const { units } = useGameStore((state) => state);
    const [unit, setUnit] = useState<UnitData | undefined>(undefined);

    useEffect(() => {
        const foundUnit = units.find(
            (unit) => unit.movement.localization === droppableId
        );
        setUnit(foundUnit);
    }, [units]);

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
