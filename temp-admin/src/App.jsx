import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

function App() {
  return (
    <div className="container mx-auto p-8">
      <Card className="p-6">
        <h1 className="text-2xl font-bold mb-4">Vite + shadcn/ui</h1>
        <Button>Get started</Button>
      </Card>
    </div>
  );
}

export default App;