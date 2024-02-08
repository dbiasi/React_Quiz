export function shuffleArray<T>(array: T[]): T[] {
  // Clone the array to avoid mutating the original array
  let shuffledArray = [...array];

  for (let i = shuffledArray.length - 1; i > 0; i--) {
    // Pick a random index from 0 to i
    const j = Math.floor(Math.random() * (i + 1));

    // Swap elements at indices i and j
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }

  return shuffledArray;
}
