// pages/index.js
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchQuestions, submitAnswer, decrementTimer } from '../quizSlice';

const HomePage = () => {
  const dispatch = useDispatch();
  const questions = useSelector((state) => state.quiz.questions);
  const timer = useSelector((state) => state.quiz.timer);
  const [currentIndex, setCurrentIndex] = React.useState(0);

  useEffect(() => {
    // Example fetching from local slice
    dispatch(fetchQuestions([
      //... as before
    ]));

    const interval = setInterval(() => {
      dispatch(decrementTimer());
      if (timer <= 0) {
        clearInterval(interval);
        // handle auto submission
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [dispatch, timer]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-xl font-bold mb-4">{questions[currentIndex]?.question}</h2>
        {questions[currentIndex]?.options.map((option, index) => (
          <button 
            key={index} 
            className="w-full bg-blue-500 text-white p-2 rounded mt-2 hover:bg-blue-600"
            onClick={() => {
              dispatch(submitAnswer({ questionId: currentIndex, answer: index }));
              setCurrentIndex(currentIndex + 1);
            }}
          >
            {option}
          </button>
        ))}
        <p className="mt-4 text-gray-600">Time left: {timer} seconds</p>
      </div>
    </div>
  );
};

export default HomePage;
