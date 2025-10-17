import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui'

export default function CardPage() {
  return (
    <main className="container mx-auto py-8">
      <div className="space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold">Card Component Test</h1>
          <p className="text-xl text-muted-foreground">
            Testing various card layouts and styles
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Basic Card</CardTitle>
              <CardDescription>
                A simple card with title and description
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>This is the content area of the card.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Advanced Card</CardTitle>
              <CardDescription>
                Card with more complex content
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p>Multiple content elements</p>
                <p>Rich text formatting</p>
                <p>And more...</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Minimal Card</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Just the essentials</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  )
}