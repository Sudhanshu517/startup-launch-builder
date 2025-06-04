import { createContext, useContext, useState, useCallback, useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { Section, PageSettings, Page } from "@shared/schema";
import { nanoid } from "nanoid";

interface BuilderContextType {
  // State
  sections: Section[];
  selectedSection: Section | null;
  pageSettings: PageSettings;
  currentPage: Page | null;
  viewMode: 'desktop' | 'mobile';
  zoom: number;
  isPreviewMode: boolean;
  showTemplatesModal: boolean;
  showExportModal: boolean;

  // Actions
  addSection: (type: Section['type'], index?: number) => void;
  deleteSection: (id: string) => void;
  duplicateSection: (id: string) => void;
  reorderSections: (fromIndex: number, toIndex: number) => void;
  selectSection: (id: string) => void;
  updateSectionContent: (id: string, content: Partial<Section['content']>) => void;
  updateSectionStyle: (id: string, style: Partial<Section['style']>) => void;
  updatePageSettings: (settings: Partial<PageSettings>) => void;
  setViewMode: (mode: 'desktop' | 'mobile') => void;
  setZoom: (zoom: number) => void;
  setIsPreviewMode: (preview: boolean) => void;
  setShowTemplatesModal: (show: boolean) => void;
  setShowExportModal: (show: boolean) => void;
  loadTemplate: (templateId: string) => void;
  savePage: () => void;
}

const BuilderContext = createContext<BuilderContextType | null>(null);

const defaultPageSettings: PageSettings = {
  primaryColor: '#3B82F6',
  fontFamily: 'Inter',
  backgroundColor: '#ffffff',
  responsive: true,
};

const createDefaultSection = (type: Section['type']): Section => {
  const baseSection = {
    id: nanoid(),
    type,
    content: {},
    style: {},
    order: 0,
  };

  switch (type) {
    case 'hero':
      return {
        ...baseSection,
        content: {
          title: 'Launch Your Startup\nIn Minutes, Not Months',
          subtitle: 'Create stunning landing pages with our drag-and-drop builder. No coding required, just pure creativity.',
          primaryCTA: 'Start Building Free',
          secondaryCTA: 'Watch Demo',
        },
      };
    case 'features':
      return {
        ...baseSection,
        content: {
          title: 'Powerful Features',
          description: 'Everything you need to create professional landing pages',
        },
      };
    case 'testimonials':
      return {
        ...baseSection,
        content: {
          title: 'What Our Users Say',
        },
      };
    case 'cta':
      return {
        ...baseSection,
        content: {
          title: 'Ready to Launch Your Startup?',
          subtitle: 'Join thousands of founders who have built their landing pages with LaunchNow',
          primaryCTA: 'Get Started Free',
        },
      };
    case 'about':
      return {
        ...baseSection,
        content: {
          title: 'About Our Mission',
          content: 'We believe that every entrepreneur should have access to professional-quality landing pages without the need for technical expertise.',
        },
      };
    case 'pricing':
      return {
        ...baseSection,
        content: {
          title: 'Simple, Transparent Pricing',
          subtitle: 'Choose the plan that fits your needs',
        },
      };
    default:
      return baseSection;
  }
};

export function BuilderProvider({ children }: { children: React.ReactNode }) {
  const [sections, setSections] = useState<Section[]>([]);
  const [selectedSection, setSelectedSection] = useState<Section | null>(null);
  const [pageSettings, setPageSettings] = useState<PageSettings>(defaultPageSettings);
  const [currentPage, setCurrentPage] = useState<Page | null>(null);
  const [viewMode, setViewMode] = useState<'desktop' | 'mobile'>('desktop');
  const [zoom, setZoom] = useState(100);
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [showTemplatesModal, setShowTemplatesModal] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);

  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Load existing page or create new one
  useEffect(() => {
    // For demo, create a default page with hero section
    const defaultSections = [createDefaultSection('hero')];
    setSections(defaultSections);
  }, []);

  const addSection = useCallback((type: Section['type'], index?: number) => {
    const newSection = createDefaultSection(type);
    
    setSections(prev => {
      const newSections = [...prev];
      const insertIndex = index !== undefined ? index : newSections.length;
      newSections.splice(insertIndex, 0, newSection);
      
      // Update order values
      return newSections.map((section, i) => ({
        ...section,
        order: i,
      }));
    });
    
    setSelectedSection(newSection);
  }, []);

  const deleteSection = useCallback((id: string) => {
    setSections(prev => prev.filter(section => section.id !== id));
    setSelectedSection(prev => prev?.id === id ? null : prev);
  }, []);

  const duplicateSection = useCallback((id: string) => {
    setSections(prev => {
      const sectionIndex = prev.findIndex(s => s.id === id);
      if (sectionIndex === -1) return prev;
      
      const sectionToDuplicate = prev[sectionIndex];
      const duplicatedSection = {
        ...sectionToDuplicate,
        id: nanoid(),
      };
      
      const newSections = [...prev];
      newSections.splice(sectionIndex + 1, 0, duplicatedSection);
      
      return newSections.map((section, i) => ({
        ...section,
        order: i,
      }));
    });
  }, []);

  const reorderSections = useCallback((fromIndex: number, toIndex: number) => {
    setSections(prev => {
      const newSections = [...prev];
      const [movedSection] = newSections.splice(fromIndex, 1);
      newSections.splice(toIndex, 0, movedSection);
      
      return newSections.map((section, i) => ({
        ...section,
        order: i,
      }));
    });
  }, []);

  const selectSection = useCallback((id: string) => {
    const section = sections.find(s => s.id === id);
    setSelectedSection(section || null);
  }, [sections]);

  const updateSectionContent = useCallback((id: string, content: Partial<Section['content']>) => {
    setSections(prev => prev.map(section => 
      section.id === id 
        ? { ...section, content: { ...section.content, ...content } }
        : section
    ));
    
    setSelectedSection(prev => 
      prev?.id === id 
        ? { ...prev, content: { ...prev.content, ...content } }
        : prev
    );
  }, []);

  const updateSectionStyle = useCallback((id: string, style: Partial<Section['style']>) => {
    setSections(prev => prev.map(section => 
      section.id === id 
        ? { ...section, style: { ...section.style, ...style } }
        : section
    ));
    
    setSelectedSection(prev => 
      prev?.id === id 
        ? { ...prev, style: { ...prev.style, ...style } }
        : prev
    );
  }, []);

  const updatePageSettings = useCallback((settings: Partial<PageSettings>) => {
    setPageSettings(prev => ({ ...prev, ...settings }));
  }, []);

  const loadTemplate = useCallback((templateId: string) => {
    if (templateId === 'blank') {
      setSections([]);
      setSelectedSection(null);
      return;
    }
    
    // For demo, load a basic template
    const templateSections = [
      createDefaultSection('hero'),
      createDefaultSection('features'),
      createDefaultSection('testimonials'),
      createDefaultSection('cta'),
    ];
    
    setSections(templateSections);
    setSelectedSection(null);
    
    toast({
      title: "Template Loaded",
      description: "Template has been applied to your page.",
    });
  }, [toast]);

  const savePage = useCallback(() => {
    // For demo, just show success message
    toast({
      title: "Page Saved",
      description: "Your page has been saved successfully.",
    });
  }, [toast]);

  const value: BuilderContextType = {
    sections,
    selectedSection,
    pageSettings,
    currentPage,
    viewMode,
    zoom,
    isPreviewMode,
    showTemplatesModal,
    showExportModal,
    addSection,
    deleteSection,
    duplicateSection,
    reorderSections,
    selectSection,
    updateSectionContent,
    updateSectionStyle,
    updatePageSettings,
    setViewMode,
    setZoom,
    setIsPreviewMode,
    setShowTemplatesModal,
    setShowExportModal,
    loadTemplate,
    savePage,
  };

  return (
    <BuilderContext.Provider value={value}>
      {children}
    </BuilderContext.Provider>
  );
}

export function useBuilder() {
  const context = useContext(BuilderContext);
  if (!context) {
    throw new Error('useBuilder must be used within a BuilderProvider');
  }
  return context;
}
