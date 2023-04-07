import NavBar from "../elements/NavBar";
import Button from "../elements/Button";
import style from "./MainNavigation.module.css";
import { useRouter } from "next/router";
import { authActions } from "../../store/auth";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import ClipBoard from "../modals/ClipBoard";

const hiddenRoutes = ["/admin"];

const ROUTES = [
  { name: "Home", route: "/" },
  { name: "Resume", route: "/resume" },
  { name: "Projects", route: "/projects" },
  // { name: "About Me", route: "/about-me" },
];

const MainNavigation = () => {
  const router = useRouter();
  const [isHomePage, setIsHomePage] = useState(false);

  const handleSelectRoute = (event) => {
    router.push(event.target.value);
  };

  useEffect(() => {
    if (router.pathname === "/") {
      setIsHomePage(true);
    } else {
      setIsHomePage(false);
    }
  }, [router.pathname]);

  if (hiddenRoutes.includes(router.pathname)) {
    return null;
  }

  return (
    <NavBar navbartype="top" className={style.main}>
      <NavButtons
        onSelectRoute={handleSelectRoute}
        currentRoute={router.pathname}
      />
      <SideBar isHome={isHomePage} />
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

const SideBar = ({ isHome }) => {
  const personal = useSelector((state) => state.personal);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();
  const [copyingEmail, setCopyingEmail] = useState(false);

  if (isHome) return null;

  const onClickEmail = (event) => {
    event.preventDefault();

    setCopyingEmail(true);
  };

  const emailClose = () => {
    setCopyingEmail(false);
  };

  const handleLogout = (event) => {
    event.preventDefault();
    dispatch(authActions.logout());
  };

  const emailClipBoard = (
    <ClipBoard copyContent={personal.email.url} onClose={emailClose} />
  );

  return (
    <div className={style.side}>
      <a href={personal.email.url} onClick={onClickEmail}>
        Email
      </a>
      <a href={personal.linkedIn.url} target="_blank" rel="noreferrer">
        LinkedIn
      </a>
      <a href={personal.gitHub.url} target="_blank" rel="noreferrer">
        GitHub
      </a>
      {isAuthenticated && (
        <Button classtype="link" onClick={handleLogout}>
          Logout
        </Button>
      )}
      {copyingEmail && emailClipBoard}
    </div>
  );
};
export default MainNavigation;
