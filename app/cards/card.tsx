import { Draggable, DraggableProvided } from "@hello-pangea/dnd";
import archerImage from "../../public/archer.png";

const draggableThing = ({
    draggableProps,
    dragHandleProps,
    innerRef,
}: DraggableProvided) => {
    return (
        <div {...draggableProps} {...dragHandleProps} ref={innerRef}>
            <div
                className="w-full h-full square"
                style={{ backgroundImage: `url(${archerImage.src})` }}
            ></div>
        </div>
    );
};

const Card = ({
    index,
    draggableId,
}: {
    index: number;
    draggableId: string;
}) => {
    return (
        <Draggable draggableId={draggableId} index={index}>
            {draggableThing}
        </Draggable>
    );
};

export default Card;
