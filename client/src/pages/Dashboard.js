import React, {useEffect, useState} from "react";
import {Container, Header, Button, Grid, Menu, Divider, Label, Image, Icon} from "semantic-ui-react";
import {Link} from "react-router-dom";
import NavBar from "../components/NavBar";
import ProfileTop from "../components/Profile/ProfileTop"
import axios from "axios";
import API from "../utils/API";
import DashboardLayout from "../components/DashboardLayout";
import { Input, TextArea, FormBtn } from "../components/Form";
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
    const [books, setBooks] = useState([])
    const [formObject, setFormObject] = useState({})
  
    // Loads all bookings and sets them to books
    function loadBooks() {
      API.getBooks()
        .then(res => 
          setBooks(res.data)
        )
        .catch(err => console.log(err));
    };
  
    // Deletes a booking from the database with a given id, then reloads books from the db
    function deleteBook(id) {
      API.deleteBook(id)
        .then(res => loadBooks())
        .catch(err => console.log(err));
    }
  
    // Handles updating component state when the user types into the input field
    function handleInputChange(event) {
      const { name, value } = event.target;
      setFormObject({...formObject, [name]: value})
    };
  
    // When the form is submitted, use the API.saveBook method to save the booking data
    // Then reload bookings from the database
    function handleFormSubmit(event) {
      event.preventDefault();
      if (formObject.title && formObject.author) {
        API.saveBook({
          title: formObject.title,
          author: formObject.author,
          synopsis: formObject.synopsis
        })
          .then(res => loadBooks())
          .catch(err => console.log(err));
      }
    };
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
              <form>
              <Input
                onChange={handleInputChange}
                name="title"
                placeholder="Booking Name (Required)"
              />
              <Input
                onChange={handleInputChange}
                name="author"
                placeholder="How Many People? (Required)"
              />
              <TextArea
                onChange={handleInputChange}
                name="synopsis"
                placeholder="Dates Choosen (e.g. 01/01/2021-07/08/2021)"
              />
              <FormBtn
                disabled={!(formObject.author && formObject.title)}
                onClick={handleFormSubmit}
              >
                Submit Booking
              </FormBtn>
            </form> 
              </Grid.Row>
              <Divider section hidden />
              <Grid.Row>
                <Header dividing size="huge" as="h1">
                  Booking Request
                </Header>
              </Grid.Row>
            </DashboardLayout>
    )
}

export default Dashboard;