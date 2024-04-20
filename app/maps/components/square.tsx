import Card from "@/app/cards/card";
import { StrictModeDroppable } from "@/app/shared/droppable";
import { DroppableProvided } from "@hello-pangea/dnd";

const droppableThing = ({
    index,
    units,
    droppableProps,
    innerRef,
    placeholder,
}: DroppableProvided & {
    index: number;
    units: string[];
}) => {
    return (
        <div className={"h-full w-full"} {...droppableProps} ref={innerRef}>
            {units.length > 0 ? (
                <Card index={index} draggableId={units[0]} />
            ) : null}

            {placeholder}
        </div>
    );
};

const Square = ({
    droppableId,
    units,
    row,
    col,
    type,
    onClick,
    backgroundImage,
}: {
    droppableId: string;
    units: string[];
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
                        units,
                        ...provided,
                    })
                }
            </StrictModeDroppable>
        </div>
    );
};

export default Square;
