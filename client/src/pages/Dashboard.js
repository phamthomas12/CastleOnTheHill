import React, {useEffect, useState} from "react";
import {Container, Header, Button, Grid, Menu, Divider, Label, Image, Icon} from "semantic-ui-react";
import {Link} from "react-router-dom";
import NavBar from "../components/NavBar";
import ProfileTop from "../components/Profile/ProfileTop"
import axios from "axios";
import DashboardLayout from "../components/DashboardLayout";

const Dashboard = () => {
    const [name, setUserName] = useState();
    const [userId, setUserId] = useState();
    const [profilePic, setProfilePic] = useState();
    const [email, setEmail] = useState();
    
    useEffect(() => {
        loadUser();
    }, []);

    const loadUser = () => {
        axios.get("/api/user")
        .then((results) => {
            console.log(results.data);
            setUserName(results.data.name);
            setUserId(results.data._id);
            setProfilePic(results.data.profilePicUrl);
            setEmail(results.data.email);
        })
        .catch((err) => console.log(err));
    }

    return (
          <DashboardLayout>
              <Grid.Row>
                <Header dividing size="huge" as="h1">
                  {name}'s Dashboard
                </Header>
              </Grid.Row>
              <Grid.Row textAlign="center">
                <Grid.Column mobile={8} tablet={4} computer={4}>
                  <Image
                    centered
                    circular
                    size="large"
                    src={profilePic}
                  />
                  <Label basic size="large">
                    Profile Picture
                  </Label>
                </Grid.Column>
                <Grid.Column mobile={8} tablet={4} computer={12}>
                    {/* //User Image */}
                  <Label basic size="large">
                  <Icon name="mail"/>
                    Bio
                  </Label>
                  <p style={{fontSize: "30px"}}>{email}</p>
                </Grid.Column>
                
                
              </Grid.Row>
              <Divider section hidden />
              <Grid.Row>
                <Header dividing size="huge" as="h1">
                  Section title
                </Header>
              </Grid.Row>
              <Grid.Row>
                <p>Social Link</p>
                    
              </Grid.Row> 
            </DashboardLayout>
    )
}

export default Dashboard;