import type { Section } from "@shared/schema";

interface AboutSectionProps {
  section: Section;
}

export function AboutSection({ section }: AboutSectionProps) {
  const { title, content, image } = section.content;

  return (
    <div className="max-w-6xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <img
            src={image || "https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400"}
            alt="About us"
            className="w-full h-64 object-cover rounded-lg shadow-lg"
          />
        </div>
        
        <div>
          <h2 className="text-3xl font-bold text-slate-900 mb-6">
            {title || 'About Our Mission'}
          </h2>
          
          <div className="text-lg text-slate-600 space-y-4">
            <p>
              {content || 'We believe that every entrepreneur should have access to professional-quality landing pages without the need for technical expertise. Our drag-and-drop builder empowers founders to create stunning pages that convert visitors into customers.'}
            </p>
            <p>
              Founded by a team of experienced entrepreneurs and designers, we understand the challenges of building a startup. That's why we've made it our mission to provide the tools you need to succeed.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
