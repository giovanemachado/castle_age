import Card from "@/app/cards/card";
import { StrictModeDroppable } from "@/app/shared/droppable";
import { DroppableProvided } from "@hello-pangea/dnd";
import { UnitData } from "../types/unit_data";

const droppableThing = ({
    index,
    unit,
    droppableProps,
    innerRef,
    placeholder,
}: DroppableProvided & {
    index: number;
    unit?: UnitData;
}) => {
    return (
        <div className={"h-full w-full"} {...droppableProps} ref={innerRef}>
            {unit ? (
                <Card
                    image_tag={unit.class}
                    index={index}
                    draggableId={unit.id}
                />
            ) : null}

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
            <StrictModeDroppable droppableId={droppableId}>
                {(provided) =>
                    droppableThing({
                        index: 0,
                        unit,
                        ...provided,
                    })
                }
            </StrictModeDroppable>
        </div>
    );
};

export default Square;
