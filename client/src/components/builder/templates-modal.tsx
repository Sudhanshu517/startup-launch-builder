import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useBuilder } from "@/hooks/use-builder";
import { templates } from "@/lib/section-templates";

export function TemplatesModal() {
  const { showTemplatesModal, setShowTemplatesModal, loadTemplate } = useBuilder();

  const handleSelectTemplate = (templateId: string) => {
    loadTemplate(templateId);
    setShowTemplatesModal(false);
  };

  return (
    <Dialog open={showTemplatesModal} onOpenChange={setShowTemplatesModal}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="text-2xl">Choose a Template</DialogTitle>
        </DialogHeader>
        
        <div className="overflow-y-auto max-h-96 p-1">
          <div className="grid md:grid-cols-3 gap-6">
            {templates.map((template) => (
              <div
                key={template.id}
                className="border border-slate-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => handleSelectTemplate(template.id)}
              >
                <img
                  src={template.preview}
                  alt={`${template.name} template preview`}
                  className="w-full h-32 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-semibold text-slate-900 mb-1">{template.name}</h3>
                  <p className="text-sm text-slate-600">{template.description}</p>
                </div>
              </div>
            ))}
            
            {/* Blank Template */}
            <div
              className="border-2 border-dashed border-slate-300 rounded-lg flex flex-col items-center justify-center h-48 hover:border-blue-500 transition-colors cursor-pointer"
              onClick={() => handleSelectTemplate('blank')}
            >
              <div className="text-3xl text-slate-400 mb-2">+</div>
              <h3 className="font-semibold text-slate-900 mb-1">Start Blank</h3>
              <p className="text-sm text-slate-600">Build from scratch</p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
