type IndicatorProps = {
  children: React.ReactNode;
  isDragEnabled: boolean;
  unitMovedInTurn: boolean;
  unitIsDragging: boolean;
  unitClass: string;
};

const Indicator = ({
  children,
  isDragEnabled,
  unitMovedInTurn,
  unitIsDragging,
  unitClass,
}: IndicatorProps) => {
  return (
    <div className="indicator hover:z-10 hover:brightness-110 ease-in duration-100 block">
      {isDragEnabled && !unitMovedInTurn && (
        <span className="indicator-item indicator-top indicator-start badge badge-secondary">
          {unitIsDragging ? "..." : "!"}
        </span>
      )}
      {children}
    </div>
  );
};

export default Indicator;
