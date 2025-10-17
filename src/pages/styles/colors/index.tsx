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
import { Plus, Palette, Layers, Droplet } from 'lucide-react';

export default function ColorsPage() {
  const { colorTokens, addToken, updateToken, deleteToken } = useTokenStore();
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
      updateToken('color', editingToken.id, tokenData);
    } else {
      addToken('color', tokenData);
    }
  };

  const handleDeleteToken = (tokenId: string) => {
    deleteToken('color', tokenId);
  };

  const getTokensByType = (type: string) => {
    return colorTokens.filter(token =>
      token.name.toLowerCase().includes(type.toLowerCase())
    );
  };

  const getTokensByTier = (tier: string) => {
    return colorTokens.filter(token => token.tier === tier);
  };

  // Enhanced table with actions
  const EnhancedTokenTable = ({ tokens, title }: { tokens: Token[], title: string }) => (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Palette className="w-5 h-5" />
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
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-6 h-6 rounded border border-gray-300"
                        style={{ backgroundColor: token.value }}
                      />
                      <span className="text-xs text-gray-500">
                        {token.value}
                      </span>
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

  // Color preview grid
  const ColorPreviewGrid = ({ tokens }: { tokens: Token[] }) => (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
      {tokens.map((token) => (
        <TokenPreview key={token.id} label={token.name} description={token.description}>
          <div className="text-center">
            <div
              className="w-full h-16 rounded-lg border border-gray-300 mb-2"
              style={{ backgroundColor: token.value }}
            />
            <TokenValueDisplay value={token.value} />
          </div>
        </TokenPreview>
      ))}
    </div>
  );

  return (
    <SensoryProvider>
      <div className="container mx-auto p-6 max-w-7xl">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Palette className="w-6 h-6 text-purple-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">Color Tokens</h1>
          </div>
          <p className="text-gray-600">
            Comprehensive color system with primitive colors, semantic tokens, and component-specific colors.
          </p>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="primitives">Primitives</TabsTrigger>
            <TabsTrigger value="semantic">Semantic</TabsTrigger>
            <TabsTrigger value="component">Component</TabsTrigger>
            <TabsTrigger value="all">All Colors</TabsTrigger>
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
                      <span className="text-sm text-gray-600">{colorTokens.length}</span>
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
                    Add Color Token
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Color Palette Preview</CardTitle>
                </CardHeader>
                <CardContent>
                  <TokenPreview label="Sample Colors">
                    <div className="space-y-4">
                      <div className="flex gap-2">
                        {getTokensByTier('primitive').slice(0, 6).map((token) => (
                          <div
                            key={token.id}
                            className="w-8 h-8 rounded border border-gray-300"
                            style={{ backgroundColor: token.value }}
                            title={token.name}
                          />
                        ))}
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div style={{ color: 'var(--color-text-primary)' }}>
                          Primary text
                        </div>
                        <div style={{ color: 'var(--color-text-secondary)' }}>
                          Secondary text
                        </div>
                        <div style={{ backgroundColor: 'var(--color-primary-500)', color: 'white', padding: '4px' }}>
                          Primary button
                        </div>
                        <div style={{ backgroundColor: 'var(--color-background)', padding: '4px' }}>
                          Background
                        </div>
                      </div>
                    </div>
                  </TokenPreview>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Token Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Primitive Colors</span>
                        <span>{getTokensByTier('primitive').length}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: `${(getTokensByTier('primitive').length / colorTokens.length) * 100}%` }}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Semantic Colors</span>
                        <span>{getTokensByTier('semantic').length}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-green-600 h-2 rounded-full"
                          style={{ width: `${(getTokensByTier('semantic').length / colorTokens.length) * 100}%` }}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Component Colors</span>
                        <span>{getTokensByTier('component').length}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-purple-600 h-2 rounded-full"
                          style={{ width: `${(getTokensByTier('component').length / colorTokens.length) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Color Palette Grid</CardTitle>
                <CardDescription>
                  Visual overview of all available color tokens
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ColorPreviewGrid tokens={colorTokens} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="primitives">
            <EnhancedTokenTable
              tokens={getTokensByTier('primitive')}
              title="Primitive Color Tokens"
            />
          </TabsContent>

          <TabsContent value="semantic">
            <EnhancedTokenTable
              tokens={getTokensByTier('semantic')}
              title="Semantic Color Tokens"
            />
          </TabsContent>

          <TabsContent value="component">
            <EnhancedTokenTable
              tokens={getTokensByTier('component')}
              title="Component Color Tokens"
            />
          </TabsContent>

          <TabsContent value="all">
            <EnhancedTokenTable
              tokens={colorTokens}
              title="All Color Tokens"
            />
          </TabsContent>
        </Tabs>

        <TokenModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          token={editingToken}
          onSubmit={handleSubmitToken}
          category="colors"
          title={editingToken ? 'Edit Color Token' : 'Add Color Token'}
        />
      </div>
    </SensoryProvider>
  );
}