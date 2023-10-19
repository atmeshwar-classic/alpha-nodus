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

export function LocationsPage() {
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
    </main>
  );
}
