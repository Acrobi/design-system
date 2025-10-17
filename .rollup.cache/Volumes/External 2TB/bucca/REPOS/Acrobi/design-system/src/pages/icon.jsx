import React, { useState } from 'react';
import { Icon } from '../components/ui/icon';
import { iconMetaphors } from '../lib/icon-metaphors';
export default function IconTestPage() {
    const [selectedIcon, setSelectedIcon] = useState(null);
    const [iconSize, setIconSize] = useState('4');
    const [searchTerm, setSearchTerm] = useState('');
    const filteredIcons = iconMetaphors.filter(icon => icon.toLowerCase().includes(searchTerm.toLowerCase()));
    return (<div className="container mx-auto p-8 space-y-8">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold">Icon Component Tests</h1>
        <p className="text-muted-foreground">Comprehensive testing of all icon metaphors and configurations</p>
      </div>

      {/* Icon Size Testing */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Icon Sizes</h2>
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2">
            <Icon metaphor="home" className="h-3 w-3"/>
            <span className="text-sm">3 (12px)</span>
          </div>
          <div className="flex items-center gap-2">
            <Icon metaphor="home" className="h-4 w-4"/>
            <span className="text-sm">4 (16px)</span>
          </div>
          <div className="flex items-center gap-2">
            <Icon metaphor="home" className="h-5 w-5"/>
            <span className="text-sm">5 (20px)</span>
          </div>
          <div className="flex items-center gap-2">
            <Icon metaphor="home" className="h-6 w-6"/>
            <span className="text-sm">6 (24px)</span>
          </div>
          <div className="flex items-center gap-2">
            <Icon metaphor="home" className="h-8 w-8"/>
            <span className="text-sm">8 (32px)</span>
          </div>
          <div className="flex items-center gap-2">
            <Icon metaphor="home" className="h-10 w-10"/>
            <span className="text-sm">10 (40px)</span>
          </div>
          <div className="flex items-center gap-2">
            <Icon metaphor="home" className="h-12 w-12"/>
            <span className="text-sm">12 (48px)</span>
          </div>
        </div>
      </div>

      {/* Icon Colors */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Icon Colors</h2>
        <div className="flex items-center gap-6">
          <Icon metaphor="star-filled" className="h-6 w-6 text-foreground"/>
          <Icon metaphor="star-filled" className="h-6 w-6 text-primary"/>
          <Icon metaphor="star-filled" className="h-6 w-6 text-secondary"/>
          <Icon metaphor="star-filled" className="h-6 w-6 text-destructive"/>
          <Icon metaphor="star-filled" className="h-6 w-6 text-muted-foreground"/>
          <Icon metaphor="star-filled" className="h-6 w-6 text-accent-foreground"/>
          <Icon metaphor="star-filled" className="h-6 w-6 text-blue-500"/>
          <Icon metaphor="star-filled" className="h-6 w-6 text-green-500"/>
        </div>
      </div>

      {/* Interactive Icon Selector */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Interactive Icon Selector</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Icon Size:</label>
            <select value={iconSize} onChange={(e) => setIconSize(e.target.value)} className="p-2 border rounded-md">
              <option value="3">3 (12px)</option>
              <option value="4">4 (16px)</option>
              <option value="5">5 (20px)</option>
              <option value="6">6 (24px)</option>
              <option value="8">8 (32px)</option>
              <option value="10">10 (40px)</option>
              <option value="12">12 (48px)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Search Icons:</label>
            <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Search for icons..." className="w-full p-2 border rounded-md"/>
          </div>

          <div className="p-8 border-2 border-dashed border-muted-foreground/25 rounded-lg">
            {selectedIcon ? (<div className="flex flex-col items-center space-y-2">
                <Icon metaphor={selectedIcon} className={`h-${iconSize} w-${iconSize}`}/>
                <p className="text-sm font-mono">{selectedIcon}</p>
              </div>) : (<p className="text-center text-muted-foreground">
                Click an icon below to see it displayed here
              </p>)}
          </div>
        </div>
      </div>

      {/* Icon Grid */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">All Available Icons ({filteredIcons.length})</h2>
        <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-12 gap-4 p-6 border rounded-lg">
          {filteredIcons.map((metaphor) => (<button key={metaphor} onClick={() => setSelectedIcon(metaphor)} className={`flex flex-col items-center justify-center p-3 rounded-md border transition-colors hover:bg-accent hover:text-accent-foreground ${selectedIcon === metaphor ? 'bg-primary text-primary-foreground' : 'bg-background'}`} title={metaphor}>
              <Icon metaphor={metaphor} className={`h-6 w-6 mb-1`}/>
              <span className="text-xs text-center break-all">{metaphor}</span>
            </button>))}
        </div>
      </div>

      {/* Common Icon Groups */}
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold">Common Icon Groups</h2>

        {/* Navigation Icons */}
        <div className="space-y-2">
          <h3 className="text-lg font-medium">Navigation</h3>
          <div className="flex gap-4">
            {['chevron-left', 'chevron-right', 'chevron-up', 'chevron-down', 'arrow-left', 'arrow-right', 'home', 'menu'].map(metaphor => (<div key={metaphor} className="flex items-center gap-2 p-2 border rounded">
                <Icon metaphor={metaphor} className="h-4 w-4"/>
                <span className="text-sm">{metaphor}</span>
              </div>))}
          </div>
        </div>

        {/* Action Icons */}
        <div className="space-y-2">
          <h3 className="text-lg font-medium">Actions</h3>
          <div className="flex flex-wrap gap-4">
            {['add', 'remove', 'delete', 'edit', 'save', 'close', 'copy', 'send'].map(metaphor => (<div key={metaphor} className="flex items-center gap-2 p-2 border rounded">
                <Icon metaphor={metaphor} className="h-4 w-4"/>
                <span className="text-sm">{metaphor}</span>
              </div>))}
          </div>
        </div>

        {/* Status Icons */}
        <div className="space-y-2">
          <h3 className="text-lg font-medium">Status</h3>
          <div className="flex flex-wrap gap-4">
            {['success', 'warning', 'error', 'info', 'help'].map(metaphor => (<div key={metaphor} className="flex items-center gap-2 p-2 border rounded">
                <Icon metaphor={metaphor} className="h-4 w-4"/>
                <span className="text-sm">{metaphor}</span>
              </div>))}
          </div>
        </div>

        {/* UI Icons */}
        <div className="space-y-2">
          <h3 className="text-lg font-medium">UI Elements</h3>
          <div className="flex flex-wrap gap-4">
            {['user', 'users', 'settings', 'bell', 'search', 'upload', 'download', 'folder'].map(metaphor => (<div key={metaphor} className="flex items-center gap-2 p-2 border rounded">
                <Icon metaphor={metaphor} className="h-4 w-4"/>
                <span className="text-sm">{metaphor}</span>
              </div>))}
          </div>
        </div>
      </div>

      {/* Accessibility Testing */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Accessibility Testing</h2>
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Icons should have appropriate labels and descriptions
          </p>
          <div className="flex gap-4">
            <Icon metaphor="settings" aria-label="Settings" className="h-6 w-6"/>
            <Icon metaphor="info" aria-describedby="info-help" className="h-6 w-6"/>
            <Icon metaphor="external-link" aria-label="External link" className="h-6 w-6"/>
          </div>
          <p id="info-help" className="text-sm text-muted-foreground">
            Information icon provides additional help
          </p>
        </div>
      </div>

      {/* Invalid Icon Handling */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Invalid Icon Handling</h2>
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">
            Invalid icon metaphors should fall back to placeholder icon
          </p>
          <div className="flex items-center gap-4">
            <Icon metaphor="placeholder" className="h-6 w-6"/>
            <span className="text-sm">Fallback placeholder for invalid metaphors</span>
          </div>
        </div>
      </div>
    </div>);
}
//# sourceMappingURL=icon.jsx.map