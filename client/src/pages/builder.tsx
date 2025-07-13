import { DragDropProvider } from "@/components/builder/drag-drop-provider";
import { TopToolbar } from "@/components/builder/top-toolbar";
import { ComponentLibrary } from "@/components/builder/component-library";
import { CanvasArea } from "@/components/builder/canvas-area";
import { PropertiesPanel } from "@/components/builder/properties-panel";
import { TemplatesModal } from "@/components/builder/templates-modal";
import { ExportModal } from "@/components/builder/export-modal";
import { BuilderProvider } from "@/hooks/use-builder";
import SaveLayoutButton from "../components/ui/SaveLayoutButton";




export default function Builder() {
  return (
    <BuilderProvider>
      <DragDropProvider>
        <div className="h-screen flex flex-col bg-slate-50">
          <TopToolbar />
          
          <div className="flex-1 flex overflow-hidden">
            <ComponentLibrary />
            <CanvasArea />
            <PropertiesPanel />
          </div>

          <TemplatesModal />
          <ExportModal />
          <SaveLayoutButton />
        </div>
      </DragDropProvider>
    </BuilderProvider>
  );
}
