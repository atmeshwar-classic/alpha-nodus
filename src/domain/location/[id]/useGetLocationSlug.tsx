import { useQuery } from "@apollo/client";
import { gql } from "__generated__";

const GET_LOCATION = gql(`
  query LocationRead($locationReadId: String!, $tenant: String!) {
    locationRead(id: $locationReadId, tenant: $tenant) {
      id
      resource {
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

export function useGetLocationSlug(id: string) {
  const query = useQuery(GET_LOCATION, {
    variables: {
      tenant: import.meta.env.VITE_GQL_TENANT,
      locationReadId: id,
    },
    notifyOnNetworkStatusChange: true,
  });

  return query;
}
