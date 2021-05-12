import React from "react";
import {
    Button,
    Container,
    Header,
    Message
  } from "semantic-ui-react";
  import House from "../../assets/images/main.jpg";
import "./style.css";



function HeaderImage() {
    return (
		<Message size="massive" style={{ position: "relative", overflow: "hidden", 
		backgroundColor: "black"}}>
			<img src = {House}></img>
          <Container style={{marginBottom: "6rem",marginTop: "5rem"}}>
            <Header size="huge" as="h1" inverted >
              Castle On The Hill
            </Header>
            <p style={{color: "#ffffff"}}>
            
              Come and Book the Phamily House
            </p>
            <Button size="large" primary >
             Login to create post &raquo;
            </Button>
          </Container>
		  
        </Message>
	); 
    }
export default HeaderImage;