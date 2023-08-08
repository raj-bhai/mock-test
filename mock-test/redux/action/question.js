import axios from "axios";
import url from "../../constants/url";

export const QUESTIONS = "QUESTIONS";

export const getQuestion = () => {
    return dispatch => {
        axios
        .get(`${url.apiRoot}/api/questions`, {
        })
        .then((res) => {
          dispatch({type: QUESTIONS, data: res.data});
        })
        .catch((err) => {
          
        });
    }
}