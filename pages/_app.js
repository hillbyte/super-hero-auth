import "../styles/globals.css";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import Layout from "../components/Layout";
import { UserContext, UserProvider } from "@auth0/nextjs-auth0";

function MyApp({ Component, pageProps }) {
  return (
    <UserProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </UserProvider>
  );
}

export default MyApp;
