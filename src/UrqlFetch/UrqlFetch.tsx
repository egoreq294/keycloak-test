import { useOidcAccessToken } from "@axa-fr/react-oidc";
import { gql, useQuery } from "urql";

const GET_CHARACTERS = gql`
  query {
    characters {
      results {
        name
      }
    }
  }
`;

export const UrqlFetch = () => {
  const [{ fetching, data }] = useQuery({
    query: GET_CHARACTERS,
  });

  const { accessToken } = useOidcAccessToken();

  console.log(accessToken);

  if (fetching) {
    return <div>Loading</div>;
  }

  return <div>{JSON.stringify(data)}</div>;
};
