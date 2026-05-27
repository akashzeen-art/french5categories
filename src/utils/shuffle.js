/** Fisher–Yates shuffle (new array, does not mutate input). */
export function shuffleArray(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/** Shuffle videos within each category, preserving category groups. */
export function shuffleVideos(videos) {
  const categories = ["cooking", "comedy", "cartoon", "games", "fashion"];
  return categories.flatMap((cat) =>
    shuffleArray(videos.filter((v) => v.category === cat))
  );
}
