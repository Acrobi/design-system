import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../components/ui/card';
import { Button } from '../../../components/Button';
import { SensoryProvider } from '../../../components/ui/sensory-provider';
import { Icon } from '../../../components/ui/icons';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../components/ui/tabs';
import { TokenTable } from '../../../components/token-table';
import { TokenPreview, TokenPreviewGrid, TokenValueDisplay } from '../../../components/token-preview';
import { TokenModal, TokenActions } from '../../../components/token-modal';
import { useTokenStore, Token } from '../../../lib/store';
import { Plus, Eye, EyeOff, Contrast, Layers } from 'lucide-react';

export default function OpacityPage() {
  const { opacityTokens, addToken, updateToken, deleteToken } = useTokenStore();
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
      updateToken('opacity', editingToken.id, tokenData);
    } else {
      addToken('opacity', tokenData);
    }
  };

  const handleDeleteToken = (tokenId: string) => {
    deleteToken('opacity', tokenId);
  };

  const getTokensByType = (type: string) => {
    return opacityTokens.filter(token =>
      token.name.toLowerCase().includes(type.toLowerCase())
    );
  };

  const getTokensByTier = (tier: string) => {
    return opacityTokens.filter(token => token.tier === tier);
  };

  // Enhanced table with actions
  const EnhancedTokenTable = ({ tokens, title }: { tokens: Token[], title: string }) => (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Eye className="w-5 h-5" />
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
                      <div className="flex items-center gap-2">
                        <div
                          className="bg-gray-800 w-8 h-8 rounded"
                          style={{ opacity: parseFloat(token.value) || 1 }}
                        />
                        <div className="text-xs text-gray-500">
                          {Math.round((parseFloat(token.value) || 0) * 100)}%
                        </div>
                      </div>
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

  // Opacity preview grid
  const OpacityPreviewGrid = ({ tokens }: { tokens: Token[] }) => (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {tokens.map((token) => (
        <TokenPreview key={token.id} label={token.name} description={token.description}>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2">
              <div
                className="bg-blue-500 w-10 h-10 rounded"
                style={{ opacity: parseFloat(token.value) || 1 }}
              />
              <div className="text-xs">
                <TokenValueDisplay value={token.value} />
                <div className="text-gray-500">
                  {Math.round((parseFloat(token.value) || 0) * 100)}%
                </div>
              </div>
            </div>
          </div>
        </TokenPreview>
      ))}
    </div>
  );

  // Component showcase
  const ComponentShowcase = () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <TokenPreview label="Disabled button">
        <div className="flex gap-2">
          <button
            className="px-4 py-2 bg-gray-300 text-gray-600 text-sm cursor-not-allowed"
            disabled
            style={{ opacity: 'var(--opacity-disabled)' }}
          >
            Disabled
          </button>
        </div>
      </TokenPreview>

      <TokenPreview label="Hover overlay">
        <div className="relative">
          <div className="bg-gray-200 p-4 rounded">
            Hover over me
          </div>
          <div
            className="absolute inset-0 bg-blue-500 rounded flex items-center justify-center text-white"
            style={{ opacity: 'var(--opacity-hover)' }}
          >
            Hover state
          </div>
        </div>
      </TokenPreview>

      <TokenPreview label="Loading overlay">
        <div className="relative">
          <div className="bg-gray-100 p-4 rounded">
            Content behind
          </div>
          <div
            className="absolute inset-0 bg-gray-900 rounded flex items-center justify-center text-white"
            style={{ opacity: 'var(--opacity-overlay)' }}
          >
            Loading...
          </div>
        </div>
      </TokenPreview>
    </div>
  );

  return (
    <SensoryProvider>
      <div className="container mx-auto p-6 max-w-7xl">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-gray-100 rounded-lg">
              <Eye className="w-6 h-6 text-gray-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">Opacity Tokens</h1>
          </div>
          <p className="text-gray-600">
            Comprehensive opacity system for transparency, overlays, and visual hierarchy.
          </p>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="primitives">Primitives</TabsTrigger>
            <TabsTrigger value="semantic">Semantic</TabsTrigger>
            <TabsTrigger value="all">All Opacity</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Layers className="w-5 h-5" />
                    Token Overview
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Total Tokens</span>
                      <span className="text-sm text-gray-600">{opacityTokens.length}</span>
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
                    Add Opacity Token
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Opacity Scale Preview</CardTitle>
                </CardHeader>
                <CardContent>
                  <TokenPreview label="Visual Scale">
                    <div className="space-y-3">
                      {getTokensByTier('primitive').slice(0, 6).map((token) => (
                        <div key={token.id} className="flex items-center gap-3">
                          <div className="text-xs font-mono w-16">
                            {token.name}
                          </div>
                          <div className="flex items-center gap-2">
                            <div
                              className="bg-gray-800 w-12 h-4 rounded"
                              style={{ opacity: parseFloat(token.value) || 1 }}
                            />
                            <span className="text-xs text-gray-500">
                              {Math.round((parseFloat(token.value) || 0) * 100)}%
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </TokenPreview>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Usage Examples</CardTitle>
                </CardHeader>
                <CardContent>
                  <TokenPreview label="Applied Opacity">
                    <div className="space-y-3">
                      <div className="border border-gray-200 p-2">
                        <div className="bg-gray-100" style={{ opacity: 'var(--opacity-disabled)' }}>
                          <div className="text-xs">Disabled content</div>
                        </div>
                      </div>
                      <div className="border border-gray-200 p-2">
                        <div className="bg-gray-100" style={{ opacity: 'var(--opacity-hover)' }}>
                          <div className="text-xs">Hover state</div>
                        </div>
                      </div>
                      <div className="border border-gray-200 p-2">
                        <div className="bg-gray-100" style={{ opacity: 'var(--opacity-overlay)' }}>
                          <div className="text-xs">Overlay content</div>
                        </div>
                      </div>
                    </div>
                  </TokenPreview>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Opacity Grid</CardTitle>
                <CardDescription>
                  Visual overview of all opacity tokens
                </CardDescription>
              </CardHeader>
              <CardContent>
                <OpacityPreviewGrid tokens={opacityTokens} />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Component Showcase</CardTitle>
                <CardDescription>
                  Real-world examples of opacity tokens in use
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ComponentShowcase />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="primitives">
            <EnhancedTokenTable
              tokens={getTokensByTier('primitive')}
              title="Primitive Opacity Tokens"
            />
          </TabsContent>

          <TabsContent value="semantic">
            <EnhancedTokenTable
              tokens={getTokensByTier('semantic')}
              title="Semantic Opacity Tokens"
            />
          </TabsContent>

          <TabsContent value="all">
            <EnhancedTokenTable
              tokens={opacityTokens}
              title="All Opacity Tokens"
            />
          </TabsContent>
        </Tabs>

        <TokenModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          token={editingToken}
          onSubmit={handleSubmitToken}
          category="opacity"
          title={editingToken ? 'Edit Opacity Token' : 'Add Opacity Token'}
        />
      </div>
    </SensoryProvider>
  );
}