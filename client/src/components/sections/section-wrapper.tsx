import { Button } from "@/components/ui/button";
import { useBuilder } from "@/hooks/use-builder";
import { Edit, Trash2, GripVertical } from "lucide-react";
import type { Section } from "@shared/schema";
import type { DraggableProvidedDragHandleProps } from "react-beautiful-dnd";

interface SectionWrapperProps {
  section: Section;
  children: React.ReactNode;
  dragHandleProps?: DraggableProvidedDragHandleProps | null;
  isDragging?: boolean;
}

export function SectionWrapper({ section, children, dragHandleProps, isDragging }: SectionWrapperProps) {
  const { selectSection, deleteSection, selectedSection, isPreviewMode } = useBuilder();

  const isSelected = selectedSection?.id === section.id;

  if (isPreviewMode) {
    return <div>{children}</div>;
  }

  const paddingClass = {
    small: 'py-8',
    medium: 'py-16',
    large: 'py-24',
    xl: 'py-32',
  }[section.style?.paddingY || 'medium'];

  const marginClass = {
    none: 'px-0',
    normal: 'px-6',
    large: 'px-12',
  }[section.style?.paddingX || 'normal'];

  return (
    <section
      className={`relative group cursor-pointer transition-all duration-200 ${paddingClass} ${marginClass} ${
        isSelected ? 'ring-2 ring-blue-500 ring-opacity-50' : ''
      } ${isDragging ? 'opacity-50 shadow-lg' : ''}`}
      onClick={(e) => {
        e.stopPropagation();
        selectSection(section.id);
      }}
      style={{
        backgroundColor: section.style?.backgroundColor,
        fontFamily: section.style?.fontFamily,
      }}
    >
      {/* Section Controls */}
      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex space-x-1 z-10">
        <Button
          size="sm"
          variant="secondary"
          className="h-8 w-8 p-0 bg-white shadow-md hover:bg-slate-50"
          onClick={(e) => {
            e.stopPropagation();
            selectSection(section.id);
          }}
        >
          <Edit className="w-3 h-3" />
        </Button>
        
        <Button
          size="sm"
          variant="destructive"
          className="h-8 w-8 p-0 bg-white shadow-md hover:bg-red-50 text-red-600 hover:text-red-700"
          onClick={(e) => {
            e.stopPropagation();
            deleteSection(section.id);
          }}
        >
          <Trash2 className="w-3 h-3" />
        </Button>
        
        <div
          {...dragHandleProps}
          className="h-8 w-8 p-0 bg-white shadow-md rounded cursor-move flex items-center justify-center text-slate-400 hover:text-slate-600"
        >
          <GripVertical className="w-3 h-3" />
        </div>
      </div>

      {children}
    </section>
  );
}
