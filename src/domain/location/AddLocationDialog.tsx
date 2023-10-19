import { Button } from "components/ui/Button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "components/ui/Dialog";
import { Input } from "components/ui/Input";
import { ReactNode, SyntheticEvent, useState } from "react";
import { useCreateLocation } from "./useCreateLocation";
import { LocationCreateMutation } from "__generated__/graphql";

function Content_({ close }: { close: VoidFunction }) {
  const { createLocation, loading, error } = useCreateLocation();

  async function handleSubmit(e: SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();

    const name = new FormData(e.currentTarget)
      .get("location")
      ?.toString() as string;

    const res = await createLocation({
      variables: {
        tenant: import.meta.env.VITE_GQL_TENANT,
        requestBody: {
          name,
        },
      },
    });

    const data = res.data as Extract<
      LocationCreateMutation["locationCreate"],
      { __typename?: "LocationCommandResponse" }
    >;

    if (data?.resourceID) {
      close();
    }
  }

  return (
    <>
      <DialogHeader className="space-y-4">
        <DialogTitle>Add Location</DialogTitle>
        <form onSubmit={handleSubmit}>
          <fieldset className="grid gap-4" disabled={loading}>
            <Input placeholder="Name" required name="location" />
            {error && <p>{error.message}</p>}
            <Button className="justify-self-end">Submit</Button>
          </fieldset>
        </form>
      </DialogHeader>
    </>
  );
}

export function AddLocationDialog({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent>
        <Content_ close={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}
