import { StaticImageData } from "next/image";
import castleImage from "@/public/castle.png";
import gateImage from "@/public/gate.png";
import archerImage from "@/public/archer.png";
import spearmanImage from "@/public/spearman.png";
import horsemanImage from "@/public/horseman.png";
import wallImage from "@/public/wall.png";
import { UNITS } from "@/app/shared/enums/units";

const getCardImage = (image_tag: string): StaticImageData => {
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

type CardImageProps = {
    unitClass: string;
    isDragging: boolean;
};

const CardImage = ({ unitClass, isDragging }: CardImageProps) => {
    return (
        <div className={`h-full w-full ${isDragging ? "card" : ""} image-full`}>
            <figure>
                <div
                    className="square"
                    style={{
                        backgroundImage: `url(${getCardImage(unitClass).src})`,
                    }}
                ></div>
            </figure>
        </div>
    );
};

export default CardImage;
