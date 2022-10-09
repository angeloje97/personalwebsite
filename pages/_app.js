import Layout from "../src/components/layouts/Layout";
import "../styles/globals.css";
import { Provider } from "react-redux";
import store from "../src/store";
import StoreManager from "../src/store/storeManager";

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <StoreManager />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}

export default MyApp;
