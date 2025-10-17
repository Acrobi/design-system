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
import { Plus, Play, Clock, Zap, Activity, Timer } from 'lucide-react';

export default function MotionPage() {
  const { motionTokens, addToken, updateToken, deleteToken } = useTokenStore();
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
      updateToken('motion', editingToken.id, tokenData);
    } else {
      addToken('motion', tokenData);
    }
  };

  const handleDeleteToken = (tokenId: string) => {
    deleteToken('motion', tokenId);
  };

  const getTokensByType = (type: string) => {
    return motionTokens.filter(token =>
      token.name.toLowerCase().includes(type.toLowerCase())
    );
  };

  const getTokensByTier = (tier: string) => {
    return motionTokens.filter(token => token.tier === tier);
  };

  // Enhanced table with actions
  const EnhancedTokenTable = ({ tokens, title }: { tokens: Token[], title: string }) => (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Zap className="w-5 h-5" />
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
                      {token.name.includes('duration') ? (
                        <div className="flex items-center gap-1 text-xs text-gray-500">
                          <Timer className="w-3 h-3" />
                          {token.value}
                        </div>
                      ) : token.name.includes('easing') ? (
                        <div className="flex items-center gap-1 text-xs text-gray-500">
                          <Activity className="w-3 h-3" />
                          {token.value}
                        </div>
                      ) : token.name.includes('delay') ? (
                        <div className="flex items-center gap-1 text-xs text-gray-500">
                          <Clock className="w-3 h-3" />
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

  // Motion preview grid
  const MotionPreviewGrid = ({ tokens }: { tokens: Token[] }) => (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {tokens.map((token) => (
        <TokenPreview key={token.id} label={token.name} description={token.description}>
          <div className="flex items-center gap-2">
            {token.name.includes('duration') ? (
              <div className="flex items-center gap-1">
                <Timer className="w-3 h-3" />
                <TokenValueDisplay value={token.value} />
              </div>
            ) : token.name.includes('easing') ? (
              <div className="flex items-center gap-1">
                <Activity className="w-3 h-3" />
                <TokenValueDisplay value={token.value} />
              </div>
            ) : token.name.includes('delay') ? (
              <div className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                <TokenValueDisplay value={token.value} />
              </div>
            ) : (
              <div className="w-8 h-8 bg-gray-300 rounded" />
            )}
          </div>
        </TokenPreview>
      ))}
    </div>
  );

  // Component showcase
  const ComponentShowcase = () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <TokenPreview label="Button animations">
        <div className="space-y-2">
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded-md"
            style={{
              transition: `all var(--duration-fast) var(--easing-ease-out)`,
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
            }}
          >
            Hover me
          </button>
          <button
            className="px-4 py-2 bg-green-600 text-white rounded-md"
            style={{
              transition: `all var(--duration-normal) var(--easing-bounce)`,
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
            }}
          >
            Click me
          </button>
        </div>
      </TokenPreview>

      <TokenPreview label="Loading animation">
        <div className="flex items-center justify-center">
          <div
            className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full"
            style={{
              animation: `spin var(--duration-slow) linear infinite`
            }}
          />
        </div>
      </TokenPreview>

      <TokenPreview label="Entrance animation">
        <div
          className="w-16 h-16 bg-purple-500 rounded-lg"
          style={{
            animation: `fadeIn var(--duration-normal) var(--easing-ease-out)`,
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
          }}
        >
          <div className="text-white flex items-center justify-center h-full">✨</div>
        </div>
      </TokenPreview>
    </div>
  );

  return (
    <SensoryProvider>
      <div className="container mx-auto p-6 max-w-7xl">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Play className="w-6 h-6 text-purple-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">Motion Tokens</h1>
          </div>
          <p className="text-gray-600">
            Comprehensive motion system with durations, easing functions, and animation delays.
          </p>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="durations">Durations</TabsTrigger>
            <TabsTrigger value="easing">Easing</TabsTrigger>
            <TabsTrigger value="delays">Delays</TabsTrigger>
            <TabsTrigger value="all">All Motion</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="w-5 h-5" />
                    Token Overview
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Total Tokens</span>
                      <span className="text-sm text-gray-600">{motionTokens.length}</span>
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
                    Add Motion Token
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Motion Categories</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Duration Tokens</span>
                      <span className="text-xs bg-gray-100 px-2 py-1 rounded">{getTokensByType('duration').length}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Easing Tokens</span>
                      <span className="text-xs bg-gray-100 px-2 py-1 rounded">{getTokensByType('easing').length}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Delay Tokens</span>
                      <span className="text-xs bg-gray-100 px-2 py-1 rounded">{getTokensByType('delay').length}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Animation Preview</CardTitle>
                </CardHeader>
                <CardContent>
                  <TokenPreview label="Sample Animation">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-blue-500 rounded" />
                        <span className="text-xs">Fast</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-green-500 rounded" />
                        <span className="text-xs">Normal</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-purple-500 rounded" />
                        <span className="text-xs">Slow</span>
                      </div>
                    </div>
                  </TokenPreview>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Motion Grid</CardTitle>
                <CardDescription>
                  Visual overview of all motion tokens
                </CardDescription>
              </CardHeader>
              <CardContent>
                <MotionPreviewGrid tokens={motionTokens} />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Component Showcase</CardTitle>
                <CardDescription>
                  Real-world examples of motion tokens in use
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ComponentShowcase />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="durations">
            <EnhancedTokenTable
              tokens={getTokensByType('duration')}
              title="Duration Tokens"
            />
          </TabsContent>

          <TabsContent value="easing">
            <EnhancedTokenTable
              tokens={getTokensByType('easing')}
              title="Easing Tokens"
            />
          </TabsContent>

          <TabsContent value="delays">
            <EnhancedTokenTable
              tokens={getTokensByType('delay')}
              title="Delay Tokens"
            />
          </TabsContent>

          <TabsContent value="all">
            <EnhancedTokenTable
              tokens={motionTokens}
              title="All Motion Tokens"
            />
          </TabsContent>
        </Tabs>

        <TokenModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          token={editingToken}
          onSubmit={handleSubmitToken}
          category="motion"
          title={editingToken ? 'Edit Motion Token' : 'Add Motion Token'}
        />
      </div>
    </SensoryProvider>
  );
}