import { BeforeCapture, DragDropContext, DropResult } from "@hello-pangea/dnd";
import { validDropResult } from "./utils";
import { useGameStore } from "@/app/store/gameStoreProvider";
import { useShallow } from "zustand/react/shallow";
import { Rows } from "./rows";

/**
 * Represents the whole map of the game, showing all Squares and Cards in it.
 */
const Map = () => {
  const { gameMap, setUnitNewLocalization, setUnitInDrag } = useGameStore(
    useShallow((state) => ({
      gameMap: state.gameMap,
      setUnitNewLocalization: state.setUnitNewLocalization,
      setUnitInDrag: state.setUnitInDrag,
    })),
  );

  const onBeforeCapture = (beforeCapture: BeforeCapture) => {
    setUnitInDrag(beforeCapture.draggableId);
  };

  const onDragEnd = (dropResult: DropResult) => {
    const result = validDropResult(dropResult);
    setUnitInDrag();

    if (!result) {
      return;
    }

    const { destination, draggableId } = result;
    setUnitNewLocalization(draggableId, destination.droppableId);
  };

  return (
    <div className="flex-col">
      <DragDropContext onBeforeCapture={onBeforeCapture} onDragEnd={onDragEnd}>
        <div className="map">
          <Rows rows={gameMap?.rows ?? []} />
        </div>
      </DragDropContext>
    </div>
  );
};

export default Map;
