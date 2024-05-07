import { Draggable, DraggableProvided } from "@hello-pangea/dnd";
import CardImage from "./components/cardImage";
import { UnitData } from "@/schema/types";
import { unitIsStructure } from "../shared/utils";

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

/**
 * Representation of a Card in the game (an unit). It's a draggable item, and you can interact with most of them.
 */
const Card = ({ unit }: CardProps) => {
    return (
        <Draggable
            draggableId={unit.id}
            index={0}
            isDragDisabled={unitIsStructure(unit) || unit.movementInTurn.moved}
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
