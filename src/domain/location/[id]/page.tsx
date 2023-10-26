import { SymbolIcon, Pencil1Icon } from "@radix-ui/react-icons";
import {
  LocationHeader,
  LocationHeaderAction,
  LocationHeaderTitle,
} from "../LocationHeader";
import { useGetLocationSlug } from "./useGetLocationSlug";
import { useParams } from "react-router-dom";
import { NetworkStatus } from "@apollo/client";
import { Skeleton } from "components/ui/Skeleton";
import { EditLocationDialog } from "./EditLocationDialog";

export function LocationSlugPage() {
  const { id } = useParams() as { id: string };
  const { data, loading, error, networkStatus, refetch } =
    useGetLocationSlug(id);

  function Content_() {
    if (loading || networkStatus === NetworkStatus.refetch) {
      return (
        <div className="my-4 space-y-3">
          <Skeleton className="w-full h-10" />
          <Skeleton className="w-full h-10" />
          <Skeleton className="w-full h-10" />
          <Skeleton className="w-full h-10" />
        </div>
      );
    }

    {
      error && (
        <div className="my-4 space-y-2 text-center">
          <h2 className="text-xl font-semibold">Something went wrong!</h2>
          <p className="text-red-600">{error.message}</p>
        </div>
      );
    }

    const resource = data?.locationRead?.resource;

    return (
      <table className="mt-4 border border-collapse">
        <tr className="border">
          <td className="text-2xl border p-2">Name</td>
          <td className="align-middle border p-2">{resource?.name}</td>
        </tr>
        <tr className="border">
          <td className="text-2xl border p-2">Address</td>
          <td className="align-middle border p-2">{resource?.address}</td>
        </tr>
        <tr className="border">
          <td className="text-2xl border p-2">Status</td>
          <td className="align-middle border p-2">{resource?.status}</td>
        </tr>
        <tr className="border">
          <td className="text-2xl border p-2">Alias</td>
          <td className="align-middle border p-2">{resource?.alias}</td>
        </tr>
        <tr className="border">
          <td className="text-2xl border p-2">TaxID</td>
          <td className="align-middle border p-2">{resource?.taxId}</td>
        </tr>
        <tr className="border">
          <td className="text-2xl border p-2">Type</td>
          <td className="align-middle border p-2">{resource?.type}</td>
        </tr>
        <tr className="border">
          <td className="text-2xl border p-2">UpdatedAt</td>
          <td className="align-middle border p-2">
            {resource?.updatedAt
              ? new Date(resource?.updatedAt).toLocaleDateString()
              : "N/A"}
          </td>
        </tr>
      </table>
    );
  }

  return (
    <div className="p-4 grid grid-rows-[repeat(2,auto)_1fr]">
      <LocationHeader>
        <LocationHeaderAction
          className="px-10 justify-self-start"
          onClick={() => refetch()}
        >
          <SymbolIcon />
        </LocationHeaderAction>
        <LocationHeaderTitle>
          {data?.locationRead?.resource.name ?? "N/A"}
        </LocationHeaderTitle>
        {data?.locationRead?.resource && (
          <EditLocationDialog
            location={data?.locationRead?.resource}
            onSuccess={refetch}
          >
            <LocationHeaderAction className="justify-self-end" variant="icon">
              <Pencil1Icon />
            </LocationHeaderAction>
          </EditLocationDialog>
        )}
      </LocationHeader>

      <Content_ />
    </div>
  );
}
