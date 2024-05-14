import { StaticImageData } from "next/image";

import castleBlueImage from "@/public/castle_blue.png";
import gateBlueImage from "@/public/gate_blue.png";
import wallBlueImage from "@/public/wall_blue.png";
import spearmanBlueImage from "@/public/spearman_blue.png";

import castleRedImage from "@/public/castle_red.png";
import gateRedImage from "@/public/gate_red.png";
import wallRedImage from "@/public/wall_red.png";
import spearmanRedImage from "@/public/spearman_red.png";

import { UNITDATA_CLASS } from "@/schema/types";

const getCardImage = (image_tag: string, isRed: boolean): StaticImageData => {
  switch (image_tag) {
    case UNITDATA_CLASS.CASTLE:
      return isRed ? castleRedImage : castleBlueImage;
    case UNITDATA_CLASS.GATE:
      return isRed ? gateRedImage : gateBlueImage;
    case UNITDATA_CLASS.WALL:
      return isRed ? wallRedImage : wallBlueImage;
    case UNITDATA_CLASS.SPEARMAN:
      return isRed ? spearmanRedImage : spearmanBlueImage;
    default:
      return isRed ? spearmanRedImage : spearmanBlueImage;
  }
};

type CardImageProps = {
  unitClass: string;
  isDragging: boolean;
  isRed: boolean;
};

const CardImage = ({ unitClass, isDragging, isRed }: CardImageProps) => {
  return (
    <div className={`h-full w-full ${isDragging ? "card" : ""} image-full`}>
      <figure>
        <div
          className="square"
          style={{
            backgroundImage: `url(${getCardImage(unitClass, isRed).src})`,
          }}
        ></div>
      </figure>
    </div>
  );
};

export default CardImage;
