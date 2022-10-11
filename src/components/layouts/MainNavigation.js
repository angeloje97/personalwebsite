import NavBar from "../elements/NavBar";
import Button from "../elements/Button";
import style from "./MainNavigation.module.css";
import { useRouter } from "next/router";
import { authActions } from "../../store/auth";
import { useDispatch, useSelector } from "react-redux";

const hiddenRoutes = ["/admin"];

const ROUTES = [
  { name: "Home", route: "/" },
  { name: "Resume", route: "/resume" },
  { name: "Projects", route: "/projects" },
  { name: "About Me", route: "/about-me" },
];

const MainNavigation = () => {
  const router = useRouter();

  if (hiddenRoutes.includes(router.pathname)) {
    return null;
  }

  const handleSelectRoute = (event) => {
    router.push(event.target.value);
  };
  return (
    <NavBar navbartype="top" className={style.main}>
      <NavButtons
        onSelectRoute={handleSelectRoute}
        currentRoute={router.pathname}
      />
      <SideBar />
      {/* <Button classtype="navBar first">Home</Button>
      <Button classtype="navBar">Resume</Button>
      <Button classtype="navBar">Projects</Button>
      <Button classtype="navBar last">About Me</Button> */}
    </NavBar>
  );
};

const NavButtons = (props) => {
  const size = ROUTES.length;
  return ROUTES.map((page, index) => {
    let tailClass = "";
    let className = "";
    if (index === 0) {
      className += ` ${style.first}`;
    }

    if (index === size - 1) {
      className = ` ${style.last}`;
    }

    if (props.currentRoute === page.route) {
      tailClass += " selected";
    }

    return (
      <Button
        classtype={`navBar ${tailClass}`}
        key={page.route}
        value={page.route}
        onClick={props.onSelectRoute}
        className={className}
      >
        {page.name}
      </Button>
    );
  });
};

const SideBar = () => {
  const personal = useSelector((state) => state.personal);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();

  const onClickEmail = (event) => {
    event.preventDefault();
  };

  const handleLogout = (event) => {
    event.preventDefault();
    dispatch(authActions.logout());
  };

  return (
    <div className={style.side}>
      <a href={personal.email} onClick={onClickEmail}>
        Email
      </a>
      <a href={personal.linkedIn} target="_blank">
        LinkedIn
      </a>
      <a href={personal.gitHub} target="_blank">
        GitHub
      </a>
      {isAuthenticated && (
        <Button classtype="link" onClick={handleLogout}>
          Logout
        </Button>
      )}
    </div>
  );
};
export default MainNavigation;
