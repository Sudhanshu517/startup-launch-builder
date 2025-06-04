import { MousePointer, Smartphone, Download } from "lucide-react";
import type { Section } from "@shared/schema";

interface FeaturesSectionProps {
  section: Section;
}

const defaultFeatures = [
  {
    icon: MousePointer,
    title: "Drag & Drop",
    description: "Intuitive drag-and-drop interface makes building pages effortless",
    color: "bg-blue-500",
  },
  {
    icon: Smartphone,
    title: "Responsive Design",
    description: "Your pages look perfect on all devices automatically",
    color: "bg-green-500",
  },
  {
    icon: Download,
    title: "Export Ready",
    description: "Export clean HTML/CSS code ready for deployment",
    color: "bg-purple-500",
  },
];

export function FeaturesSection({ section }: FeaturesSectionProps) {
  const { title, description, features = defaultFeatures } = section.content;

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-slate-900 mb-4">
          {title || 'Powerful Features'}
        </h2>
        <p className="text-lg text-slate-600">
          {description || 'Everything you need to create professional landing pages'}
        </p>
      </div>
      
      <div className="grid md:grid-cols-3 gap-8">
        {features.map((feature: any, index: number) => {
          const IconComponent = feature.icon || MousePointer;
          return (
            <div key={index} className="text-center">
              <div className={`w-16 h-16 ${feature.color || 'bg-blue-500'} rounded-lg flex items-center justify-center mx-auto mb-4`}>
                <IconComponent className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-slate-600">
                {feature.description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
