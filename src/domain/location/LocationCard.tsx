import { hoursSinceUpdate } from "utils/hoursSinceUpdate";
import { Location } from "__generated__/graphql";
import { Link } from "react-router-dom";

type LocationCardProps = Location;

export function LocationCard({
  name,
  address,
  status,
  updatedAt,
  id,
}: LocationCardProps) {
  return (
    <Link to={`/${id}`} className="block">
      <div className="border border-slate-500 bg-white shadow-sm rounded-md p-4 grid grid-cols-[2fr_1fr] gap-3">
        <h3 className="font-semibold text-lg col-start-1 row-start-1">
          {name}
        </h3>
        <p className="col-span-2 col-start-1 row-start-2">{address ?? "N/A"}</p>
        <span className="col-start-2 row-start-1 rounded-full p-2 bg-amber-300 text-xs justify-self-end">
          {status ?? "N/A"}
        </span>
        <span className="col-start-2 row-start-2 text-gray-400 justify-self-end self-end text-xs">
          {hoursSinceUpdate(updatedAt)}
        </span>
      </div>
    </Link>
  );
}
