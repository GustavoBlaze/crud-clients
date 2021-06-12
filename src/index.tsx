import React from "react";
import ReactDOM from "react-dom";
import { ChakraProvider } from "@chakra-ui/react";
import fakeApiServer from "./fake-api";
import Home from "./pages/Home";

fakeApiServer();

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider>
      <Home />
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
