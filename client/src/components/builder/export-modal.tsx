import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useBuilder } from "@/hooks/use-builder";
import { exportToHTML, exportToReact, exportToJSON } from "@/lib/export-utils";
import { Code, FileCode, Download, Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function ExportModal() {
  const { showExportModal, setShowExportModal, sections, pageSettings } = useBuilder();
  const { toast } = useToast();

  const handleExport = (type: 'html' | 'react' | 'json') => {
    let content: string;
    let filename: string;
    
    switch (type) {
      case 'html':
        content = exportToHTML(sections, pageSettings);
        filename = 'landing-page.html';
        break;
      case 'react':
        content = exportToReact(sections, pageSettings);
        filename = 'LandingPage.jsx';
        break;
      case 'json':
        content = exportToJSON(sections, pageSettings);
        filename = 'page-config.json';
        break;
    }
    
    // Create and download file
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
    
    toast({
      title: "Export Complete",
      description: `${filename} has been downloaded.`,
    });
  };

  const handleCopyCode = async (type: 'html' | 'react' | 'json') => {
    let content: string;
    
    switch (type) {
      case 'html':
        content = exportToHTML(sections, pageSettings);
        break;
      case 'react':
        content = exportToReact(sections, pageSettings);
        break;
      case 'json':
        content = exportToJSON(sections, pageSettings);
        break;
    }
    
    try {
      await navigator.clipboard.writeText(content);
      toast({
        title: "Copied to Clipboard",
        description: "Code has been copied to your clipboard.",
      });
    } catch (error) {
      toast({
        title: "Copy Failed",
        description: "Failed to copy to clipboard.",
        variant: "destructive",
      });
    }
  };

  const exportOptions = [
    {
      id: 'html',
      name: 'HTML + CSS',
      description: 'Clean, semantic code ready for deployment',
      icon: Code,
    },
    {
      id: 'react',
      name: 'React Components',
      description: 'JSX components for React applications',
      icon: FileCode,
    },
    {
      id: 'json',
      name: 'JSON Config',
      description: 'Configuration file for later editing',
      icon: FileCode,
    },
  ];

  return (
    <Dialog open={showExportModal} onOpenChange={setShowExportModal}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl">Export Your Page</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {exportOptions.map((option) => {
            const IconComponent = option.icon;
            return (
              <div
                key={option.id}
                className="border border-slate-200 rounded-lg p-4 hover:border-blue-500 transition-colors"
              >
                <div className="flex items-center space-x-3 mb-3">
                  <IconComponent className="w-6 h-6 text-blue-500" />
                  <div>
                    <h3 className="font-semibold text-slate-900">{option.name}</h3>
                    <p className="text-sm text-slate-600">{option.description}</p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button
                    size="sm"
                    onClick={() => handleExport(option.id as any)}
                    className="flex-1"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleCopyCode(option.id as any)}
                  >
                    <Copy className="w-4 h-4 mr-2" />
                    Copy
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
}
