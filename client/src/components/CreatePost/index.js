import React, { useRef } from "react";
import { useStoreContext } from "../../utils/GlobalState";
import { ADD_POST, LOADING } from "../../utils/actions";
import API from "../../utils/API";
import {Container , Header, Form, Button} from "semantic-ui-react";
import 'react-quill/dist/quill.snow.css';




function CreatePostForm() {
  const titleRef = useRef();
  const bodyRef = useRef();
  const authorRef = useRef();
  const [state, dispatch] = useStoreContext();

  const handleSubmit = e => {
    e.preventDefault();
    dispatch({ type: LOADING });
    API.savePost({
      title: titleRef.current.value,
      body: bodyRef.current.editor.getText(),
      author: authorRef.current.value
    })
      .then(result => {
        dispatch({
          type: ADD_POST,
          post: result.data
        });
      })
      .catch(err => console.log(err));
    console.log(titleRef.current.value);
    console.log(bodyRef.current.editor.getText());
    console.log(authorRef.current.value);
    titleRef.current.value = "";
    bodyRef.current.value = "";

  };

  return (
    
    <Container>
     <Header as="h2">Request a Booking Date</Header>
      <Form onSubmit={handleSubmit}>
        <Form.Field>
        <input className="form-control mb-5" required ref={titleRef} placeholder="Date Request" />
        </Form.Field>
        <Form.Field>
        <input className="form-control mb-5" required ref={bodyRef} placeholder="Date Request" />
        </Form.Field>
        <Form.Field>
          <label>Booking Name</label>
        <input  ref={authorRef} placeholder="Booking Name" />
        </Form.Field>
        <Button className="btn btn-success mt-3 mb-5"  type="submit" disabled={state.loading}>
          Request Booking
        </Button>
      </Form>
    </Container>

  );
}

export default CreatePostForm;
