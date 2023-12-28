export function sortedLeaderboard(quizLeaderboard: any) {
  const leaderboard = quizLeaderboard;
  leaderboard.sort((a: any, b: any) => {
    if (a.numOfCorrectAnswers > b.numOfCorrectAnswers) {
      return -1;
    }
    if (a.numOfCorrectAnswers < b.numOfCorrectAnswers) {
      return 1;
    }
    if (a.timeTakenInSeconds < b.timeTakenInSeconds) {
      return -1;
    }
    if (a.timeTakenInSeconds > b.timeTakenInSeconds) {
      return 1;
    }
    return 0;
  });
  return leaderboard;
}
