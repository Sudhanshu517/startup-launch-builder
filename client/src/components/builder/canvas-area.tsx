import { Droppable, Draggable } from "react-beautiful-dnd";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useBuilder } from "@/hooks/use-builder";
import { SectionWrapper } from "@/components/sections/section-wrapper";
import { HeroSection } from "@/components/sections/hero-section";
import { FeaturesSection } from "@/components/sections/features-section";
import { TestimonialsSection } from "@/components/sections/testimonials-section";
import { CtaSection } from "@/components/sections/cta-section";
import { AboutSection } from "@/components/sections/about-section";
import { PricingSection } from "@/components/sections/pricing-section";
import { Monitor, Smartphone, ZoomIn, ZoomOut, Plus } from "lucide-react";

const sectionComponents = {
  hero: HeroSection,
  features: FeaturesSection,
  testimonials: TestimonialsSection,
  cta: CtaSection,
  about: AboutSection,
  pricing: PricingSection,
};

export function CanvasArea() {
  const { sections, viewMode, setViewMode, zoom, setZoom } = useBuilder();

  const handleZoomIn = () => setZoom(Math.min(150, zoom + 25));
  const handleZoomOut = () => setZoom(Math.max(50, zoom - 25));

  return (
    <main className="flex-1 flex flex-col bg-slate-100">
      {/* Canvas Toolbar */}
      <div className="bg-white border-b border-slate-200 px-4 py-2 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 bg-slate-100 rounded-lg p-1">
            <Button
              variant={viewMode === 'desktop' ? 'secondary' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('desktop')}
              className="text-xs"
            >
              <Monitor className="w-3 h-3 mr-1" />
              Desktop
            </Button>
            <Button
              variant={viewMode === 'mobile' ? 'secondary' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('mobile')}
              className="text-xs"
            >
              <Smartphone className="w-3 h-3 mr-1" />
              Mobile
            </Button>
          </div>
          <div className="text-sm text-slate-500">
            {viewMode === 'desktop' ? '1200px × Auto' : '375px × Auto'}
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="sm" onClick={handleZoomOut}>
            <ZoomOut className="w-4 h-4" />
          </Button>
          <span className="text-sm text-slate-600">{zoom}%</span>
          <Button variant="ghost" size="sm" onClick={handleZoomIn}>
            <ZoomIn className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Canvas */}
      <div className="flex-1 p-6 overflow-auto canvas-grid">
        <div className="mx-auto" style={{ 
          maxWidth: viewMode === 'desktop' ? '1200px' : '375px',
          transform: `scale(${zoom / 100})`,
          transformOrigin: 'top center'
        }}>
          <Droppable droppableId="canvas">
            {(provided, snapshot) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className={`bg-white rounded-lg shadow-sm min-h-screen relative transition-all duration-200 ${
                  snapshot.isDraggingOver ? 'ring-2 ring-blue-500 ring-opacity-50' : ''
                }`}
              >
                {sections.length === 0 && !snapshot.isDraggingOver && (
                  <div className="absolute inset-0 flex items-center justify-center text-slate-500">
                    <div className="text-center">
                      <Plus className="w-12 h-12 mx-auto mb-4 text-slate-300" />
                      <p className="text-lg font-medium">Drop sections here to build your page</p>
                      <p className="text-sm">Drag components from the left sidebar</p>
                    </div>
                  </div>
                )}

                {sections.map((section, index) => {
                  const SectionComponent = sectionComponents[section.type];
                  
                  return (
                    <Draggable key={section.id} draggableId={section.id} index={index}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          className={snapshot.isDragging ? 'z-50' : ''}
                        >
                          <SectionWrapper
                            section={section}
                            dragHandleProps={provided.dragHandleProps}
                            isDragging={snapshot.isDragging}
                          >
                            <SectionComponent section={section} />
                          </SectionWrapper>
                        </div>
                      )}
                    </Draggable>
                  );
                })}
                
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      </div>
    </main>
  );
}
