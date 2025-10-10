import { ComponentEditor } from "../components/component-editor";
export default function Home() {
  return (
    <main className="p-4 sm:p-8 md:p-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold">Acrobi Design System</h1>
        <p className="text-muted-foreground mt-2">The Golden Master Test Environment</p>
      </div>
      <ComponentEditor />
    </main>
  );
}