import { useOidcAccessToken } from "@axa-fr/react-oidc";
import { FC, ReactNode } from "react";
import { Client, Provider, cacheExchange, fetchExchange } from "urql";

interface Props {
  children: ReactNode;
}

export const UrqlProvider: FC<Props> = ({ children }) => {
  const { accessToken } = useOidcAccessToken();

  const client = new Client({
    url: "https://rickandmortyapi.com/graphql",
    exchanges: [cacheExchange, fetchExchange],
    fetchOptions: () => {
      return {
        headers: { authorization: accessToken ? `Bearer ${accessToken}` : "" },
      };
    },
  });

  return <Provider value={client}>{children}</Provider>;
};
