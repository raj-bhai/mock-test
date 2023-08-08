import {combineReducers} from 'redux';
import question from './question';
import answer from './answer';


const rootReducer = combineReducers({
    question: question,
    answer: answer
});

export default rootReducer;