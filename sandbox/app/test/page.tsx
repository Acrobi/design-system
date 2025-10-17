'use client'

import { useState } from 'react'
import { Button, Card, CardContent, CardHeader, CardTitle } from '../../components/ui'

export default function TestPage() {
  const [count, setCount] = useState(0)

  return (
    <main className="container mx-auto py-8">
      <div className="space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold">Component Testing</h1>
          <p className="text-xl text-muted-foreground">
            Interactive testing environment
          </p>
        </div>

        <Card className="max-w-md mx-auto">
          <CardHeader>
            <CardTitle>Interactive Counter</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <p className="text-2xl font-bold">{count}</p>
            </div>
            <div className="flex gap-2 justify-center">
              <Button
                variant="outline"
                onClick={() => setCount(count - 1)}
                disabled={count <= 0}
              >
                Decrease
              </Button>
              <Button
                onClick={() => setCount(count + 1)}
              >
                Increase
              </Button>
            </div>
            <Button
              variant="ghost"
              onClick={() => setCount(0)}
              className="w-full"
            >
              Reset
            </Button>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}