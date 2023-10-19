import { createBrowserRouter } from "react-router-dom";
import { Page } from "components/layout/Page";
import { LocationsPage } from "domain/location/page";
import { LocationSlugPage } from "domain/location/[id]/page";

export const router = createBrowserRouter([
  {
    element: <Page />,
    children: [
      {
        path: "/",
        element: <LocationsPage />,
      },
      {
        path: "/:id",
        element: <LocationSlugPage />,
      },
    ],
  },
]);
