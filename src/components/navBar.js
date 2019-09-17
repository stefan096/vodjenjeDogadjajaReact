import React from 'react';
import { Collapse, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';

export default class NavBar extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false
        };
        this.toggle = this.toggle.bind(this);
      }
    
      toggle() {
        this.setState({
          isOpen: !this.state.isOpen
        });
      }
    
      render() {
        return <Navbar color="dark" className="colorNavBar" dark expand="md">
          <NavbarBrand tag={Link} to="/">Home</NavbarBrand>
          <NavbarBrand tag={Link} to="/groups">Prikaz Grupa</NavbarBrand>
          <NavbarBrand tag={Link} to="/groups/new">Dodaj Grupu</NavbarBrand>
          <NavbarBrand tag={Link} to="/primer">Primer</NavbarBrand>
    
          <NavbarToggler onClick={this.toggle}/>
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink
                  href="https://twitter.com/oktadev">@oktadev</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="https://github.com/oktadeveloper/okta-spring-boot-react-crud-example">GitHub</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>;
      }
}