import React, { useEffect } from "react";
import API from "../utils/API";
import { useStoreContext } from "../utils/GlobalState";
import { SET_CURRENT_POST, ADD_FAVORITE, REMOVE_FAVORITE } from "../utils/actions";
import {Container, Header , Popup, Icon, Grid, Image} from "semantic-ui-react";

const Detail = props => {
  const [state, dispatch] = useStoreContext();

  useEffect(() => {
    API.getPost(props.match.params.id)
      .then(res => dispatch({ type: SET_CURRENT_POST, post: res.data }))
      .catch(err => console.log(err));
  }, []);

  const addFavorite = () => {
    dispatch({
      type: ADD_FAVORITE,
      post: state.currentPost
    });
  };

  const removeFavorite = () => {
    dispatch({
      type: REMOVE_FAVORITE,
      _id: state.currentPost._id
    });
  };

  return (
    <>{state.currentPost ? (
      
     
        <Container text style={{ marginTop: '7em' }}>
          <Grid celled='internally'>
            <Grid.Row>
              <Grid.Column width={13} >
        <Header as='h1'>{state.currentPost.title}</Header>
        <h5 style={{color: "grey"}}>by {state.currentPost.author} </h5>
        <p>{state.currentPost.body}</p>
        </Grid.Column>
        <Grid.Column width={3}>
        {state.favorites.indexOf(state.currentPost) !== -1 ? (
          <Popup
          content="Remove from your Favorite"
          trigger={
          <Icon
           name="heart" color="grey" size="large" circular 
          position="top right"
          style={{ cursor: "pointer" }}
          onClick={removeFavorite}
          />}
        /> 
        ) : (
          <Popup
          content="Add to your Favorite"
          trigger={
          <Icon
          name="heart" color="red" size="large" circular 
         alt="Remove from your Favorite"
         position="top right"
         style={{ cursor: "pointer" }}
         onClick={addFavorite} 
         />}
         /> 
        )}
        </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
      
    
    ) : (
      <div>loading...</div>
    )}</>
  );
};

export default Detail;
