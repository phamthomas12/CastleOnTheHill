import React, {useState, useContext} from "react";
import {
    Container,
    Icon,
    Menu,
    Grid,
    Button
} from "semantic-ui-react";
import {Link} from "react-router-dom";
import "./style.css";
import axios from "axios";
import {UserContext} from "../../utils/UserContext";

// class NavBar extends Component {
function NavBar() {

    const [dropdownMenuStyle, setDropMenuStyle] = useState({display: "none"});
    const [user, setUser] = useContext(UserContext);

    const handleToggleDropdownMenu = () => { // let newState = Object.assign({}, this.state);
        if (dropdownMenuStyle.display === "none") {
            setDropMenuStyle({display: "flex"});
        } else {
            setDropMenuStyle({display: "none"});
        }

        // this.setState(newState);
    };
    const renderLoggin = () => {
        return (
            <>
                <Button as="a" inverted
                    style={
                        {marginLeft: "0.5em"}
                }>
                    <Link to="/signup">Sign Up</Link>
                </Button>
            </>
        )
    }

    const renderLogout = () => {
      return (
        
        <Button inverted
            style={
            {marginLeft: "0.5em"}}>
            <a onClick={handleSignOut}>Sign Out</a>
        </Button>
      )
    }
    const handleSignOut = () => {
        axios.get("/api/user/logout").then(res => {
            console.log(res);
            setUser(null);
            window.location = "/";
        })
    }

    return (

        <React.Fragment>
            <Grid padded className="tablet computer only">
                <Container>
                    <Menu borderless inverted fluid fixed="top">
                        <Menu.Item header as="a">
                            Castle On The Hill
                        </Menu.Item>

                        <Menu.Item as="a">
                            <Link to="/home">Home</Link>
                        </Menu.Item>
                        {/* <Menu.Item as="a">Post</Menu.Item> */}
                        <Menu.Item >
                            <Link to="/dashboard">Dashboard</Link>
                        </Menu.Item>

                        <Menu.Item position="right">
                          {/* {console.log("user: ", `${user.name}`)} */}
                      {user ? renderLogout() : renderLoggin()}

                        </Menu.Item>
                    </Menu>
                </Container>
            </Grid>
            <Grid className="mobile only">
                <Menu inverted borderless fluid size="huge" fixed="top">
                    <Menu.Item header as="a">
                        Project Name
                    </Menu.Item>
                    <Menu.Menu position="right">
                        <Menu.Item>
                            <Button icon basic inverted toggle
                                onClick={handleToggleDropdownMenu}>
                                <Icon name="content"/>
                            </Button>
                        </Menu.Item>
                    </Menu.Menu>
                    <Menu vertical borderless inverted fluid
                        style={dropdownMenuStyle}>
                        <Menu.Item active as="a">
                            Home
                        </Menu.Item>
                        <Menu.Item as="a">About</Menu.Item>
                        <Menu.Item as="a">Contact</Menu.Item>
                        <Menu.Item as="a">Login</Menu.Item>
                        <Menu.Item as="a">SignUp</Menu.Item>

                    </Menu>


                </Menu>
            </Grid>
        </React.Fragment>
    )

}

export default NavBar;
