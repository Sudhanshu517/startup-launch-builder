import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useBuilder } from "@/hooks/use-builder";
import { Rocket, Eye, Layers, Download } from "lucide-react";

export function TopToolbar() {
  const { 
    currentPage, 
    isPreviewMode, 
    setIsPreviewMode,
    setShowTemplatesModal,
    setShowExportModal,
    savePage
  } = useBuilder();

  return (
    <header className="bg-white border-b border-slate-200 px-6 py-3 flex items-center justify-between z-50">
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
            <Rocket className="w-4 h-4 text-white" />
          </div>
          <h1 className="text-xl font-bold text-slate-800">LaunchNow</h1>
        </div>
        <Separator orientation="vertical" className="h-6" />
        <span className="text-sm text-slate-600">
          {currentPage?.name || 'My Startup Landing Page'}
        </span>
      </div>
      
      <div className="flex items-center space-x-3">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsPreviewMode(!isPreviewMode)}
          className="text-sm"
        >
          <Eye className="w-4 h-4 mr-2" />
          {isPreviewMode ? 'Edit' : 'Preview'}
        </Button>
        
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowTemplatesModal(true)}
          className="text-sm"
        >
          <Layers className="w-4 h-4 mr-2" />
          Templates
        </Button>
        
        <Button
          variant="outline"
          size="sm"
          onClick={savePage}
          className="text-sm"
        >
          Save
        </Button>
        
        <Button
          size="sm"
          onClick={() => setShowExportModal(true)}
          className="text-sm"
        >
          <Download className="w-4 h-4 mr-2" />
          Export
        </Button>
      </div>
    </header>
  );
}
