import { OidcProvider } from "@axa-fr/react-oidc";
import { Home } from "./Home";
import { FetchComponent } from "./FetchComponent";
import { UrqlProvider } from "./UrqlProvider";
import { UrqlFetch } from "./UrqlFetch";

const configuration = {
  client_id: "my-client",
  redirect_uri: window.location.origin + "/authentication/callback",
  scope: "openid profile", // offline_access scope allow your client to retrieve the refresh_token
  authority: "http://localhost:8080/realms/my-realm",
  service_worker_relative_url: "/OidcServiceWorker.js",
  service_worker_only: true,
  demonstrating_proof_of_possession: false,
};

const Loading = () => <p>Loading</p>;
const AuthenticatingError = () => <p>Authenticating error</p>;
const Authenticating = () => <p>Authenticating</p>;
const SessionLost = () => <p>Session Lost</p>;
const ServiceWorkerNotSupported = () => <p>Not supported</p>;
const CallBackSuccess = () => <p>Success</p>;

const App = () => {
  return (
    <OidcProvider
      configuration={configuration}
      loadingComponent={Loading}
      authenticatingErrorComponent={AuthenticatingError}
      authenticatingComponent={Authenticating}
      sessionLostComponent={SessionLost}
      serviceWorkerNotSupportedComponent={ServiceWorkerNotSupported}
      callbackSuccessComponent={CallBackSuccess}
    >
      <UrqlProvider>
        <Home />
        <FetchComponent />
        <UrqlFetch />
      </UrqlProvider>
    </OidcProvider>
  );
};

export default App;
