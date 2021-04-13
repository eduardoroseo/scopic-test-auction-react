import React from "react";
import { Container } from "reactstrap";
import AppNavbar from "../AppNavbar";

export default function App({ children }) {

  return (
    <>
      <AppNavbar />
      <Container className="mt-4">{children}</Container>
    </>
  );
}
