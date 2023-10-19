import { useQuery } from "@apollo/client";

import { gql } from "__generated__";

const GET_LOCATIONS = gql(`
  query LocationList($tenant: String!, $page: Int, $search: String) {
    locationList(tenant: $tenant, page: $page, search: $search) {
      pages
      resources {
        address
        alias
        description
        id
        name
        managingOrganization
        updatedAt
        type
        taxId
        status
        npi
      }
    }
  }
`);

export function useGetLocations() {
  const query = useQuery(GET_LOCATIONS, {
    variables: { tenant: import.meta.env.VITE_GQL_TENANT },
    notifyOnNetworkStatusChange: true,
  });

  return query;
}
