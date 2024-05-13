import { StaticImageData } from "next/image";
import castleImage from "@/public/castle.png";
import gateImage from "@/public/gate.png";
import archerImage from "@/public/archer.png";
import spearmanImage from "@/public/spearman.png";
import horsemanImage from "@/public/horseman.png";
import wallImage from "@/public/wall.png";
import { UNITDATA_CLASS } from "@/schema/types";

const getCardImage = (image_tag: string): StaticImageData => {
  switch (image_tag) {
    case UNITDATA_CLASS.CASTLE:
      return castleImage;
    case UNITDATA_CLASS.GATE:
      return gateImage;
    case UNITDATA_CLASS.ARCHER:
      return archerImage;
    case UNITDATA_CLASS.WALL:
      return wallImage;
    case UNITDATA_CLASS.SPEARMAN:
      return spearmanImage;
    case UNITDATA_CLASS.HORSEMAN:
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
