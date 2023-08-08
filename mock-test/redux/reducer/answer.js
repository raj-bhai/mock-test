import { SELECT_ANSWER } from '../action/answer';

const initialState = {
  answers: [0,0,0,0,0]
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SELECT_ANSWER:
      const newAnswers = [...state.answers];
      newAnswers[action.payload.questionIndex] = action.payload.selectedOption;
      return {
        ...state,
        answers: newAnswers
      };

    default:
      return state;
  }
};

export default reducer;
