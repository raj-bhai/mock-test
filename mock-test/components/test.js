import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import * as answerAction from '../redux/action/answer';
import axios from 'axios'

const Test = ({onReset}) => {
    const dispatch = useDispatch()
    const questions = useSelector(state => state.question.Questions)
    const [selectedIndex, setSelectedIndex] = useState(0)
    const [timeLeft, setTimeLeft] = useState(300); // 5 minutes, in seconds
    const [showPopup, setShowPopup] = useState(false);
    const [score, setScore] = useState()

    const answers = useSelector(state => state.answer.answers); // Select answers from Redux store

    const handleOptionChange = (questionIndex, selectedOption) => {
        dispatch(answerAction.selectAnswer(questionIndex, selectedOption))
    };

    useEffect(() => {
        const timer = setInterval(() => {
            if (timeLeft > 0) {
                setTimeLeft(timeLeft - 1);
            } else {
                handleSubmit()
                clearInterval(timer); // Stop timer when it reaches 0
            }
        }, 1000);

        return () => clearInterval(timer); // Clear the interval when the component unmounts
    }, [timeLeft]);

    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    const handleSubmit = () => {

        const userAnswers = [2, 2, 0, 3, 1];

        axios.post('http://localhost:9000/api/submit', {
            answers: answers
        })
            .then(response => {
                console.log('Score:', response.data.score);
                setScore(response.data.score)
                setShowPopup(true)
            })
            .catch(error => {
                console.error('Error:', error);
            });

    }

    return (
        questions ?
            <div className=" w-[100%] h-[100%] flex " >
                <div className=" w-[50px] h-[100%] border flex flex-col items-center gap-[10px] py-[20px] " >
                    {
                        questions.map((x, index) => {
                            const isAnswered = answers[index];
                            return (
                                <div
                                    key={index}
                                    className={`w-[30px] h-[30px] rounded-[15px] ${selectedIndex === index ? 'bg-[#76D7C4]' : isAnswered ? 'bg-[#F0DB4F]' : 'bg-gray'} flex items-center justify-center text-[#000] cursor-pointer `}
                                    onClick={() => {
                                        setSelectedIndex(index);
                                    }}
                                >
                                    <p>{index + 1}</p>
                                </div>
                            );
                        })
                    }
                </div>
                <div className=" w-full h-[100%] bg-[#E5E7E9] grow " >
                    <div className=" w-full h-[50px] border text-[#000] relative flex justify-between items-center px-[20px] " >
                        <p>Question {selectedIndex + 1}</p>
                        <p>Time Left: {minutes}:{seconds < 10 ? '0' : ''}{seconds}</p>
                        <button className=" absolute right-[200px] bg-[#58D68D] w-[80px] h-[35px] "
                            onClick={() => {
                                // console.log("Answer :", answers)
                                // setShowPopup(true)
                                handleSubmit()
                            }}
                        >
                            Submit
                        </button>
                    </div>
                    <div className=" w-full h-[200px] border border-[#000] text-[#000] px-[10px] " >
                        <p>{questions[selectedIndex].question}</p>
                    </div>
                    <div className="gap-1 flex flex-col"  >
                        {
                            questions[selectedIndex].options.map((x, index) => {
                                return (
                                    <label key={index} className="custom-radio w-full h-[50px] px-[10px] border border-[#000] text-[#000] flex items-center cursor-pointer">
                                        <input
                                            type="radio"
                                            name="option"
                                            className="mr-2"
                                            value={index}
                                            checked={answers[selectedIndex] === index+1}
                                            onChange={() => handleOptionChange(selectedIndex, index +1)}
                                        />
                                        <p>{x}</p>
                                    </label>
                                )
                            })
                        }
                    </div>
                    <div className=" w-full h-[50px] border border-[#000] mt-[100px] flex justify-between items-center px-[20px] " >
                        <button className=" bg-[#5DADE2] w-[100px] h-[40px] text-white " disabled={!selectedIndex}
                            onClick={() => {
                                setSelectedIndex(selectedIndex - 1)
                            }}
                        >
                            Prev
                        </button>
                        <button className=" bg-[#5DADE2] w-[100px] h-[40px] text-white " disabled={(selectedIndex === questions.length - 1) ? true : false}
                            onClick={() => {
                                setSelectedIndex(selectedIndex + 1)
                            }}
                        >
                            Next
                        </button>
                    </div>
                </div>
                {showPopup && (
                    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-opacity-50 bg-black z-50">
                        <div className="bg-white rounded-md p-8 text-[#000]">
                            <h2 className="text-lg font-semibold mb-4">Your answer submitted successfully!</h2>
                            <p>Your score is: {score}</p>
                            <button
                                className="mt-4 bg-[#58D68D] w-[80px] h-[35px] text-white"
                                onClick={() => window.location.reload()}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                )}
            </div> :
            null
    )
}

export default Test