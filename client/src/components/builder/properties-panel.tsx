import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useBuilder } from "@/hooks/use-builder";
import { Copy, Trash2 } from "lucide-react";

const colorOptions = [
  { name: "Primary", value: "#3B82F6", class: "bg-blue-500" },
  { name: "Success", value: "#10B981", class: "bg-green-500" },
  { name: "Purple", value: "#8B5CF6", class: "bg-purple-500" },
  { name: "Orange", value: "#F59E0B", class: "bg-orange-500" },
  { name: "Red", value: "#EF4444", class: "bg-red-500" },
];

const fontOptions = [
  "Inter",
  "Roboto", 
  "Open Sans",
  "Montserrat",
  "Poppins",
];

export function PropertiesPanel() {
  const { 
    selectedSection, 
    updateSectionContent, 
    updateSectionStyle,
    duplicateSection,
    deleteSection,
    pageSettings,
    updatePageSettings
  } = useBuilder();

  const handleContentChange = (key: string, value: any) => {
    if (selectedSection) {
      updateSectionContent(selectedSection.id, { [key]: value });
    }
  };

  const handleStyleChange = (key: string, value: any) => {
    if (selectedSection) {
      updateSectionStyle(selectedSection.id, { [key]: value });
    }
  };

  return (
    <aside className="w-80 bg-white border-l border-slate-200 flex flex-col">
      <div className="p-4 border-b border-slate-200">
        <h2 className="text-lg font-semibold text-slate-800">Properties</h2>
        <p className="text-sm text-slate-500 mt-1">
          {selectedSection ? `Configure ${selectedSection.type} section` : 'Select an element to configure'}
        </p>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {selectedSection ? (
          <>
            {/* Section Settings */}
            <div>
              <h3 className="text-sm font-semibold text-slate-800 mb-3">Section Settings</h3>
              <div className="space-y-3">
                <div>
                  <Label className="text-xs font-medium text-slate-600">Background</Label>
                  <div className="flex space-x-2 mt-1">
                    {colorOptions.map((color) => (
                      <button
                        key={color.value}
                        className={`w-8 h-8 rounded border-2 ${color.class} ${
                          selectedSection.style?.backgroundColor === color.value
                            ? 'border-slate-800'
                            : 'border-slate-300'
                        }`}
                        onClick={() => handleStyleChange('backgroundColor', color.value)}
                      />
                    ))}
                  </div>
                </div>
                
                <div>
                  <Label className="text-xs font-medium text-slate-600">Padding</Label>
                  <div className="grid grid-cols-2 gap-2 mt-1">
                    <Select
                      value={selectedSection.style?.paddingY || 'medium'}
                      onValueChange={(value) => handleStyleChange('paddingY', value)}
                    >
                      <SelectTrigger className="text-sm">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="small">Small</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="large">Large</SelectItem>
                        <SelectItem value="xl">XL</SelectItem>
                      </SelectContent>
                    </Select>
                    
                    <Select
                      value={selectedSection.style?.paddingX || 'normal'}
                      onValueChange={(value) => handleStyleChange('paddingX', value)}
                    >
                      <SelectTrigger className="text-sm">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">None</SelectItem>
                        <SelectItem value="normal">Normal</SelectItem>
                        <SelectItem value="large">Large</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </div>

            <Separator />

            {/* Typography */}
            <div>
              <h3 className="text-sm font-semibold text-slate-800 mb-3">Typography</h3>
              <div className="space-y-3">
                <div>
                  <Label className="text-xs font-medium text-slate-600">Heading Font</Label>
                  <Select
                    value={selectedSection.style?.fontFamily || pageSettings.fontFamily}
                    onValueChange={(value) => handleStyleChange('fontFamily', value)}
                  >
                    <SelectTrigger className="text-sm">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {fontOptions.map((font) => (
                        <SelectItem key={font} value={font}>{font}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label className="text-xs font-medium text-slate-600">Text Size</Label>
                  <div className="flex space-x-2 mt-1">
                    {['sm', 'md', 'lg', 'xl'].map((size) => (
                      <Button
                        key={size}
                        variant={selectedSection.style?.textSize === size ? 'default' : 'outline'}
                        size="sm"
                        className="flex-1 text-xs"
                        onClick={() => handleStyleChange('textSize', size)}
                      >
                        {size.toUpperCase()}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <Separator />

            {/* Content Fields */}
            <div>
              <h3 className="text-sm font-semibold text-slate-800 mb-3">Content</h3>
              <div className="space-y-3">
                {selectedSection.type === 'hero' && (
                  <>
                    <div>
                      <Label className="text-xs font-medium text-slate-600">Headline</Label>
                      <Textarea
                        value={selectedSection.content.title || ''}
                        onChange={(e) => handleContentChange('title', e.target.value)}
                        className="text-sm resize-none"
                        rows={2}
                      />
                    </div>
                    <div>
                      <Label className="text-xs font-medium text-slate-600">Description</Label>
                      <Textarea
                        value={selectedSection.content.subtitle || ''}
                        onChange={(e) => handleContentChange('subtitle', e.target.value)}
                        className="text-sm resize-none"
                        rows={3}
                      />
                    </div>
                    <div>
                      <Label className="text-xs font-medium text-slate-600">Button Text</Label>
                      <Input
                        value={selectedSection.content.primaryCTA || ''}
                        onChange={(e) => handleContentChange('primaryCTA', e.target.value)}
                        className="text-sm"
                      />
                    </div>
                  </>
                )}

                {selectedSection.type === 'features' && (
                  <>
                    <div>
                      <Label className="text-xs font-medium text-slate-600">Section Title</Label>
                      <Input
                        value={selectedSection.content.title || ''}
                        onChange={(e) => handleContentChange('title', e.target.value)}
                        className="text-sm"
                      />
                    </div>
                    <div>
                      <Label className="text-xs font-medium text-slate-600">Description</Label>
                      <Textarea
                        value={selectedSection.content.description || ''}
                        onChange={(e) => handleContentChange('description', e.target.value)}
                        className="text-sm resize-none"
                        rows={2}
                      />
                    </div>
                  </>
                )}

                {/* Add similar content fields for other section types */}
              </div>
            </div>

            <Separator />

            {/* Actions */}
            <div>
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 text-xs"
                  onClick={() => duplicateSection(selectedSection.id)}
                >
                  <Copy className="w-3 h-3 mr-1" />
                  Duplicate
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  className="flex-1 text-xs"
                  onClick={() => deleteSection(selectedSection.id)}
                >
                  <Trash2 className="w-3 h-3 mr-1" />
                  Delete
                </Button>
              </div>
            </div>
          </>
        ) : (
          /* Global Settings when no section is selected */
          <div>
            <h3 className="text-sm font-semibold text-slate-800 mb-3">Page Settings</h3>
            <div className="space-y-3">
              <div>
                <Label className="text-xs font-medium text-slate-600">Primary Color</Label>
                <div className="flex space-x-2 mt-1">
                  {colorOptions.map((color) => (
                    <button
                      key={color.value}
                      className={`w-8 h-8 rounded border-2 ${color.class} ${
                        pageSettings.primaryColor === color.value
                          ? 'border-slate-800'
                          : 'border-slate-300'
                      }`}
                      onClick={() => updatePageSettings({ primaryColor: color.value })}
                    />
                  ))}
                </div>
              </div>
              
              <div>
                <Label className="text-xs font-medium text-slate-600">Font Family</Label>
                <Select
                  value={pageSettings.fontFamily}
                  onValueChange={(value) => updatePageSettings({ fontFamily: value })}
                >
                  <SelectTrigger className="text-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {fontOptions.map((font) => (
                      <SelectItem key={font} value={font}>{font}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}
