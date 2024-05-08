import { StrictModeDroppable } from "@/app/components/shared/droppable";
import { useGameStore } from "@/app/store/gameStoreProvider";
import { UnitData } from "@/schema/types";
import { DroppableProvided } from "@hello-pangea/dnd";
import { useEffect, useState } from "react";
import grass1Image from "@/public/grass1.png";
import grass2Image from "@/public/grass2.png";
import Card from "../cards/card";

type SquareDroppableProps = {
    unit?: UnitData;
    isDraggingOver: boolean;
    isDropDisabled: boolean;
};

const droppable = ({
    unit,
    droppableProps,
    isDropDisabled,
    innerRef,
    placeholder,
    isDraggingOver,
}: DroppableProvided & SquareDroppableProps) => {
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

/**
 * Representation of a Square in the map (one space where you can move units to). It's a droppable area, as you can
 * drop 1 card in each of these.
 */
const Square = ({ droppableId }: { droppableId: string }) => {
    // temporary non-random to test images (will come from backend)
    let backgroundImage = `url(${
        Math.random() > 100 ? grass1Image.src : grass2Image.src
    })`;

    const { units, canBeReached } = useGameStore((state) => state);
    const [unit, setUnit] = useState<UnitData | undefined>(undefined);

    useEffect(() => {
        const foundUnit = units.find(
            (unit) => unit.movement.localization === droppableId
        );
        setUnit(foundUnit);
    }, [units, droppableId]);

    const isDropDisabled = !!unit || !canBeReached.includes(droppableId);

    return (
        <div className={`square h-full w-full`} style={{ backgroundImage }}>
            <StrictModeDroppable
                droppableId={droppableId}
                isDropDisabled={isDropDisabled}
            >
                {(provided, snapshot) =>
                    droppable({
                        unit,
                        isDropDisabled,
                        isDraggingOver: snapshot.isDraggingOver,
                        ...provided,
                    })
                }
            </StrictModeDroppable>
        </div>
    );
};

export default Square;
