import { Draggable, DraggableProvided } from "@hello-pangea/dnd";
import CardImage from "./components/cardImage";
import { unitIsStructure } from "../shared/utils";
import { UnitData } from "@/schema/types";
import { useState } from "react";

type DraggableCardProps = {
    imageComponent: React.ReactNode;
};

type CardProps = {
    unit: UnitData;
};

const draggable = ({
    draggableProps,
    dragHandleProps,
    innerRef,
    imageComponent,
}: DraggableProvided & DraggableCardProps) => {
    return (
        <div {...draggableProps} {...dragHandleProps} ref={innerRef}>
            {imageComponent}
        </div>
    );
};

const Card = ({ unit }: CardProps) => {
    const [itMoved, setItMoved] = useState(false);

    return (
        <Draggable
            draggableId={unit.id}
            index={0}
            isDragDisabled={unitIsStructure(unit) || itMoved}
        >
            {(provided, snapshot) =>
                draggable({
                    imageComponent: CardImage({
                        unitClass: unit.class,
                        isDragging: snapshot.isDragging,
                    }),
                    ...provided,
                })
            }
        </Draggable>
    );
};

export default Card;
