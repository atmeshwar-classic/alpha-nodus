import { Button } from "components/ui/Button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "components/ui/Dialog";
import { Input } from "components/ui/Input";
import { ReactNode } from "react";

function Content_() {
  return (
    <>
      <DialogHeader className="space-y-3">
        <DialogTitle>Add Location</DialogTitle>
        <form className="grid gap-4">
          <Input placeholder="Name" />
          <Button className="justify-self-end">Submit</Button>
        </form>
      </DialogHeader>
    </>
  );
}

export function AddLocationDialog({ children }: { children: ReactNode }) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent>
        <Content_ />
      </DialogContent>
    </Dialog>
  );
}
