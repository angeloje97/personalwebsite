import ClipBoard from "../src/components/modals/ClipBoard";
import ConfirmPrompt from "../src/components/modals/ConfirmPrompt";
import HomeGrid from "../src/components/home/HomeGrid";

import { Analytics } from "@vercel/analytics/react";

import React from "react";
const Index = () => {
  return (
    <React.Fragment>
      <Analytics />
      <HomeGrid></HomeGrid>
    </React.Fragment>
  );
};
export default Index;
