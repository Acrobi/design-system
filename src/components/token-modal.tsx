'use client';

import React, { useState, useEffect } from 'react';
import { X, Plus, Edit2 } from 'lucide-react';

interface Token {
  id: string;
  name: string;
  value: string;
  description?: string;
  tier: 'primitive' | 'semantic' | 'component';
  category?: string;
  pixelValue?: number;
}

interface TokenModalProps {
  isOpen: boolean;
  onClose: () => void;
  token?: Token | null;
  onSubmit: (token: Omit<Token, 'id'>) => void;
  category: string;
  title: string;
}

export function TokenModal({ isOpen, onClose, token, onSubmit, category, title }: TokenModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    value: '',
    description: '',
    tier: 'primitive' as 'primitive' | 'semantic' | 'component'
  });

  useEffect(() => {
    if (token) {
      setFormData({
        name: token.name,
        value: token.value,
        description: token.description || '',
        tier: token.tier
      });
    } else {
      setFormData({
        name: '',
        value: '',
        description: '',
        tier: 'primitive'
      });
    }
  }, [token, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.value.trim()) {
      return;
    }

    onSubmit({
      name: formData.name.startsWith('--') ? formData.name : `--${formData.name}`,
      value: formData.value,
      description: formData.description,
      tier: formData.tier,
      category
    });

    onClose();
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-white rounded-lg p-6 w-full max-w-lg mx-4 shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            {token ? <Edit2 className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
            {title}
          </h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">
                Token Name
              </label>
              <input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="spacing-md"
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="tier" className="text-sm font-medium">
                Tier
              </label>
              <select
                id="tier"
                value={formData.tier}
                onChange={(e) => handleInputChange('tier', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="primitive">Primitive</option>
                <option value="semantic">Semantic</option>
                <option value="component">Component</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="value" className="text-sm font-medium">
              Value
            </label>
            <input
              id="value"
              type="text"
              value={formData.value}
              onChange={(e) => handleInputChange('value', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="16px or #1a1a1a"
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="description" className="text-sm font-medium">
              Description
            </label>
            <textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[80px]"
              placeholder="Medium spacing for layout components"
            />
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              {token ? 'Update' : 'Create'} Token
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

interface TokenActionsProps {
  token: Token;
  onEdit: (token: Token) => void;
  onDelete: (tokenId: string) => void;
}

export function TokenActions({ token, onEdit, onDelete }: TokenActionsProps) {
  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => onEdit(token)}
        className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-8 w-8 p-0"
        title="Edit token"
      >
        <Edit2 className="h-3 w-3" />
      </button>
      <button
        onClick={() => {
          if (window.confirm(`Are you sure you want to delete the token "${token.name}"?`)) {
            onDelete(token.id);
          }
        }}
        className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-destructive hover:text-destructive-foreground h-8 w-8 p-0"
        title="Delete token"
      >
        <X className="h-3 w-3" />
      </button>
    </div>
  );
}