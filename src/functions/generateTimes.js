import formatPace from "./formatPace";

function randomValue(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function conditionalFormat(toFormat) {
  if (toFormat > 59) {
    return formatPace(toFormat);
  } else {
    return toFormat + "s";
  }
}

function selectAtTiming(pace, meters) {
  const intervals = {
    50: [5, 10],
    100: [5, 10, 15, 20],
    200: [10, 15, 20, 25, 30],
  };
  function generateByMeters(pace, meters) {
    let atTiming;
    if (meters == 50) {
      atTiming = round5(pace / 2);
    }
    if (meters == 100) {
      atTiming = pace;
    }
    if (meters == 200) {
      atTiming = pace * 2;
    }
    let toAdd = randomValue(intervals[meters]);
    // there was a bug related to types so we are making sure both are nums when adding (apparently pace is string)
    atTiming = Number(atTiming) + Number(toAdd);
    // console.log(atTiming, 'atTiming', pace, meters, intervals[meters], toAdd)
    return atTiming;
  }
  let atTimingGenerated = generateByMeters(pace, meters);
  return atTimingGenerated;
}

function round5(x) {
  return Math.ceil(x / 5) * 5;
}

function selectOnLessTiming(pace, meters) {
  const intervals = {
    50: [[round5(pace / 2), " resting 15s"]],
    100: [
      [pace, " resting 15s"],
      [pace + 5, " resting 20s"],
    ],
    200: [
      [pace * 2 + 10, " resting 40s"],
      [pace * 2 + 15, " resting 30s"],
      [pace * 2 + 20, " resting 20s"],
    ],
  };
  function generateTimingOnLessByMeters(meters) {
    let onTimingArr = randomValue(intervals[meters]);
    let onTiming = conditionalFormat(onTimingArr[0]) + onTimingArr[1];
    // console.log(onTimingArr, onTiming, 'ontimingonlessthan')
    return onTiming;
  }
  let onLessTimingGenerated = generateTimingOnLessByMeters(meters);
  return onLessTimingGenerated;
}

function selectRestTiming(meters) {
  const intervals = {
    25: [5, 10, 15],
    50: [5, 10, 15],
    100: [5, 10, 15, 20],
    150: [10, 15, 20],
    200: [10, 15, 20, 25],
    250: [15, 20, 25, 30],
    300: [20, 25, 30, 35],
    400: [30, 35, 40, 45],
  };
  function generateTimingRestByMeters(meters) {
    let restTiming = randomValue(intervals[meters]);
    return restTiming;
  }
  let restTimingGenerated = generateTimingRestByMeters(meters);
  return restTimingGenerated;
}

export default function generateTimes(pace, meters, style) {
  if (
    style == "freestyle" &&
    (meters == 50 || meters == 100 || meters == 200)
  ) {
    // either 50/100/200 freestyle
    // two types of timing: 'on less than 1:20 resting 20s' || 'at 1:40' (50% probability)
    if (Math.random() > 0.5) {
      // timing on less than
      let timing = "on less than " + selectOnLessTiming(Number(pace), meters);
      return timing;
    } else {
      // timing at
      let timing =
        "at " + conditionalFormat(selectAtTiming(Number(pace), meters));

      // console.log('generated timing', timing, 'before formatting: ', selectAtTiming(pace, meters));
      return timing;
    }
  } else {
    // either breaststroke, backstroke, butterfly or medley or 150m freestyle/300freestyle/400freestyle...
    // only one type of timing: 'resting 10s'
    let timing = "resting " + selectRestTiming(meters) + "s";
    return timing;
  }
}
