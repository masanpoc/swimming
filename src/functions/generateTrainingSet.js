function calculateSet(each, total) {
  return total / each;
}

export default function generateTrainingSet(meters) {
  let sets = [50, 100, 150, 200, 250, 300, 400];
  sets = sets.filter((el) => el <= meters);
  if (meters < 100 || meters % 50 != 0) {
    sets.push(25);
  }
  let possibleSets = sets.reduce(function (list, each) {
    if (meters % each == 0) {
      let set = calculateSet(each, meters);
      list.push(`${set}x${each}`);
    }
    return list;
  }, []);
  return possibleSets[Math.floor(Math.random() * possibleSets.length)];
}
