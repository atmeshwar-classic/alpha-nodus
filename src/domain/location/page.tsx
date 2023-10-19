import {
  LocationHeader,
  LocationHeaderAction,
  LocationHeaderTitle,
} from "./LocationHeader";
import { SymbolIcon, PlusIcon } from "@radix-ui/react-icons";

export function LocationsPage() {
  return (
    <main className="max-w-3xl mx-auto">
      <LocationHeader>
        <LocationHeaderAction className="px-10 justify-self-start">
          <SymbolIcon />
        </LocationHeaderAction>
        <LocationHeaderTitle>Locations</LocationHeaderTitle>
        <LocationHeaderAction variant="icon" className="justify-self-end">
          <PlusIcon />
        </LocationHeaderAction>
      </LocationHeader>
    </main>
  );
}
