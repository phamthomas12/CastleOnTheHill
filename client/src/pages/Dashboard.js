import React, {useEffect, useState} from "react";
import {Container, Header, Button, Grid, Menu, Divider, Label, Image, Icon} from "semantic-ui-react";
import {Link} from "react-router-dom";
import NavBar from "../components/NavBar";
import ProfileTop from "../components/Profile/ProfileTop"
import axios from "axios";
import DashboardLayout from "../components/DashboardLayout";
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption
} from 'reactstrap';
import mainimg from "../assets/images/main1.jpg";
import kitchen from "../assets/images/kitchen.jpg";
import backyard from "../assets/images/backyard.jpg";
import green from "../assets/images/green.jpg";

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
    const items = [
      {
        src: mainimg,
        altText: 'Front View',
        
      },
      {
        src: kitchen,
        altText: 'Kitchen View',
  
      },
      {
        src: backyard,
        altText: 'Backyard View',
  
      },
      {
        src: green,
        altText: 'Golf View',
  
      }
    ];
    const [activeIndex, setActiveIndex] = useState(0);
    const [animating, setAnimating] = useState(false);
  
    const next = () => {
      if (animating) return;
      const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
      setActiveIndex(nextIndex);
    }
  
    const previous = () => {
      if (animating) return;
      const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
      setActiveIndex(nextIndex);
    }
  
    const goToIndex = (newIndex) => {
      if (animating) return;
      setActiveIndex(newIndex);
    }
  
    const slides = items.map((item) => {
      return (
        <CarouselItem
          onExiting={() => setAnimating(true)}
          onExited={() => setAnimating(false)}
          key={item.src}
        >
          <img src={item.src} alt={item.altText} />
          <CarouselCaption captionText={item.caption} captionHeader={item.caption} />
        </CarouselItem>
      );
    });

    return (
          <DashboardLayout>
                      <Carousel
      activeIndex={activeIndex}
      next={next}
      previous={previous}
    >
      <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={goToIndex} />
      {slides}
      <CarouselControl direction="prev" directionText="Previous" onClickHandler={previous} />
      <CarouselControl direction="next" directionText="Next" onClickHandler={next} />
    </Carousel>
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