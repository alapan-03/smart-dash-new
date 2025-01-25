import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Leaderboard from './Leaderboard';

function Quiz() {
  const [questions, setQuestions] = useState([]);
  const [assignment, setAssignment] = useState(null); // Store the assignment data separately
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [attemptedQuestions, setAttemptedQuestions] = useState(0);
  const [startTime] = useState(Date.now());
  const [answers, setAnswers] = useState([]);
  const [alreadySubmitted, setAlreadySubmitted] = useState(false);

  const studentId = '66e5d3880b22ee87ceb264d6'; // Dummy student ID

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get('http://localhost:8080/education/getAssignment');
        if (response.status === 200 && response.data.length > 0) {
          setAssignment(response.data[0]); // Store assignment data separately
          setQuestions(response.data[0].questions); // Extract the questions
          console.log(response.data[0]);
        }
      } catch (error) {
        console.error('Error fetching quiz questions', error);
      }
    };

    fetchQuestions();
  }, []);

  const handleAnswerSelection = (answer) => {
    setSelectedAnswer(answer);
  };

  const handleNextQuestion = async () => {
    if (selectedAnswer !== null) {
      const currentQuestion = questions[currentQuestionIndex];
      const isCorrect = selectedAnswer === currentQuestion.options[currentQuestion.correctOptionIndex];

      // Update score and answers array
      if (isCorrect) setScore((prevScore) => prevScore + 1);
      setAnswers((prevAnswers) => [
        ...prevAnswers,
        { questionText: currentQuestion.questionText, selectedOption: selectedAnswer }
      ]);

      setAttemptedQuestions((prevCount) => prevCount + 1);
      setSelectedAnswer(null);

      // Move to the next question or submit quiz if it’s the last question
      const nextQuestionIndex = currentQuestionIndex + 1;
      if (nextQuestionIndex < questions.length) {
        setCurrentQuestionIndex(nextQuestionIndex);
      } else {
        await submitQuiz();
        setShowResult(true);
      }
    } else {
      // Show alert if the user hasn't selected an answer
      if (window.confirm("You haven't selected an answer. Do you want to skip this question?")) {
        setAttemptedQuestions((prevCount) => prevCount + 1);
        const nextQuestionIndex = currentQuestionIndex + 1;
        if (nextQuestionIndex < questions.length) {
          setCurrentQuestionIndex(nextQuestionIndex);
        } else {
          await submitQuiz();
          setShowResult(true);
        }
      }
    }
  };

  const submitQuiz = async () => {
    try {
      const postStudentAssignment = await axios.post('http://localhost:8080/student/submit', {
        assignmentId: assignment._id,
        studentId,
        answers,
        correctAnswers: score,
        startTime
      });
    } catch (error) {
      if (error.response && error.response.status === 409) {
        setAlreadySubmitted(true);
      } else {
        console.error('Error submitting quiz:', error);
        // Show the error to the user
        alert('There was an error submitting the quiz. Please try again.');
      }
    }
  };

  const handleReset = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setAttemptedQuestions(0);
    setAnswers([]);
  };

  if (!assignment) return <div className="loading-spinner">Loading...</div>;

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-800 p-4">
      <h1 className="text-4xl font-bold mb-8 text-gray-300">Assignment - {assignment.title}</h1>
      {showResult ? (
        <>
          <div className="bg-gray-700 p-8 rounded-lg shadow-lg">
            <div className="bg-gray-700 d-flex justify-center">
              <div className="text-2xl font-semibold mb-4">Your Score: {score} / {questions.length}</div>
            </div>
            <p className="mb-4">Questions Attempted: {attemptedQuestions} / {questions.length}</p>
            <button
              onClick={handleReset}
              className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition duration-300"
            >
              Retake Quiz
            </button>
          </div>
          <Leaderboard assignmentId={assignment._id} />
        </>
      ) : (
        <div className="bg-gray-700 p-8 rounded-lg shadow-lg w-full max-w-lg flex flex-col items-center">
          <div className="border-2 p-5 text-gray-300 rounded-[30px] max-w-[80%] text-xl font-semibold mb-6 flex justify-center">{questions[currentQuestionIndex]?.questionText}</div>

          <ul className="space-y-4">
            <div className='flex justify-center flex-wrap min-w-[90%]'>
              {questions[currentQuestionIndex]?.options.map((option, index) => (
                <li className='m-2 flex-wrap' key={index}>
                  <button
                    onClick={() => handleAnswerSelection(option)}
                    className={`min-w-52 max-w-56 px-4 py-2 rounded-lg ${selectedAnswer === option ? 'bg-gray-300' : 'bg-gray-500'} text-white hover:bg-gray-600 transition duration-300`}
                  >
                    {option}
                  </button>
                </li>
              ))}
            </div></ul>
          <div className="flex justify-center items-center mt-4">
            <button
              onClick={handleNextQuestion}
              className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-500 transition duration-300"
            >
              Next
            </button>
          </div>
        </div>
      )}
      {alreadySubmitted ? <p>Assignment already submitted</p> : null}
      {!showResult ? <p className="text-gray-200 text-lg mt-5">Questions Attempted: {attemptedQuestions} / {questions.length}</p> : null}
    </div>
  );
}

export default Quiz;