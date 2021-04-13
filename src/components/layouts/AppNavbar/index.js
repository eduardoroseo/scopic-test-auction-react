import React, { useState } from "react";
import { Collapse, Navbar, NavbarBrand, NavbarToggler } from "reactstrap";
import Menu from "../Menu";

export default function AppNavbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);
  return (
    <Navbar color="dark" dark expand="md">
      <NavbarBrand href="/">Auction - Antique Items</NavbarBrand>
      <NavbarToggler onClick={toggle} />
      <Collapse isOpen={isOpen} navbar>
        <Menu />
      </Collapse>
    </Navbar>
  );
}
