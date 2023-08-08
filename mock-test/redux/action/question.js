
import axios from 'axios';
import url from '../../constants/url'

export const QUESTIONS = "QUESTIONS"
export const getQuestion = () => {
  return async (dispatch, getState) => {
    const token = await localStorage.getItem('token')
      axios
      .get(`${url.apiRoot}/api/questions`, {
          headers: {
              'Authorization': `${token}` 
          }
      })
      .then((res) => {
          dispatch({ type: QUESTIONS, data: res.data });
      })
      .catch((err) => {
          // Handle error
      });
  }
}