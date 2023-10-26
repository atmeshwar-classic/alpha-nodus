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
import { Location, LocationPatchMutation } from "__generated__/graphql";
import { FormControl, FormField, FormLabel } from "components/ui/Form";
import { usePatchLocationSlug } from "./usePatchLocationSlug";

function Content_({
  close,
  location,
}: {
  close: VoidFunction;
  location: Location;
}) {
  const { patchLocation, loading, error } = usePatchLocationSlug();

  async function handleSubmit(e: SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const name = formData.get("name")?.toString() as string;
    const address = formData.get("address")?.toString();
    const status = formData.get("status")?.toString();
    const alias = formData.get("alias")?.toString();
    const taxId = formData.get("taxid")?.toString();
    const type = formData.get("type")?.toString();

    const res = await patchLocation({
      variables: {
        tenant: import.meta.env.VITE_GQL_TENANT,
        requestBody: {
          name,
          address,
          status,
          alias,
          taxId,
          type,
        },
        locationPatchId: location.id,
      },
    });

    if (
      (
        res.data?.locationPatch as Extract<
          LocationPatchMutation["locationPatch"],
          { __typename?: "LocationCommandResponse" }
        >
      )?.resourceID
    ) {
      close();
    }
  }

  return (
    <>
      <DialogHeader className="space-y-4">
        <DialogTitle>Edit Location</DialogTitle>
        <form onSubmit={handleSubmit}>
          <fieldset className="grid gap-4" disabled={loading}>
            <FormField>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input name="name" required defaultValue={location.name} />
              </FormControl>
            </FormField>

            <FormField>
              <FormLabel>Address</FormLabel>
              <FormControl>
                <Input
                  name="address"
                  defaultValue={location.address ?? undefined}
                />
              </FormControl>
            </FormField>

            <FormField>
              <FormLabel>Status</FormLabel>
              <FormControl>
                <Input
                  name="status"
                  defaultValue={location.status ?? undefined}
                />
              </FormControl>
            </FormField>

            <FormField>
              <FormLabel>Alias</FormLabel>
              <FormControl>
                <Input
                  name="alias"
                  defaultValue={location.alias ?? undefined}
                />
              </FormControl>
            </FormField>

            <FormField>
              <FormLabel>TaxID</FormLabel>
              <FormControl>
                <Input
                  name="taxid"
                  defaultValue={location.taxId ?? undefined}
                />
              </FormControl>
            </FormField>

            <FormField>
              <FormLabel>Type</FormLabel>
              <FormControl>
                <Input name="type" defaultValue={location.type ?? undefined} />
              </FormControl>
            </FormField>

            {error && <p>{error.message}</p>}

            <Button className="justify-self-end">Submit</Button>
          </fieldset>
        </form>
      </DialogHeader>
    </>
  );
}

export function EditLocationDialog({
  children,
  onSuccess,
  ...rest
}: {
  children: ReactNode;
  location: Location;
  onSuccess: VoidFunction;
}) {
  const [open, setOpen] = useState(false);

  function onContentClose() {
    setOpen(false);
    onSuccess();
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent className="max-h-[90vh] overflow-x-auto">
        <Content_ close={onContentClose} {...rest} />
      </DialogContent>
    </Dialog>
  );
}
