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
import { Plus, Layers, Ruler, Grid3X3 } from 'lucide-react';

export default function SpacingPage() {
  const { spacingTokens, addToken, updateToken, deleteToken } = useTokenStore();
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
      updateToken('spacing', editingToken.id, tokenData);
    } else {
      addToken('spacing', tokenData);
    }
  };

  const handleDeleteToken = (tokenId: string) => {
    deleteToken('spacing', tokenId);
  };

  const getTokensByType = (type: string) => {
    return spacingTokens.filter(token =>
      token.name.toLowerCase().includes(type.toLowerCase())
    );
  };

  const getTokensByTier = (tier: string) => {
    return spacingTokens.filter(token => token.tier === tier);
  };

  // Enhanced table with actions
  const EnhancedTokenTable = ({ tokens, title }: { tokens: Token[], title: string }) => (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Ruler className="w-5 h-5" />
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
                      <div
                        className="bg-gray-200 border border-gray-300"
                        style={{
                          width: token.pixelValue ? `${Math.min(token.pixelValue, 40)}px` : '20px',
                          height: '8px'
                        }}
                      />
                      <span className="text-xs text-gray-500">
                        {token.pixelValue || 'auto'}px
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

  // Spacing preview grid
  const SpacingPreviewGrid = ({ tokens }: { tokens: Token[] }) => (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {tokens.map((token) => (
        <TokenPreview key={token.id} label={token.name} description={token.description}>
          <div className="flex items-center gap-2">
            <div
              className="bg-blue-200 border border-blue-300"
              style={{
                width: token.pixelValue ? `${Math.min(token.pixelValue, 60)}px` : '20px',
                height: '20px'
              }}
            />
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

  return (
    <SensoryProvider>
      <div className="container mx-auto p-6 max-w-7xl">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-green-100 rounded-lg">
              <Ruler className="w-6 h-6 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">Spacing Tokens</h1>
          </div>
          <p className="text-gray-600">
            Comprehensive spacing system with consistent scales and semantic spacing relationships.
          </p>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="primitives">Primitives</TabsTrigger>
            <TabsTrigger value="semantic">Semantic</TabsTrigger>
            <TabsTrigger value="all">All Spacing</TabsTrigger>
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
                      <span className="text-sm text-gray-600">{spacingTokens.length}</span>
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
                    Add Spacing Token
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Spacing Scale Preview</CardTitle>
                </CardHeader>
                <CardContent>
                  <TokenPreview label="Visual Scale">
                    <div className="space-y-3">
                      {getTokensByTier('primitive').slice(0, 6).map((token) => (
                        <div key={token.id} className="flex items-center gap-3">
                          <div className="text-xs font-mono w-16">
                            {token.name}
                          </div>
                          <div
                            className="bg-blue-200 border border-blue-300"
                            style={{
                              width: token.pixelValue ? `${Math.min(token.pixelValue, 80)}px` : '20px',
                              height: '8px'
                            }}
                          />
                          <span className="text-xs text-gray-500">
                            {token.pixelValue}px
                          </span>
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
                  <TokenPreview label="Applied Spacing">
                    <div className="space-y-3">
                      <div className="border border-gray-200 p-2">
                        <div className="bg-gray-100" style={{ padding: 'var(--space-2)' }}>
                          <div className="text-xs">padding: var(--space-2)</div>
                        </div>
                      </div>
                      <div className="border border-gray-200 p-4">
                        <div className="bg-gray-100" style={{ padding: 'var(--space-4)' }}>
                          <div className="text-xs">padding: var(--space-4)</div>
                        </div>
                      </div>
                      <div className="border border-gray-200 p-6">
                        <div className="bg-gray-100" style={{ padding: 'var(--space-6)' }}>
                          <div className="text-xs">padding: var(--space-6)</div>
                        </div>
                      </div>
                    </div>
                  </TokenPreview>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Spacing Grid</CardTitle>
                <CardDescription>
                  Visual overview of all spacing tokens
                </CardDescription>
              </CardHeader>
              <CardContent>
                <SpacingPreviewGrid tokens={spacingTokens} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="primitives">
            <EnhancedTokenTable
              tokens={getTokensByTier('primitive')}
              title="Primitive Spacing Tokens"
            />
          </TabsContent>

          <TabsContent value="semantic">
            <EnhancedTokenTable
              tokens={getTokensByTier('semantic')}
              title="Semantic Spacing Tokens"
            />
          </TabsContent>

          <TabsContent value="all">
            <EnhancedTokenTable
              tokens={spacingTokens}
              title="All Spacing Tokens"
            />
          </TabsContent>
        </Tabs>

        <TokenModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          token={editingToken}
          onSubmit={handleSubmitToken}
          category="spacing"
          title={editingToken ? 'Edit Spacing Token' : 'Add Spacing Token'}
        />
      </div>
    </SensoryProvider>
  );
}