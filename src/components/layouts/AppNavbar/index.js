import React from "react";
import { Navbar, NavbarBrand } from "reactstrap";
import Menu from "../Menu";

export default function AppNavbar() {
  return (
    <Navbar color="dark" dark expand="sm">
      <NavbarBrand href="/">Auction - Antique Items</NavbarBrand>
      <Menu />
    </Navbar>
  );
}
