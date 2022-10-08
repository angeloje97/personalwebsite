import style from "./Layout.module.css";
import MainNavigation from "./MainNavigation";

import PageBody from "./PageBody";

const Layout = (props) => {
  return (
    <div className={style.main}>
      <MainNavigation />
      <PageBody>{props.children}</PageBody>
    </div>
  );
};

export default Layout;
