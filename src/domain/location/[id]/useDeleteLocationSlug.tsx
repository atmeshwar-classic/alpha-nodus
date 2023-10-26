import { useMutation } from "@apollo/client";
import { gql } from "__generated__/gql";

const DELETE_LOCATION = gql(`
  mutation LocationDelete($locationRemoveId: String!, $tenant: String!) {
    locationRemove(id: $locationRemoveId, tenant: $tenant) {
      ... on LocationCommandResponse {
        resourceID
      }
      ... on Error {
        error
        message
        statusCode
      }
    }
  }
`);

export function useDeleteLocationSlug() {
  const [deleteLocation, rest] = useMutation(DELETE_LOCATION);

  return { deleteLocation, ...rest };
}
