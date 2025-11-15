import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";

export default function Loader() {
  return (
    <div className="flex flex-col items-center gap-4">
      <Button disabled size="sm">
        <Spinner className="mr-2 h-4 w-4" />
        Loading...
      </Button>
    </div>
  );
}
