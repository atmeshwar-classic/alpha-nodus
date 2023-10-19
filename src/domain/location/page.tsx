import { Input } from "components/ui/Input";
import {
  LocationHeader,
  LocationHeaderAction,
  LocationHeaderTitle,
} from "./LocationHeader";
import {
  SymbolIcon,
  PlusIcon,
  MagnifyingGlassIcon,
} from "@radix-ui/react-icons";
import { useGetLocations } from "./useGetLocations";
import { Skeleton } from "components/ui/Skeleton";
import { LocationCard } from "./LocationCard";
import { NetworkStatus } from "@apollo/client";
import { AddLocationDialog } from "./AddLocationDialog";
import { useState } from "react";
import { Waypoint } from "react-waypoint";

export function LocationsPage() {
  const [page, setPage] = useState(0);
  const { data, loading, error, refetch, networkStatus, fetchMore } =
    useGetLocations();
  const [search] = useState("");

  const hasNextPage = data?.locationList?.pages
    ? page < data?.locationList?.pages - 1
    : false;

  async function loadMore() {
    const newPage = page + 1;
    await fetchMore({
      variables: {
        tenant: import.meta.env.VITE_GQL_TENANT,
        search: search || undefined,
        page: newPage,
      },
    });
    setPage(newPage);
  }

  function Content_() {
    if (networkStatus === NetworkStatus.refetch) {
      return (
        <div className="my-4 space-y-3">
          <Skeleton className="w-full h-20" />
          <Skeleton className="w-full h-20" />
          <Skeleton className="w-full h-20" />
          <Skeleton className="w-full h-20" />
          <Skeleton className="w-full h-20" />
        </div>
      );
    }

    return (
      <div className="space-y-3">
        {data?.locationList?.resources?.map((l) =>
          l ? <LocationCard {...l} /> : null
        )}
        {error && (
          <div className="my-4 space-y-2 text-center">
            <h2 className="text-xl font-semibold">Something went wrong!</h2>
            <p className="text-red-600">{error.message}</p>
          </div>
        )}
        {(loading || hasNextPage) && (
          <div className="my-4 space-y-3">
            <Skeleton className="w-full h-20" />
            <Skeleton className="w-full h-20" />
          </div>
        )}

        {!loading && hasNextPage && <Waypoint onEnter={loadMore} />}
      </div>
    );
  }

  return (
    <div className="p-4 space-y-3 grid grid-rows-[repeat(2,auto)_1fr]">
      <LocationHeader>
        <LocationHeaderAction
          className="px-10 justify-self-start"
          onClick={() => refetch()}
        >
          <SymbolIcon />
        </LocationHeaderAction>
        <LocationHeaderTitle>Locations</LocationHeaderTitle>
        <AddLocationDialog>
          <LocationHeaderAction variant="icon" className="justify-self-end">
            <PlusIcon />
          </LocationHeaderAction>
        </AddLocationDialog>
      </LocationHeader>

      <Input
        placeholder="Search"
        prefixIcon={<MagnifyingGlassIcon className="h-5 w-5" />}
      />

      <Content_ />
    </div>
  );
}
