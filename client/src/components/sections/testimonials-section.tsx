import { Star } from "lucide-react";
import type { Section } from "@shared/schema";

interface TestimonialsSectionProps {
  section: Section;
}

const defaultTestimonials = [
  {
    quote: "LaunchNow helped us create our landing page in just 30 minutes. The drag-and-drop interface is incredibly intuitive!",
    author: "Sarah Chen",
    role: "CEO, TechStart",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100",
  },
  {
    quote: "Perfect for non-technical founders. I built a professional page without writing a single line of code.",
    author: "Mark Rodriguez",
    role: "Founder, GrowthCo",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100",
  },
];

export function TestimonialsSection({ section }: TestimonialsSectionProps) {
  const { title, testimonials = defaultTestimonials } = section.content;

  return (
    <div className="bg-slate-50">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-slate-900 mb-12">
          {title || 'What Our Users Say'}
        </h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          {testimonials.map((testimonial: any, index: number) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex text-yellow-400 mb-4 justify-center">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-current" />
                ))}
              </div>
              
              <p className="text-slate-600 mb-6">
                "{testimonial.quote}"
              </p>
              
              <div className="flex items-center justify-center">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.author}
                  className="w-12 h-12 rounded-full mr-3 object-cover"
                />
                <div className="text-left">
                  <div className="font-semibold text-slate-900">
                    {testimonial.author}
                  </div>
                  <div className="text-sm text-slate-600">
                    {testimonial.role}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
