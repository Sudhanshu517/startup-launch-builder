import { Button } from "@/components/ui/button";
import type { Section } from "@shared/schema";

interface CtaSectionProps {
  section: Section;
}

export function CtaSection({ section }: CtaSectionProps) {
  const { title, subtitle, primaryCTA, secondaryCTA } = section.content;

  return (
    <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-center">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-4xl font-bold mb-4">
          {title || 'Ready to Launch Your Startup?'}
        </h2>
        
        <p className="text-xl mb-8 opacity-90">
          {subtitle || 'Join thousands of founders who have built their landing pages with LaunchNow'}
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" variant="secondary" className="text-lg px-8 py-4">
            {primaryCTA || 'Get Started Free'}
          </Button>
          
          {secondaryCTA && (
            <Button variant="outline" size="lg" className="text-lg px-8 py-4 border-white text-white hover:bg-white hover:text-blue-600">
              {secondaryCTA}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
