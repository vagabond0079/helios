/* Legend:

BC = Begin Civil Twilight
R = Rise
U = Upper Transit aka Local Apparent noon
S = sunset
EC = End Civil Twilight

*/

var targetData = {
  error: false,
  apiversion: "2.0.0",
  year: 2017,
  month: 5,
  day: 31,
  dayofweek: "Wednesday",
  datechanged: false,
  lon: -122.33,
  lat: 47.6,
  tz: -7,
  sundata: [
    {
      phen: "BC",
      time: "04:37"
    },
    {
      phen: "R",
      time: "05:16"
    },
    {
      phen: "U",
      time: "13:07"
    },
    {
      phen: "S",
      time: "20:59"
    },
    {
      phen: "EC",
      time: "21:38"
    }
  ],
  moondata: [
    {
      phen: "S",
      time: "01:21"
    },
    {
      phen: "R",
      time: "11:56"
    },
    {
      phen: "U",
      time: "19:00"
    }
  ],
  nextmoondata: [
    {
      phen: "S",
      time: "01:53"
    }
  ],
  closestphase: {
    phase: "First Quarter",
    date: "June 1, 2017",
    time: "05:42"
  },
  fracillum: "42%",
  curphase: "Waxing Crescent"
}
