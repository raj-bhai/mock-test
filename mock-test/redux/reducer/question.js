import {QUESTIONS} from '../action/question';


const initialState = {
    Questions: null,
};

export default(state = initialState, action) => {
    switch (action.type){
        case QUESTIONS:
            return{
                ...state,
                Questions: action.data,
            };
           }
    return state;
}