import { Draggable, DraggableProvided } from "@hello-pangea/dnd";
import castleImage from "../../public/castle.png";
import gateImage from "../../public/gate.png";
import archerImage from "../../public/archer.png";
import spearmanImage from "../../public/spearman.png";
import horsemanImage from "../../public/horseman.png";
import wallImage from "../../public/wall.png";
import { StaticImageData } from "next/image";
import { UNITS } from "../shared/enums/units";

type ImageProp = {
    image: React.ReactNode;
};

const getImage = (image_tag: string): StaticImageData => {
    switch (image_tag) {
        case UNITS.CASTLE:
            return castleImage;
        case UNITS.GATE:
            return gateImage;
        case UNITS.ARCHER:
            return archerImage;
        case UNITS.WALL:
            return wallImage;
        case UNITS.SPEARMAN:
            return spearmanImage;
        case UNITS.HORSEMAN:
            return horsemanImage;
        default:
            return archerImage;
    }
};

const draggableThing = ({
    draggableProps,
    dragHandleProps,
    innerRef,
    image,
}: DraggableProvided & ImageProp) => {
    return (
        <div {...draggableProps} {...dragHandleProps} ref={innerRef}>
            {image}
        </div>
    );
};

const image = (image_tag: string) => {
    return (
        <div
            className="w-full h-full square"
            style={{ backgroundImage: `url(${getImage(image_tag).src})` }}
        ></div>
    );
};

const Card = ({
    index,
    draggableId,
    image_tag,
}: {
    index: number;
    draggableId: string;
    image_tag: string;
}) => {
    return (
        <Draggable draggableId={draggableId} index={index}>
            {(provided) =>
                draggableThing({
                    image: image(image_tag),
                    ...provided,
                })
            }
        </Draggable>
    );
};

export default Card;
