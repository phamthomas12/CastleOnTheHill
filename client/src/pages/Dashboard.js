import React, {useEffect, useState} from "react";
import {Header, Button, Grid, Menu, Divider, Label, Image, Icon} from "semantic-ui-react";
import {Link} from "react-router-dom";
import NavBar from "../components/NavBar";
import ProfileTop from "../components/Profile/ProfileTop"
import axios from "axios";
import API from "../utils/API";
import DashboardLayout from "../components/DashboardLayout";
import { Input, TextArea, FormBtn } from "../components/Form";
import { Col, Row, Container } from "../components/Grid";
import DeleteBtn from "../components/DeleteButton";
import CreatePost from "../components/CreatePost";
import PostsList from "../components/PostList";
import { List, ListItem } from "../components/List";
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
      <Container fluid>
      <Row>
        <Col size="md-5">
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
        <CreatePost></CreatePost>
            </Col>
        <Col size= "md-5" >
        <PostsList />
        </Col>
        </Row>
      </Container>
    )
}

export default Dashboard;