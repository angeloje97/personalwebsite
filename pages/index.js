import ClipBoard from "../src/components/modals/ClipBoard";
import ConfirmPrompt from "../src/components/modals/ConfirmPrompt";
import HomeGrid from "../src/components/home/HomeGrid";
import WebpageBackground from "../src/components/backgrounds/WebpageBackground.js";

import React from "react";
const Index = () => {
  return (
    <React.Fragment>
      <WebpageBackground src="/resources/pictures/Background3.jpeg" />
      <HomeGrid></HomeGrid>
    </React.Fragment>
  );
};
export default Index;
