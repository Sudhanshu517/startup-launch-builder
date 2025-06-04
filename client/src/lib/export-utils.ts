import type { Section, PageSettings } from "@shared/schema";

export function exportToHTML(sections: Section[], settings: PageSettings): string {
  const sectionHTML = sections.map(section => {
    switch (section.type) {
      case 'hero':
        return `
    <section class="hero-section py-20 text-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div class="container mx-auto px-6">
        <h1 class="text-5xl font-bold text-gray-900 mb-6">
          ${section.content.title || 'Your Headline Here'}
        </h1>
        <p class="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          ${section.content.subtitle || 'Your subtitle here'}
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="#" class="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700">
            ${section.content.primaryCTA || 'Get Started'}
          </a>
          ${section.content.secondaryCTA ? `
          <a href="#" class="border border-gray-300 text-gray-700 px-8 py-4 rounded-lg text-lg font-semibold hover:border-gray-400">
            ${section.content.secondaryCTA}
          </a>
          ` : ''}
        </div>
      </div>
    </section>`;

      case 'features':
        return `
    <section class="features-section py-16">
      <div class="container mx-auto px-6">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold text-gray-900 mb-4">
            ${section.content.title || 'Features'}
          </h2>
          <p class="text-lg text-gray-600">
            ${section.content.description || 'Feature description'}
          </p>
        </div>
        <div class="grid md:grid-cols-3 gap-8">
          <div class="text-center">
            <div class="w-16 h-16 bg-blue-500 rounded-lg mx-auto mb-4"></div>
            <h3 class="text-xl font-semibold mb-2">Feature One</h3>
            <p class="text-gray-600">Feature description</p>
          </div>
          <div class="text-center">
            <div class="w-16 h-16 bg-green-500 rounded-lg mx-auto mb-4"></div>
            <h3 class="text-xl font-semibold mb-2">Feature Two</h3>
            <p class="text-gray-600">Feature description</p>
          </div>
          <div class="text-center">
            <div class="w-16 h-16 bg-purple-500 rounded-lg mx-auto mb-4"></div>
            <h3 class="text-xl font-semibold mb-2">Feature Three</h3>
            <p class="text-gray-600">Feature description</p>
          </div>
        </div>
      </div>
    </section>`;

      case 'cta':
        return `
    <section class="cta-section py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-center">
      <div class="container mx-auto px-6">
        <h2 class="text-4xl font-bold mb-4">
          ${section.content.title || 'Ready to Get Started?'}
        </h2>
        <p class="text-xl mb-8 opacity-90">
          ${section.content.subtitle || 'Join thousands of satisfied customers'}
        </p>
        <a href="#" class="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100">
          ${section.content.primaryCTA || 'Get Started'}
        </a>
      </div>
    </section>`;

      default:
        return `<section class="${section.type}-section py-16"><!-- ${section.type} content --></section>`;
    }
  }).join('\n');

  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Landing Page</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=${settings.fontFamily}:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <style>
        body { font-family: '${settings.fontFamily}', sans-serif; }
        .container { max-width: 1200px; }
    </style>
</head>
<body>
${sectionHTML}
</body>
</html>`;
}

export function exportToReact(sections: Section[], settings: PageSettings): string {
  const sectionComponents = sections.map((section, index) => {
    const componentName = `${section.type.charAt(0).toUpperCase()}${section.type.slice(1)}Section`;
    
    return `
const ${componentName}${index} = () => {
  return (
    <section className="${section.type}-section py-16${section.type === 'hero' ? ' text-center bg-gradient-to-br from-blue-50 to-indigo-100' : ''}">
      <div className="container mx-auto px-6">
        ${section.type === 'hero' ? `
        <h1 className="text-5xl font-bold text-gray-900 mb-6">
          ${section.content.title || 'Your Headline Here'}
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          ${section.content.subtitle || 'Your subtitle here'}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700">
            ${section.content.primaryCTA || 'Get Started'}
          </button>
        </div>` : `<!-- ${section.type} content -->`}
      </div>
    </section>
  );
};`;
  }).join('\n');

  return `import React from 'react';

${sectionComponents}

const LandingPage = () => {
  return (
    <div style={{ fontFamily: '${settings.fontFamily}' }}>
      ${sections.map((_, index) => {
        const componentName = `${sections[index].type.charAt(0).toUpperCase()}${sections[index].type.slice(1)}Section`;
        return `<${componentName}${index} />`;
      }).join('\n      ')}
    </div>
  );
};

export default LandingPage;`;
}

export function exportToJSON(sections: Section[], settings: PageSettings): string {
  return JSON.stringify({
    pageSettings: settings,
    sections: sections,
  }, null, 2);
}
