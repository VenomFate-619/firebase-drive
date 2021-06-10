import React from "react";
import { Container } from "react-bootstrap";

export default function CenterContainer({ children }) {
  return (
    <Container
      className="d-flex align-items=center justify-content-center flex-column mt-3"
      style={{ minWidth: "250px" }}
    >
    {children}
    </Container>
  );
}
