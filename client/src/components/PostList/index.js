import React, { useEffect,useContext } from "react";
import { ListItem, List } from "../List";
import { useStoreContext } from "../../utils/GlobalState";
import { REMOVE_POST, UPDATE_POSTS, LOADING } from "../../utils/actions";
import API from "../../utils/API";
import DeleteButton from "../DeleteButton";
import {UserContext} from "../../utils/UserContext";

function PostsList() {
  const [state, dispatch] = useStoreContext();
  const [user, setUser] = useContext(UserContext);

  const removePost = id => {
    API.deletePost(id)
      .then(() => {
        dispatch({
          type: REMOVE_POST,
          _id: id
        });
      })
      .catch(err => console.log(err));
  };

  const updatePost = id => {
    API.updatePost(id)
      .then(() => {
        dispatch({
          type: UPDATE_POSTS,
          _id: id
        })
      })
      .catch(err => console.log(err));
  }

  const getPosts = () => {
    dispatch({ type: LOADING });
    API.getPosts()
      .then(results => {
        dispatch({
          type: UPDATE_POSTS,
          posts: results.data
        });
      })
      .catch(err => console.log(err));
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div>
      <h1>Dates Requested</h1>
      
      {state.posts.length ? (
        <List>
          {state.posts.map(post => (
            <>
            <ListItem 
            id={post._id}
            key={post._id} 
            postTitle= {post.title}
            author= {post.author}
            body= {post.body}> 
            </ListItem>
            </>
          ))}
        </List>
      ) : (
        <h3>No Booking Requests Yet, Be The First</h3>
      )}
    </div>
  );
}

export default PostsList;