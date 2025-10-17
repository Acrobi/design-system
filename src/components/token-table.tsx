'use client';

import React from 'react';
import { cn } from '../lib/utils';

interface TokenTableProps {
  tokens: Array<{
    id: string;
    name: string;
    value: string;
    description?: string;
    tier?: string;
    pixelValue?: number;
  }>;
  className?: string;
}

export function TokenTable({ tokens, className }: TokenTableProps) {
  return (
    <div className={cn('overflow-x-auto', className)}>
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="text-left py-3 px-4 font-semibold text-sm text-gray-900">Token</th>
            <th className="text-left py-3 px-4 font-semibold text-sm text-gray-900">Value</th>
            <th className="text-left py-3 px-4 font-semibold text-sm text-gray-900">Description</th>
            <th className="text-left py-3 px-4 font-semibold text-sm text-gray-900">Tier</th>
          </tr>
        </thead>
        <tbody>
          {tokens.map((token) => (
            <tr key={token.id} className="border-b border-gray-100 hover:bg-gray-50">
              <td className="py-3 px-4">
                <code className="text-sm font-mono bg-gray-100 px-2 py-1 rounded">
                  {token.name}
                </code>
              </td>
              <td className="py-3 px-4">
                <div className="flex items-center gap-2">
                  <code className="text-sm font-mono text-gray-600">
                    {token.value}
                  </code>
                  {token.pixelValue && (
                    <span className="text-xs text-gray-500">
                      ({token.pixelValue}px)
                    </span>
                  )}
                </div>
              </td>
              <td className="py-3 px-4 text-sm text-gray-600">
                {token.description}
              </td>
              <td className="py-3 px-4">
                <span className={cn(
                  'inline-flex items-center px-2 py-1 rounded-full text-xs font-medium',
                  token.tier === 'primitive' && 'bg-blue-100 text-blue-800',
                  token.tier === 'semantic' && 'bg-green-100 text-green-800',
                  token.tier === 'component' && 'bg-purple-100 text-purple-800'
                )}>
                  {token.tier}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}