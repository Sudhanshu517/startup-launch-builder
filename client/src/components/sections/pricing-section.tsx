import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import type { Section } from "@shared/schema";

interface PricingSectionProps {
  section: Section;
}

const defaultPlans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    features: ["1 Landing Page", "Basic Templates", "Export HTML/CSS"],
    popular: false,
  },
  {
    name: "Pro",
    price: "$29",
    period: "month",
    features: ["Unlimited Pages", "Premium Templates", "Advanced Export", "Priority Support"],
    popular: true,
  },
  {
    name: "Agency",
    price: "$99",
    period: "month",
    features: ["Everything in Pro", "White Label", "Team Collaboration", "API Access"],
    popular: false,
  },
];

export function PricingSection({ section }: PricingSectionProps) {
  const { title, subtitle, plans = defaultPlans } = section.content;

  return (
    <div className="max-w-6xl mx-auto text-center">
      <h2 className="text-3xl font-bold text-slate-900 mb-4">
        {title || 'Simple, Transparent Pricing'}
      </h2>
      
      <p className="text-lg text-slate-600 mb-12">
        {subtitle || 'Choose the plan that fits your needs'}
      </p>
      
      <div className="grid md:grid-cols-3 gap-8">
        {plans.map((plan: any, index: number) => (
          <div
            key={index}
            className={`border rounded-lg p-6 ${
              plan.popular
                ? 'border-blue-500 shadow-lg scale-105'
                : 'border-slate-200'
            }`}
          >
            {plan.popular && (
              <div className="bg-blue-500 text-white text-sm font-medium px-3 py-1 rounded-full inline-block mb-4">
                Most Popular
              </div>
            )}
            
            <h3 className="text-xl font-semibold text-slate-900 mb-2">
              {plan.name}
            </h3>
            
            <div className="mb-6">
              <span className="text-3xl font-bold text-slate-900">
                {plan.price}
              </span>
              <span className="text-slate-600">/{plan.period}</span>
            </div>
            
            <ul className="space-y-3 mb-6">
              {plan.features.map((feature: string, featureIndex: number) => (
                <li key={featureIndex} className="flex items-center">
                  <Check className="w-5 h-5 text-green-500 mr-2" />
                  <span className="text-slate-600">{feature}</span>
                </li>
              ))}
            </ul>
            
            <Button
              className="w-full"
              variant={plan.popular ? "default" : "outline"}
            >
              Get Started
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
