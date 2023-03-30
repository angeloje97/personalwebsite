import Layout from "../src/components/layouts/Layout";
import "../styles/globals.css";
import { Provider } from "react-redux";
import store from "../src/store";
import StoreManager from "../src/store/storeManager";
import style from "./style.module.css";

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <StoreManager />
      <div id="backgrounds" className={style.background} />
      <Layout>
        <Component {...pageProps} />
      </Layout>
      <div id="overlays" />
    </Provider>
  );
}

export default MyApp;
