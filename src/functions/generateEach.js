import possibleEachList from "../lists/possibleEachList";

function randomValue(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

export default function generateEach(meters, exs) {
  // console.log(meters, 'meters', exs, 'num exs')
  // console.log(possibleEachList[meters][exs], 'each possible lists for those meters')
  let eachArr;
  if (possibleEachList[meters][exs]) {
    let possibleEachListSelected = randomValue(possibleEachList[meters][exs]);
    eachArr = possibleEachListSelected;
    // eachArr = shuffle(...possibleEachListSelected)
    // console.log('selected and shuffled', eachArr)
  } else {
    // console.log('error, not found list of each')
  }
  return eachArr;
}
