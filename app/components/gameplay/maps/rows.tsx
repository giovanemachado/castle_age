import { SquareData } from "@/schema/types";
import { memo } from "react";
import { Row } from "./row";

type RowsProps = {
  rows: SquareData[][];
};

export const Rows = memo(function Rows({ rows }: RowsProps) {
  return rows.map((row: SquareData[], rowsIndex: number) => (
    <div key={`${rowsIndex}`} className="map-row">
      <Row row={row} rowsIndex={rowsIndex} />
    </div>
  ));
});
