import { Button } from "@/components/ui/button";
import type { Section } from "@shared/schema";

interface HeroSectionProps {
  section: Section;
}

export function HeroSection({ section }: HeroSectionProps) {
  const { title, subtitle, primaryCTA, secondaryCTA } = section.content;

  return (
    <div className="text-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-4xl mx-auto">
        <img
          src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400"
          alt="Startup team collaboration"
          className="w-32 h-32 rounded-full mx-auto mb-8 object-cover shadow-lg"
        />
        
        <h1 className="text-5xl font-bold text-slate-900 mb-6">
          {title || 'Launch Your Startup In Minutes, Not Months'}
        </h1>
        
        <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
          {subtitle || 'Create stunning landing pages with our drag-and-drop builder. No coding required, just pure creativity.'}
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="text-lg px-8 py-4">
            {primaryCTA || 'Start Building Free'}
          </Button>
          
          {secondaryCTA && (
            <Button variant="outline" size="lg" className="text-lg px-8 py-4">
              {secondaryCTA}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
