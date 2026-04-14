import { Button } from "@/components/ui/button";
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

function App() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center p-2">
      <Button>Click me</Button>
      <Field>
        <FieldLabel htmlFor="input-demo-api-key">API Key</FieldLabel>
        <Input id="input-demo-api-key" type="password" placeholder="sk-..." />
        <FieldDescription>
          Your API key is encrypted and stored securely.
        </FieldDescription>
      </Field>
    </div>
  );
}

export default App;
