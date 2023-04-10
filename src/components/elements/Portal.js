import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";

function Portal({ id, children }) {
  const [element, setElement] = useState(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const portalElement = document.getElementById(id);

    setElement(ReactDOM.createPortal(<div>{children}</div>, portalElement));
  }, [typeof window]);

  return element;
}

export default Portal;
