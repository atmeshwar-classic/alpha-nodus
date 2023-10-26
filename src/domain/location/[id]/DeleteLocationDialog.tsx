import { useState, FormEvent } from "react";
import { Button } from "components/ui/Button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogHeader,
} from "components/ui/Dialog";
import { useDeleteLocationSlug } from "./useDeleteLocationSlug";
import { LocationDeleteMutation } from "__generated__/graphql";
import { useNavigate } from "react-router-dom";

function Content_({ id, close }: { id: string; close: VoidFunction }) {
  const { deleteLocation, loading, error } = useDeleteLocationSlug();
  const navigate = useNavigate();

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const res = await deleteLocation({
      variables: {
        locationRemoveId: id,
        tenant: import.meta.env.VITE_GQL_TENANT,
      },
    });

    if (
      (
        res.data?.locationRemove as Extract<
          LocationDeleteMutation["locationRemove"],
          { __typename?: "LocationCommandResponse" }
        >
      ).resourceID
    ) {
      navigate("/");
    }
  }

  return (
    <>
      <DialogHeader>
        <DialogTitle>
          Are you sure you want to delete this location?
        </DialogTitle>

        <form onSubmit={handleSubmit}>
          <fieldset
            disabled={loading}
            className="grid gap-4 grid-flow-col mt-8"
          >
            {error && <p>{error.message}</p>}

            <Button type="button" onClick={close}>
              Cancel
            </Button>
            <Button type="submit" variant="destructive">
              Delete
            </Button>
          </fieldset>
        </form>
      </DialogHeader>
    </>
  );
}

export function DeleteLocationDialog({ id }: { id: string }) {
  const [open, setOpen] = useState(false);

  function onClose() {
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="text-red-600 hover:bg-slate-50 px-4 py-2">
        Delete
      </DialogTrigger>

      <DialogContent>
        <Content_ id={id} close={onClose} />
      </DialogContent>
    </Dialog>
  );
}
