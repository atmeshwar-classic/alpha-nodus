import { useMutation } from "@apollo/client";
import { gql } from "__generated__";

const CREATE_LOCATION = gql(`
  mutation LocationCreate($requestBody: LocationWriteInput!, $tenant: String!) {
    locationCreate(requestBody: $requestBody, tenant: $tenant) {
      ... on Error {
        error
        message
        statusCode
      }
      ... on LocationCommandResponse {
        resourceID
      }
    }
  }
`);

export function useCreateLocation() {
  const [createLocation, rest] = useMutation(CREATE_LOCATION);

  return { createLocation, ...rest };
}
