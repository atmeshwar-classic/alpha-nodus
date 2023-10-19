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

export function LocationsPage() {
  const { data, loading, error } = useGetLocations();

  function Content_() {
    if (loading) {
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

    if (error) {
      return (
        <div className="my-4 space-y-2 text-center">
          <h2 className="text-xl font-semibold">Something went wrong!</h2>
          <p className="text-red-600">{error.message}</p>
        </div>
      );
    }

    return data?.locationList?.resources?.map((l) =>
      l ? (
        <LocationCard
          key={l.id}
          id={l.id}
          name={l.name}
          address={l.address}
          type={l.type}
          updatedAt={l.updatedAt}
          status={l.status}
        />
      ) : null
    );
  }

  return (
    <main className="max-w-3xl mx-auto p-4 space-y-3">
      <LocationHeader>
        <LocationHeaderAction className="px-10 justify-self-start">
          <SymbolIcon />
        </LocationHeaderAction>
        <LocationHeaderTitle>Locations</LocationHeaderTitle>
        <LocationHeaderAction variant="icon" className="justify-self-end">
          <PlusIcon />
        </LocationHeaderAction>
      </LocationHeader>

      <Input
        placeholder="Search"
        prefixIcon={<MagnifyingGlassIcon className="h-5 w-5" />}
      />

      <Content_ />
    </main>
  );
}
