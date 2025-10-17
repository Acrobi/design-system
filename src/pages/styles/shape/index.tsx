'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../components/ui/tabs';
import { Badge } from '../../../components/ui/badge';
import { Button } from '../../../components/Button';
import { TokenTable } from '../../../components/token-table';
import { TokenPreview, TokenPreviewGrid, TokenValueDisplay } from '../../../components/token-preview';
import { TokenModal, TokenActions } from '../../../components/token-modal';
import { useTokenStore, Token } from '../../../lib/store';
import {
  Square,
  Circle,
  Triangle,
  SquareDot,
  Minus,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Package,
  Plus
} from 'lucide-react';

export default function ShapePage() {
  const { shapeTokens, addToken, updateToken, deleteToken } = useTokenStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingToken, setEditingToken] = useState<Token | null>(null);

  const handleAddToken = () => {
    setEditingToken(null);
    setIsModalOpen(true);
  };

  const handleEditToken = (token: Token) => {
    setEditingToken(token);
    setIsModalOpen(true);
  };

  const handleSubmitToken = (tokenData: Omit<Token, 'id'>) => {
    if (editingToken) {
      updateToken('shape', editingToken.id, tokenData);
    } else {
      addToken('shape', tokenData);
    }
  };

  const handleDeleteToken = (tokenId: string) => {
    deleteToken('shape', tokenId);
  };

  const getTokensByType = (type: string) => {
    return shapeTokens.filter(token =>
      token.name.toLowerCase().includes(type.toLowerCase())
    );
  };

  const getTokensByTier = (tier: string) => {
    return shapeTokens.filter(token => token.tier === tier);
  };

  // Enhanced table with actions
  const EnhancedTokenTable = ({ tokens, title }: { tokens: Token[], title: string }) => (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Square className="w-5 h-5" />
              {title}
            </CardTitle>
            <CardDescription>
              {tokens.length} {title.toLowerCase()} tokens
            </CardDescription>
          </div>
          <Button onClick={handleAddToken} className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Add Token
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-sm text-gray-900">Token</th>
                <th className="text-left py-3 px-4 font-semibold text-sm text-gray-900">Value</th>
                <th className="text-left py-3 px-4 font-semibold text-sm text-gray-900">Preview</th>
                <th className="text-left py-3 px-4 font-semibold text-sm text-gray-900">Description</th>
                <th className="text-left py-3 px-4 font-semibold text-sm text-gray-900">Tier</th>
                <th className="text-left py-3 px-4 font-semibold text-sm text-gray-900">Actions</th>
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
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      {token.name.includes('radius') ? (
                        <div
                          className="bg-blue-200 border border-blue-300"
                          style={{
                            width: '30px',
                            height: '30px',
                            borderRadius: token.pixelValue ? `${token.pixelValue}px` : '4px'
                          }}
                        />
                      ) : token.name.includes('border') ? (
                        <div
                          className="bg-gray-200"
                          style={{
                            width: '30px',
                            height: '30px',
                            borderWidth: token.pixelValue ? `${Math.min(token.pixelValue, 4)}px` : '1px',
                            borderStyle: 'solid',
                            borderColor: '#374151'
                          }}
                        />
                      ) : (
                        <div className="w-8 h-8 bg-gray-300" />
                      )}
                    </div>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-600">
                    {token.description}
                  </td>
                  <td className="py-3 px-4">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium
                      ${token.tier === 'primitive' ? 'bg-blue-100 text-blue-800' : ''}
                      ${token.tier === 'semantic' ? 'bg-green-100 text-green-800' : ''}
                      ${token.tier === 'component' ? 'bg-purple-100 text-purple-800' : ''}
                    `}>
                      {token.tier}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <TokenActions
                      token={token}
                      onEdit={handleEditToken}
                      onDelete={handleDeleteToken}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );

  // Shape preview grid
  const ShapePreviewGrid = ({ tokens }: { tokens: Token[] }) => (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {tokens.map((token) => (
        <TokenPreview key={token.id} label={token.name} description={token.description}>
          <div className="flex items-center gap-2">
            {token.name.includes('radius') ? (
              <div
                className="bg-blue-200 border border-blue-300"
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: token.pixelValue ? `${Math.min(token.pixelValue, 20)}px` : '4px'
                }}
              />
            ) : token.name.includes('border') ? (
              <div
                className="bg-gray-200"
                style={{
                  width: '40px',
                  height: '40px',
                  borderWidth: token.pixelValue ? `${Math.min(token.pixelValue, 4)}px` : '1px',
                  borderStyle: 'solid',
                  borderColor: '#374151'
                }}
              />
            ) : (
              <div className="w-10 h-10 bg-gray-300" />
            )}
            <div className="text-xs">
              <TokenValueDisplay value={token.value} />
              {token.pixelValue && (
                <div className="text-gray-500">{token.pixelValue}px</div>
              )}
            </div>
          </div>
        </TokenPreview>
      ))}
    </div>
  );

  // Component showcase
  const ComponentShowcase = () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <TokenPreview label="Buttons with different radius">
        <div className="flex gap-2">
          <button
            className="px-4 py-2 bg-blue-600 text-white text-sm"
            style={{ borderRadius: 'var(--radius-none)' }}
          >
            None
          </button>
          <button
            className="px-4 py-2 bg-blue-600 text-white text-sm"
            style={{ borderRadius: 'var(--radius-sm)' }}
          >
            Small
          </button>
          <button
            className="px-4 py-2 bg-blue-600 text-white text-sm"
            style={{ borderRadius: 'var(--radius-md)' }}
          >
            Medium
          </button>
        </div>
      </TokenPreview>

      <TokenPreview label="Cards with different borders">
        <div className="flex gap-2">
          <div
            className="p-4 bg-gray-50"
            style={{ borderWidth: 'var(--border-width-sm)', borderColor: 'var(--color-gray-300)' }}
          >
            Thin
          </div>
          <div
            className="p-4 bg-gray-50"
            style={{ borderWidth: 'var(--border-width-md)', borderColor: 'var(--color-gray-300)' }}
          >
            Medium
          </div>
        </div>
      </TokenPreview>

      <TokenPreview label="Input fields with shapes">
        <div className="space-y-2">
          <input
            type="text"
            placeholder="Rounded input"
            className="w-full px-3 py-2 border border-gray-300"
            style={{ borderRadius: 'var(--radius-md)' }}
          />
          <input
            type="text"
            placeholder="Square input"
            className="w-full px-3 py-2 border border-gray-300"
            style={{ borderRadius: 'var(--radius-none)' }}
          />
        </div>
      </TokenPreview>
    </div>
  );

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-orange-100 rounded-lg">
            <Square className="w-6 h-6 text-orange-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Shape Tokens</h1>
        </div>
        <p className="text-gray-600">
          Comprehensive shape system with border radius, border width, and visual styling tokens.
        </p>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="border-radius">Border Radius</TabsTrigger>
          <TabsTrigger value="border-width">Border Width</TabsTrigger>
          <TabsTrigger value="components">Components</TabsTrigger>
          <TabsTrigger value="all">All Shapes</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="w-5 h-5" />
                  Token Overview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Total Tokens</span>
                    <span className="text-sm text-gray-600">{shapeTokens.length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Primitive</span>
                    <span className="text-sm text-gray-600">{getTokensByTier('primitive').length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Semantic</span>
                    <span className="text-sm text-gray-600">{getTokensByTier('semantic').length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Component</span>
                    <span className="text-sm text-gray-600">{getTokensByTier('component').length}</span>
                  </div>
                </div>
                <Button onClick={handleAddToken} className="w-full mt-4">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Shape Token
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Shape Categories</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Border Radius</span>
                    <Badge variant="secondary">{getTokensByType('radius').length}</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Border Width</span>
                    <Badge variant="secondary">{getTokensByType('border').length}</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Other Shapes</span>
                    <Badge variant="secondary">
                      {shapeTokens.length - getTokensByType('radius').length - getTokensByType('border').length}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quick Preview</CardTitle>
              </CardHeader>
              <CardContent>
                <TokenPreview label="Shape Examples">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Square className="w-4 h-4" />
                      <span className="text-xs">Square corners</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Circle className="w-4 h-4" />
                      <span className="text-xs">Rounded corners</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Minus className="w-4 h-4" />
                      <span className="text-xs">Border styles</span>
                    </div>
                  </div>
                </TokenPreview>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Shape Grid</CardTitle>
              <CardDescription>
                Visual overview of all shape tokens
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ShapePreviewGrid tokens={shapeTokens} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Component Showcase</CardTitle>
              <CardDescription>
                Real-world examples of shape tokens in use
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ComponentShowcase />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="border-radius">
          <EnhancedTokenTable
            tokens={getTokensByType('radius')}
            title="Border Radius Tokens"
          />
        </TabsContent>

        <TabsContent value="border-width">
          <EnhancedTokenTable
            tokens={getTokensByType('border')}
            title="Border Width Tokens"
          />
        </TabsContent>

        <TabsContent value="components">
          <EnhancedTokenTable
            tokens={getTokensByTier('component')}
            title="Component Shape Tokens"
          />
        </TabsContent>

        <TabsContent value="all">
          <EnhancedTokenTable
            tokens={shapeTokens}
            title="All Shape Tokens"
          />
        </TabsContent>
      </Tabs>

      <TokenModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        token={editingToken}
        onSubmit={handleSubmitToken}
        category="shape"
        title={editingToken ? 'Edit Shape Token' : 'Add Shape Token'}
      />
    </div>
  );
}