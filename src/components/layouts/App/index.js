import React from "react";
import { Container, Row, Spinner } from "reactstrap";
import { useAuth } from "../../../contexts/auth";
import AppNavbar from "../AppNavbar";

export default function App({ children }) {
  const { loading } = useAuth();

  return (
    <>
      <AppNavbar />
      {
        loading ?
          <Row className="justify-content-center mt-3">
            <Spinner style={{ width: '3rem', height: '3rem' }}>{' '}</Spinner>
          </Row> :
          <Container className="mt-4">{children}</Container>
      }
    </>
  );
}
