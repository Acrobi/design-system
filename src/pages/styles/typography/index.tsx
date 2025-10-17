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
import { Plus, Type, Palette, Layers, ArrowRight } from 'lucide-react';

export default function TypographyPage() {
  const { typographyTokens, addToken, updateToken, deleteToken } = useTokenStore();
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
      updateToken('typography', editingToken.id, tokenData);
    } else {
      addToken('typography', tokenData);
    }
  };

  const handleDeleteToken = (tokenId: string) => {
    deleteToken('typography', tokenId);
  };

  const getTokensByType = (type: string) => {
    return typographyTokens.filter(token =>
      token.name.toLowerCase().includes(type.toLowerCase())
    );
  };

  const getTokensByTier = (tier: string) => {
    return typographyTokens.filter(token => token.tier === tier);
  };

  // Enhanced table with actions
  const EnhancedTokenTable = ({ tokens, title }: { tokens: Token[], title: string }) => (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Type className="w-5 h-5" />
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

  return (
    <SensoryProvider>
      <div className="container mx-auto p-6 max-w-7xl">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Type className="w-6 h-6 text-blue-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">Typography Tokens</h1>
          </div>
          <p className="text-gray-600">
            Comprehensive typography system with font families, sizes, weights, and spacing tokens.
          </p>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="families">Font Families</TabsTrigger>
            <TabsTrigger value="sizes">Font Sizes</TabsTrigger>
            <TabsTrigger value="weights">Font Weights</TabsTrigger>
            <TabsTrigger value="line-heights">Line Heights</TabsTrigger>
            <TabsTrigger value="semantic">Semantic</TabsTrigger>
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
                      <span className="text-sm text-gray-600">{typographyTokens.length}</span>
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
                    Add Typography Token
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Quick Preview</CardTitle>
                </CardHeader>
                <CardContent>
                  <TokenPreview label="Sample Typography">
                    <div className="space-y-4">
                      <div style={{ fontFamily: 'var(--font-family-sans)' }}>
                        <h1 className="text-2xl font-bold">Heading Text</h1>
                        <p className="text-base">Body text with normal weight</p>
                        <p className="text-sm">Small text for captions</p>
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
                        <span>Font Families</span>
                        <span>{getTokensByType('font').length}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: `${(getTokensByType('font').length / typographyTokens.length) * 100}%` }}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Font Sizes</span>
                        <span>{getTokensByType('size').length}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-green-600 h-2 rounded-full"
                          style={{ width: `${(getTokensByType('size').length / typographyTokens.length) * 100}%` }}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Other</span>
                        <span>{typographyTokens.length - getTokensByType('font').length - getTokensByType('size').length}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-purple-600 h-2 rounded-full"
                          style={{ width: `${((typographyTokens.length - getTokensByType('font').length - getTokensByType('size').length) / typographyTokens.length) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <EnhancedTokenTable
              tokens={typographyTokens}
              title="All Typography Tokens"
            />
          </TabsContent>

          <TabsContent value="families">
            <EnhancedTokenTable
              tokens={getTokensByType('font')}
              title="Font Family Tokens"
            />
          </TabsContent>

          <TabsContent value="sizes">
            <EnhancedTokenTable
              tokens={getTokensByType('size')}
              title="Font Size Tokens"
            />
          </TabsContent>

          <TabsContent value="weights">
            <EnhancedTokenTable
              tokens={getTokensByType('weight')}
              title="Font Weight Tokens"
            />
          </TabsContent>

          <TabsContent value="line-heights">
            <EnhancedTokenTable
              tokens={getTokensByType('height')}
              title="Line Height Tokens"
            />
          </TabsContent>

          <TabsContent value="semantic">
            <EnhancedTokenTable
              tokens={getTokensByTier('semantic')}
              title="Semantic Typography Tokens"
            />
          </TabsContent>
        </Tabs>

        <TokenModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          token={editingToken}
          onSubmit={handleSubmitToken}
          category="typography"
          title={editingToken ? 'Edit Typography Token' : 'Add Typography Token'}
        />
      </div>
    </SensoryProvider>
  );
}