import { useOidc, useOidcFetch } from "@axa-fr/react-oidc";
import { FC, useEffect, useState } from "react";

export const FetchComponent: FC = () => {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(true);

  const { fetch: oidcFetch } = useOidcFetch();

  const { isAuthenticated } = useOidc();

  useEffect(() => {
    const fetchUserInfoAsync = async () => {
      // const res = await oidcFetch("http://localhost:5000/api/articles");
      const res = await oidcFetch("https://rickandmortyapi.com/api/character");
      if (res.status != 200) {
        return null;
      }
      return res.json();
    };
    let isMounted = true;
    fetchUserInfoAsync().then((data) => {
      if (isMounted) {
        setLoading(false);
        setData(data);
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  if (!isAuthenticated) {
    return null;
  }

  if (isLoading) {
    return <div>Loading</div>;
  }

  return <div>{JSON.stringify(data)}</div>;
};
