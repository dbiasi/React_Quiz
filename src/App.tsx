import { useState } from "react";
import QuestionCard from "./components/QuestionCard";
import { fetchQuizQuestions } from "./components/API";
import { QuestionState } from "./components/API";
import { GlobalStyle, Wrapper } from "./App.styles";
import ParametersForm from "./components/ParametersForm";

export type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
};

function App() {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);
  const [finish, setFinish] = useState(false);

  // Initializing state for each form field
  const [formData, setFormData] = useState({
    numberOfQuestions: "10",
    category: "",
    difficulty: "",
    type: "multiple",
  });

  const TOTAL_QUESTIONS = parseInt(formData.numberOfQuestions);

  // function to make the api call when the game starts
  const startTrivia = async () => {
    setLoading(true);
    setGameOver(false);
    setFinish(false);

    // fetch the data newQuestion
    const newQuestions = await fetchQuizQuestions(
      formData.numberOfQuestions,
      formData.category,
      formData.difficulty,
      formData.type
    );

    setQuestions(newQuestions);
    setScore(0);
    setUserAnswers([]);
    setNumber(0);
    setLoading(false);

    console.log(newQuestions);
  };

  // function to trigger when the user selects an answer
  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!gameOver) {
      // Users answer
      const answer = e.currentTarget.value;
      // Check answer against correct answer
      const correct = questions[number].correct_answer === answer;
      // Add score if answer is correct
      if (correct) {
        setScore((prev) => prev + 1);
      }

      // Save answeer in the array for user answers
      const answerObject = {
        question: questions[number].question,
        answer: answer,
        correct: correct,
        correctAnswer: questions[number].correct_answer,
      };
      setUserAnswers((prev) => [...prev, answerObject]);
    }
    if (userAnswers.length + 1 === TOTAL_QUESTIONS) {
      setFinish(true);
    }
  };

  // function to trigger when the user clicks next question
  const nextQuestion = () => {
    // Move on to the next question if not the last question
    const nextQuestion = number + 1;
    if (nextQuestion === TOTAL_QUESTIONS) {
      setGameOver(true);
    } else {
      setNumber(nextQuestion);
    }
  };

  const finishGame = () => {
    setGameOver(true);
    setFinish(false);
  };

  return (
    <>
      <GlobalStyle />
      <Wrapper>
        <h1>REACT QUIZ</h1>
        {!gameOver ? <p className="score">Score: {score}</p> : null}
        {gameOver && userAnswers.length !== 0 ? (
          <p style={{ fontSize: "40px" }} className="score">
            Your total Score is: {score} out of {TOTAL_QUESTIONS}
          </p>
        ) : null}
        {loading && <p>Loading Questions ...</p>}
        <div></div>
        {!loading && !gameOver && (
          <QuestionCard
            question={questions[number].question}
            answers={questions[number].answers}
            callback={checkAnswer}
            userAnswer={userAnswers ? userAnswers[number] : undefined}
            questionNr={number + 1}
            totalQuestions={TOTAL_QUESTIONS}
          ></QuestionCard>
        )}
        {!gameOver &&
          !loading &&
          userAnswers.length === number + 1 &&
          number !== TOTAL_QUESTIONS - 1 && (
            <button className="next" onClick={nextQuestion}>
              Next Question
            </button>
          )}
        {finish && userAnswers.length === TOTAL_QUESTIONS ? (
          <button className="start" onClick={finishGame}>
            Finish the Game
          </button>
        ) : null}
        {gameOver ? (
          <div>
            <ParametersForm
              startGame={startTrivia}
              formData={formData}
              setFormData={setFormData}
            ></ParametersForm>
          </div>
        ) : null}
      </Wrapper>
    </>
  );
}

export default App;
