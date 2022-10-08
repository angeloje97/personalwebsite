import NavBar from "../elements/NavBar";
import Button from "../elements/Button";
import { useRouter } from "next/router";

const hiddenRoutes = ["/admin"];

const MainNavigation = () => {
  const router = useRouter();

  if (hiddenRoutes.includes(router.pathname)) {
    return null;
  }
  return (
    <NavBar>
      <Button classtype="navBar first">Home</Button>
      <Button classtype="navBar">Resume</Button>
      <Button classtype="navBar">Projects</Button>
      <Button classtype="navBar last">About Me</Button>
    </NavBar>
  );
};
export default MainNavigation;
