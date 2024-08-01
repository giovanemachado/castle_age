import Image, { StaticImageData } from "next/image";

import castleIllustration from "@/public/castle.png";
import gateIllustration from "@/public/gate.png";
import wallIllustration from "@/public/wall.png";
import spearmanIllustration from "@/public/spearman.png";
import horsemanIllustration from "@/public/horseman.png";
import archerIllustration from "@/public/archer.png";

import background from "@/public/background.png";
import flag from "@/public/flag.png";

import { UNITDATA_CLASS } from "@/schema/types";

const getIllustration = (illustration_tag: string): StaticImageData => {
  switch (illustration_tag) {
    case UNITDATA_CLASS.CASTLE:
      return castleIllustration;
    case UNITDATA_CLASS.GATE:
      return gateIllustration;
    case UNITDATA_CLASS.WALL:
      return wallIllustration;
    case UNITDATA_CLASS.SPEARMAN:
      return spearmanIllustration;
    case UNITDATA_CLASS.HORSEMAN:
      return horsemanIllustration;
    case UNITDATA_CLASS.ARCHER:
      return archerIllustration;
    default:
      return spearmanIllustration;
  }
};

const getColor = (isRed: boolean): string => {
  const blue = "#7DAAB2";
  const red = "#B17D7D";
  let color = blue;

  if (isRed) {
    color = red;
  }

  return color;
};

type IllustrationProps = {
  unitClass: string;
  isDragging: boolean;
  isRed: boolean;
};

const Illustration = ({ unitClass, isDragging, isRed }: IllustrationProps) => {
  return (
    <div className={`${isDragging ? "card" : ""} ease-in duration-100`}>
      <div className="image-wrapper">
        <Image
          src={background.src}
          alt={"Background"}
          width={100}
          height={100}
          unoptimized
        />
      </div>
      <div className="image-wrapper">
        <Image
          src={getIllustration(unitClass).src}
          alt={unitClass}
          width={100}
          height={100}
          unoptimized
        />
      </div>
      <div className="image-wrapper">
        <div
          style={{
            overflow: "hidden",
          }}
        >
          <Image
            src={flag.src}
            alt={"Flag"}
            width={100}
            height={100}
            style={{
              filter: `drop-shadow(0px 1000px 0 ${getColor(isRed)})`,
              transform: "translateY(-1000px)",
            }}
            unoptimized
          />
          <div className="absolute top-0 right-0 flex flex-col items-center">
            <div
              className="text-2xl w-[25px] text-center mr-[5px] mt-[2px]"
              style={{
                color: "#2C2C2C",
              }}
            ></div>
          </div>
        </div>
      </div>
      <div
        className="tooltip tooltip-bottom w-[100px] h-[100px]"
        data-tip={unitClass.charAt(0).toUpperCase() + unitClass.slice(1)}
        style={{ borderBottom: 0 }}
      />
    </div>
  );
};

export default Illustration;
