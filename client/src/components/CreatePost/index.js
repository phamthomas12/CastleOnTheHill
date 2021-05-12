import React, { useRef } from "react";
import { useStoreContext } from "../../utils/GlobalState";
import { ADD_POST, LOADING } from "../../utils/actions";
import API from "../../utils/API";
import {Container , Header, Form, Button} from "semantic-ui-react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { QuillFormats, QuillModules } from "../Common/quill";
import DashboardLayout from "../DashboardLayout";



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
    <DashboardLayout>
    <Container>
     <Header as="h2">Create a blog's blog</Header>
      <Form onSubmit={handleSubmit}>
        <Form.Field>
        <label>Post Title</label>
        <input className="form-control mb-5" required ref={titleRef} placeholder="Title" />
        </Form.Field>
       
        <ReactQuill modules={QuillModules}
                    formats={QuillFormats}
                    required 
                    ref={bodyRef} 
                    style={{height:"150px"}}
                    placeholder="Write something amazing..." />

        <Form.Field style={{marginTop: "5rem"}}>
          <label>Posted By</label>
        <input  ref={authorRef} placeholder="Screen name" />
        </Form.Field>
        <Button className="btn btn-success mt-3 mb-5"  type="submit" disabled={state.loading}>
          Save Post
        </Button>
      </Form>
    </Container>
    </DashboardLayout>
  );
}

export default CreatePostForm;
