import React from "react";
import { AnswerObject } from "../App";
import styles from "./QuestionCard.module.css";

type Props = {
  question: string;
  answers: string[];
  callback: (e: React.MouseEvent<HTMLButtonElement>) => void;
  userAnswer: AnswerObject | undefined;
  questionNr: number;
  totalQuestions: number;
};
// -------------------------------------------------------------------

const QuestionCard = ({
  question,
  answers,
  callback,
  userAnswer,
  questionNr,
  totalQuestions,
}: Props) => {
  return (
    <div className={styles.wrapper}>
      <p className="number">
        Question: {questionNr} / {totalQuestions}
      </p>
      <p
        dangerouslySetInnerHTML={{ __html: question }}
        style={{ maxWidth: "400px", overflowWrap: "break-word" }}
      ></p>
      <div>
        {answers.map((answer) => (
          <div key={answer} className={`${styles.buttonWrapper}`}>
            <button
              className={`${
                userAnswer?.correctAnswer === answer
                  ? styles.correct
                  : userAnswer?.answer === answer
                  ? styles.userClicked
                  : styles.default
              }`}
              disabled={!!userAnswer}
              onClick={callback}
              value={answer}
            >
              <span dangerouslySetInnerHTML={{ __html: answer }}></span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuestionCard;
