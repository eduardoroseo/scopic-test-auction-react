import React from "react";
import { Nav, NavItem, NavLink } from "reactstrap";

export default function Menu() {
  return (
    <Nav className="mr-auto" navbar>
      <NavItem>
        <NavLink href="/">Home</NavLink>
      </NavItem>
    </Nav>
  );
}
