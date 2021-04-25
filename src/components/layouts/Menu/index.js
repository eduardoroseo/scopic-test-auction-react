import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Nav, NavItem, NavLink } from "reactstrap";

export default function Menu() {
  return (
    <BrowserRouter>
      <Nav className="mr-auto" navbar>
        <NavItem>
          <NavLink href="/">Home</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="/configs">Configs</NavLink>
        </NavItem>
      </Nav>
    </BrowserRouter>
  );
}
