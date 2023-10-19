import { createBrowserRouter } from "react-router-dom";
import { LocationsPage } from "domain/location/page";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LocationsPage />,
  },
]);
