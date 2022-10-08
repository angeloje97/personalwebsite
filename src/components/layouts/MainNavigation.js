import NavBar from "../elements/NavBar";
import Button from "../elements/Button";
import { useRouter } from "next/router";

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
    <NavBar>
      <NavButtons
        onSelectRoute={handleSelectRoute}
        currentRoute={router.pathname}
      />
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

    if (index === 0) {
      tailClass += " first";
    }

    if (index === size - 1) {
      tailClass += " last";
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
      >
        {page.name}
      </Button>
    );
  });
};
export default MainNavigation;
