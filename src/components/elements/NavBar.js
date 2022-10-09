import React from "react";
import Button from "./Button";
import style from "./NavBar.module.css";

import { styleGroup } from "../../helpers/styles";

const NavBar = (props) => {
  return (
    <React.Fragment>
      <Default {...props} />
    </React.Fragment>
  );
};

const Default = (props) => {
  const { navbartype = "", className = "" } = props;

  const finalClass = styleGroup(style.navBar, navbartype, className, style);
  const propChildrens = props.children;
  const children = Array.isArray(propChildrens)
    ? propChildrens
    : [propChildrens];

  const length = children.length;
  const childrenContent = children.map((child, index) => {
    return (
      <React.Fragment key={index}>
        {child}
        {index < length - 1 && <div className={style.divider}></div>}
      </React.Fragment>
    );
  });

  return <div className={finalClass}>{childrenContent}</div>;
};

const Mobile = (props) => {
  return <div>Hello</div>;
  return (
    <div className={`${style.navBar} ${style.mobileBar}`}>
      <div className={style.divider}></div>
      <Button btntype="navBarIcon"></Button>
    </div>
  );
};
export default NavBar;
