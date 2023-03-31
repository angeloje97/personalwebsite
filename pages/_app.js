import Layout from "../src/components/layouts/Layout";
import "../styles/globals.css";
import { Provider } from "react-redux";
import store from "../src/store";
import StoreManager from "../src/store/storeManager";
import style from "./style.module.css";
import WebpageBackground from "../src/components/backgrounds/WebpageBackground";

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <StoreManager />
      <WebpageBackground />
      <Layout>
        <Component {...pageProps} />
      </Layout>
      <div id="overlays" />
    </Provider>
  );
}

export default MyApp;
