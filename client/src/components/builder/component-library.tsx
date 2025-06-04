import { Droppable, Draggable } from "react-beautiful-dnd";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { GripVertical, Layout, Users, Star, Megaphone, Building, CreditCard } from "lucide-react";

const sectionTypes = [
  {
    id: "hero",
    name: "Hero Section",
    description: "Main headline and CTA",
    icon: Layout,
    preview: (
      <div className="space-y-2">
        <div className="h-2 bg-slate-300 rounded w-3/4"></div>
        <div className="h-1.5 bg-slate-200 rounded w-1/2"></div>
        <div className="h-6 bg-blue-500 rounded w-20"></div>
      </div>
    ),
  },
  {
    id: "features",
    name: "Features Grid",
    description: "Product features showcase",
    icon: Layout,
    preview: (
      <div className="grid grid-cols-2 gap-2">
        <div className="space-y-1">
          <div className="h-4 w-4 bg-green-500 rounded"></div>
          <div className="h-1 bg-slate-300 rounded"></div>
        </div>
        <div className="space-y-1">
          <div className="h-4 w-4 bg-purple-500 rounded"></div>
          <div className="h-1 bg-slate-300 rounded"></div>
        </div>
      </div>
    ),
  },
  {
    id: "testimonials",
    name: "Testimonials",
    description: "Customer reviews",
    icon: Users,
    preview: (
      <div className="space-y-2">
        <div className="h-1.5 bg-slate-300 rounded"></div>
        <div className="flex items-center space-x-2">
          <div className="h-4 w-4 bg-slate-400 rounded-full"></div>
          <div className="h-1 bg-slate-200 rounded flex-1"></div>
        </div>
      </div>
    ),
  },
  {
    id: "cta",
    name: "Call to Action",
    description: "Final conversion section",
    icon: Megaphone,
    preview: (
      <div className="text-center space-y-2">
        <div className="h-2 bg-slate-300 rounded w-2/3 mx-auto"></div>
        <div className="h-6 bg-yellow-500 rounded w-24 mx-auto"></div>
      </div>
    ),
  },
  {
    id: "about",
    name: "About Us",
    description: "Company story",
    icon: Building,
    preview: (
      <div className="flex space-x-2">
        <div className="w-8 h-8 bg-slate-400 rounded"></div>
        <div className="flex-1 space-y-1">
          <div className="h-1.5 bg-slate-300 rounded"></div>
          <div className="h-1 bg-slate-200 rounded w-3/4"></div>
        </div>
      </div>
    ),
  },
  {
    id: "pricing",
    name: "Pricing Plans",
    description: "Subscription tiers",
    icon: CreditCard,
    preview: (
      <div className="grid grid-cols-3 gap-1">
        <div className="h-8 bg-slate-200 rounded"></div>
        <div className="h-8 bg-blue-500 rounded"></div>
        <div className="h-8 bg-slate-200 rounded"></div>
      </div>
    ),
  },
];

export function ComponentLibrary() {
  return (
    <aside className="w-80 bg-white border-r border-slate-200 flex flex-col">
      <div className="p-4 border-b border-slate-200">
        <h2 className="text-lg font-semibold text-slate-800 mb-3">Components</h2>
        <div className="flex space-x-1 bg-slate-100 p-1 rounded-lg">
          <Button variant="secondary" size="sm" className="flex-1 text-xs bg-white shadow-sm">
            Sections
          </Button>
          <Button variant="ghost" size="sm" className="flex-1 text-xs text-slate-600">
            Elements
          </Button>
        </div>
      </div>
      
      <Droppable droppableId="component-library" isDropDisabled={true}>
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="flex-1 overflow-y-auto p-4 space-y-4"
          >
            {sectionTypes.map((section, index) => (
              <Draggable key={section.id} draggableId={section.id} index={index}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    className={`section-preview bg-slate-50 border border-slate-200 rounded-lg p-4 cursor-pointer transition-all duration-200 ${
                      snapshot.isDragging ? 'shadow-lg rotate-2' : 'hover:shadow-md hover:-translate-y-1'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="text-sm font-semibold text-slate-800">{section.name}</h3>
                        <p className="text-xs text-slate-500">{section.description}</p>
                      </div>
                      <div {...provided.dragHandleProps} className="text-slate-400 hover:text-slate-600">
                        <GripVertical className="w-4 h-4" />
                      </div>
                    </div>
                    {section.preview}
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </aside>
  );
}
