
// gets matches from TBA and returns a list of matches and match data for each
export const pullMatches = (eventKey) => {
    return fetch(`https://www.thebluealliance.com/api/v3/event/${eventKey}/matches/simple`, {headers: {"X-TBA-Auth-Key": "v62ZvFvAkyWVH1qwd1m8Kyyhll0VEvyxUGo7pqpM1re827yjVZlgtjdpBEQJNcn2"}})
      .then((response) => response.json())
      .then((res) => {
        let matches = [];
        if (res["Errors"] == null) {
          res = res.sort(function(a,b) {
            return a.match_number - b.match_number
          })
          for (var match in res) {
            let rawMatchData = res[match]
            if (rawMatchData.comp_level != "qm") continue;
            let matchData = {team: rawMatchData.alliances.red.team_keys[2].replace("frc", ""), matchNo: rawMatchData.key.replace(`${eventKey}_`, "").replace("m", "").toUpperCase(), scouted: false, scouter: ""};
            matches.push(matchData);
          }
          return matches;
        }
      })
      .catch((error) =>{
        console.error(error);
      });
}
