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
import { Plus, Layers, Mountain, Box, ArrowUp } from 'lucide-react';

export default function ElevationPage() {
  const { elevationTokens, addToken, updateToken, deleteToken } = useTokenStore();
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
      updateToken('elevation', editingToken.id, tokenData);
    } else {
      addToken('elevation', tokenData);
    }
  };

  const handleDeleteToken = (tokenId: string) => {
    deleteToken('elevation', tokenId);
  };

  const getTokensByType = (type: string) => {
    return elevationTokens.filter(token =>
      token.name.toLowerCase().includes(type.toLowerCase())
    );
  };

  const getTokensByTier = (tier: string) => {
    return elevationTokens.filter(token => token.tier === tier);
  };

  // Enhanced table with actions
  const EnhancedTokenTable = ({ tokens, title }: { tokens: Token[], title: string }) => (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Layers className="w-5 h-5" />
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
                      {token.name.includes('shadow') ? (
                        <div
                          className="bg-white border border-gray-300 rounded"
                          style={{
                            width: '30px',
                            height: '30px',
                            boxShadow: token.name.startsWith('--shadow-')
                              ? `var(${token.name})`
                              : token.value
                          }}
                        />
                      ) : token.name.includes('z-index') ? (
                        <div className="flex items-center gap-1 text-xs text-gray-500">
                          <ArrowUp className="w-3 h-3" />
                          {token.value}
                        </div>
                      ) : (
                        <div className="w-8 h-8 bg-gray-300 rounded" />
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

  // Elevation preview grid
  const ElevationPreviewGrid = ({ tokens }: { tokens: Token[] }) => (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {tokens.map((token) => (
        <TokenPreview key={token.id} label={token.name} description={token.description}>
          <div className="flex items-center gap-2">
            {token.name.includes('shadow') ? (
              <div
                className="bg-white border border-gray-300 rounded"
                style={{
                  width: '40px',
                  height: '40px',
                  boxShadow: token.name.startsWith('--shadow-')
                    ? `var(${token.name})`
                    : token.value
                }}
              />
            ) : token.name.includes('z-index') ? (
              <div className="flex items-center gap-1 text-xs">
                <ArrowUp className="w-3 h-3" />
                <TokenValueDisplay value={token.value} />
              </div>
            ) : (
              <div className="w-10 h-10 bg-gray-300 rounded" />
            )}
          </div>
        </TokenPreview>
      ))}
    </div>
  );

  // Component showcase
  const ComponentShowcase = () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <TokenPreview label="Card with shadow">
        <div
          className="p-4 bg-white rounded-lg border border-gray-200"
          style={{ boxShadow: 'var(--shadow-card)' }}
        >
          Card content
        </div>
      </TokenPreview>

      <TokenPreview label="Modal with elevation">
        <div
          className="p-4 bg-white rounded-lg border border-gray-200"
          style={{ boxShadow: 'var(--shadow-modal)' }}
        >
          Modal content
        </div>
      </TokenPreview>

      <TokenPreview label="Button with hover shadow">
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded-md"
          style={{ boxShadow: 'var(--shadow-button)' }}
        >
          Hover me
        </button>
      </TokenPreview>
    </div>
  );

  return (
    <SensoryProvider>
      <div className="container mx-auto p-6 max-w-7xl">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-orange-100 rounded-lg">
              <Mountain className="w-6 h-6 text-orange-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">Elevation Tokens</h1>
          </div>
          <p className="text-gray-600">
            Comprehensive elevation system with shadows, z-index values, and depth management.
          </p>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="shadows">Shadows</TabsTrigger>
            <TabsTrigger value="z-index">Z-Index</TabsTrigger>
            <TabsTrigger value="components">Components</TabsTrigger>
            <TabsTrigger value="all">All Elevation</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Box className="w-5 h-5" />
                    Token Overview
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Total Tokens</span>
                      <span className="text-sm text-gray-600">{elevationTokens.length}</span>
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
                    Add Elevation Token
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Elevation Categories</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Shadow Tokens</span>
                      <span className="text-xs bg-gray-100 px-2 py-1 rounded">{getTokensByType('shadow').length}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Z-Index Tokens</span>
                      <span className="text-xs bg-gray-100 px-2 py-1 rounded">{getTokensByType('z-index').length}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Other Elevation</span>
                      <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                        {elevationTokens.length - getTokensByType('shadow').length - getTokensByType('z-index').length}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Depth Preview</CardTitle>
                </CardHeader>
                <CardContent>
                  <TokenPreview label="Elevation Examples">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-gray-200 border border-gray-300" />
                        <span className="text-xs">Flat surface</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div
                          className="w-4 h-4 bg-gray-200 rounded"
                          style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}
                        />
                        <span className="text-xs">Subtle elevation</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div
                          className="w-4 h-4 bg-gray-200 rounded"
                          style={{ boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}
                        />
                        <span className="text-xs">Medium elevation</span>
                      </div>
                    </div>
                  </TokenPreview>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Elevation Grid</CardTitle>
                <CardDescription>
                  Visual overview of all elevation tokens
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ElevationPreviewGrid tokens={elevationTokens} />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Component Showcase</CardTitle>
                <CardDescription>
                  Real-world examples of elevation tokens in use
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ComponentShowcase />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="shadows">
            <EnhancedTokenTable
              tokens={getTokensByType('shadow')}
              title="Shadow Tokens"
            />
          </TabsContent>

          <TabsContent value="z-index">
            <EnhancedTokenTable
              tokens={getTokensByType('z-index')}
              title="Z-Index Tokens"
            />
          </TabsContent>

          <TabsContent value="components">
            <EnhancedTokenTable
              tokens={getTokensByTier('component')}
              title="Component Elevation Tokens"
            />
          </TabsContent>

          <TabsContent value="all">
            <EnhancedTokenTable
              tokens={elevationTokens}
              title="All Elevation Tokens"
            />
          </TabsContent>
        </Tabs>

        <TokenModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          token={editingToken}
          onSubmit={handleSubmitToken}
          category="elevation"
          title={editingToken ? 'Edit Elevation Token' : 'Add Elevation Token'}
        />
      </div>
    </SensoryProvider>
  );
}