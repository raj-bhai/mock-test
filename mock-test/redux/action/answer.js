export const SELECT_ANSWER = 'SELECT_ANSWER';

export const selectAnswer = (questionIndex, selectedOption) => {
  return {
    type: SELECT_ANSWER,
    payload: { questionIndex, selectedOption }
  };
};
