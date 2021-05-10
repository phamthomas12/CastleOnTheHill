import React from "react";
import { NavLink, Link } from "react-router-dom";
import { NavItem } from "reactstrap";
import "./style.css";

function Nav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary" id="topbar">
      <a className="navbar-brand" href="/">
        Castle On The Hill
      </a>
      <NavItem>
        <NavLink tag={Link} to="/signin">Sign In</NavLink>
      </NavItem>

      <NavItem>
        <NavLink tag={Link} to="/signup">Sign Up</NavLink>
      </NavItem>
      
    </nav>
  );
}

export default Nav;
