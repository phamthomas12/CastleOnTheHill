import axios from "axios";
import { GET_PROFILE,
    PROFILE_ERROR,
    UPDATE_PROFILE,
    CLEAR_PROFILE,
    ACCOUNT_DELETED,
    GET_REPOS,
    NO_REPOS} from "./actions";
    import { setAlert } from '../actions/alert';

// Get current users profile
export const getCurrentProfile = () => async (dispatch) => {
    try {
    //   const res = await api.get('/profile/me');
      const res = await axios.get("/api/profile/me")
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
  };

  // Get profile by ID
export const getProfileById = (userId) => async (dispatch) => {
    try {
      const res = await axios.get(`api/profile/user/${userId}`);
  
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
  };
  