'use client';

import React from 'react';
import { cn } from '../lib/utils';

interface TokenPreviewProps {
  children: React.ReactNode;
  className?: string;
  label?: string;
  description?: string;
}

export function TokenPreview({ children, className, label, description }: TokenPreviewProps) {
  return (
    <div className={cn('space-y-2', className)}>
      {label && (
        <div className="text-sm font-medium text-gray-700">{label}</div>
      )}
      <div className="p-4 border border-gray-200 rounded-lg bg-white">
        {children}
      </div>
      {description && (
        <div className="text-xs text-gray-500">{description}</div>
      )}
    </div>
  );
}

interface TokenPreviewGridProps {
  children: React.ReactNode;
  className?: string;
}

export function TokenPreviewGrid({ children, className }: TokenPreviewGridProps) {
  return (
    <div className={cn('grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4', className)}>
      {children}
    </div>
  );
}

interface TokenValueDisplayProps {
  value: string | number;
  className?: string;
}

export function TokenValueDisplay({ value, className }: TokenValueDisplayProps) {
  return (
    <code className={cn('px-2 py-1 bg-gray-100 rounded text-xs font-mono', className)}>
      {value}
    </code>
  );
}