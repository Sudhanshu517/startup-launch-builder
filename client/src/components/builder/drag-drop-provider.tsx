import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { useBuilder } from "@/hooks/use-builder";

interface DragDropProviderProps {
  children: React.ReactNode;
}

export function DragDropProvider({ children }: DragDropProviderProps) {
  const { reorderSections, addSection } = useBuilder();

  const handleDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    // If dropping from component library to canvas
    if (source.droppableId === "component-library" && destination.droppableId === "canvas") {
      addSection(draggableId as any, destination.index);
      return;
    }

    // If reordering within canvas
    if (source.droppableId === "canvas" && destination.droppableId === "canvas") {
      if (source.index !== destination.index) {
        reorderSections(source.index, destination.index);
      }
      return;
    }
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      {children}
    </DragDropContext>
  );
}
