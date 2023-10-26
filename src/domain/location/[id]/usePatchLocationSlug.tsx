import { useMutation } from "@apollo/client";
import { gql } from "__generated__/gql";

const PATCH_LOCATION = gql(`
  mutation LocationPatch(
    $locationPatchId: String!
    $requestBody: LocationPatchInput!
    $tenant: String!
  ) {
    locationPatch(
      id: $locationPatchId
      requestBody: $requestBody
      tenant: $tenant
    ) {
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

export function usePatchLocationSlug() {
  const [patchLocation, rest] = useMutation(PATCH_LOCATION);

  return { patchLocation, ...rest };
}
