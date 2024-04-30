import { Draggable, DraggableProvided } from "@hello-pangea/dnd";
import CardImage from "./components/cardImage";
import { unitIsStructure } from "../shared/utils";
import { UnitData } from "@/schema/types";

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
    return (
        <Draggable
            draggableId={unit.id}
            index={0}
            isDragDisabled={unitIsStructure(unit)}
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
