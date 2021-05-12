import DashboardLayout from "../components/DashboardLayout";
import React, { useEffect,useContext } from "react";
import { ListItem, List } from "../components/List";
import { useStoreContext } from "../utils/GlobalState";
import { REMOVE_POST, UPDATE_POSTS, LOADING } from "../utils/actions";
import API from "../utils/API";
import DeleteButton from "../components/DeleteButton";
import {UserContext} from "../utils/UserContext";

const ManagePost = () => {
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

    return(
        <DashboardLayout>
            <div>
      <h1>All Blog Posts</h1>
      <h3 className="mb-5 mt-5">Click on a post to view</h3>
      
      {state.posts.length ? (
        <List>
          {state.posts.map(post => (
            <>
            <ListItem 
            id={post._id}
            key={post._id} 
            postTitle= {post.title}
            author= {post.author}
            body= {post.body}
            date= {post.date}> 
            </ListItem>
            {user ? (
                <DeleteButton onClick={() => removePost(post._id)} />
              )
              
              : ("")}
            
            </>
          ))}
        </List>
      ) : (
        <h3>You haven't added any posts yet!</h3>
      )}
    </div>
        </DashboardLayout>
    )
}

export default ManagePost;