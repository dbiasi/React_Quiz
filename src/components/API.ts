// Category

import { shuffleArray } from "./utils";

export type Question = {
  type: string;
  difficulty: string;
  category: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
};

export type QuestionState = Question & { answers: string[] };

export const fetchQuizQuestions = async (
  amount: string,
  category: string,
  difficulty: string,
  typeQuestion: string
) => {
  // Construct the API URL with the parameters
  const apiUrl = `https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=${typeQuestion}`;
  const data = await (await fetch(apiUrl)).json();
  return data.results.map((question: Question) => ({
    ...question,
    answers: shuffleArray([
      ...question.incorrect_answers,
      question.correct_answer,
    ]),
  }));
};

// export async function fetchDataFromApi(
//   amount: number,
//   difficulty: Difficulty,
//   typeQuestion: TypeQuestion
// ): Promise<any> {
//   // Construct the API URL with the parameters
//   const apiUrl = `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=${typeQuestion}`;

//   try {
//     // Use the Fetch API to make the request
//     const response = await fetch(apiUrl);

//     // Check if the request was successful
//     if (!response.ok) {
//       throw new Error(`API call failed: ${response.status}`);
//     }

//     // Parse the JSON response
//     const data = await response.json();

//     // Return the parsed data
//     return data;
//   } catch (error) {
//     // Handle or throw the error
//     console.error("Fetch error:", error);
//     throw error;
//   }
// }
