import { useCallback, useEffect, useState } from "react";
import isEmpty from "../functions/checkEmpty";
import ReactLoading from "react-loading";

export default function LeaderBoard(id) {
  const [leaderboard, setLeaderBoard] = useState();

  const makeReq = useCallback(async () => {
    const token = sessionStorage.getItem("token");
    const req = await fetch(
      `https://alihan-myproject.azurewebsites.net/api/v1/app/tournament/tourney/leaderboard/${id.id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const res = await req.json();
    setLeaderBoard(res);
  }, []);

  useEffect(() => {
    try {
      makeReq();
    } catch (err) {
      console.log(err);
    }
  }, [makeReq]);

  // let leaders;
  // let others;

  if (!isEmpty(leaderboard)) {
    if (leaderboard.length >= 3) {
      const leaders = leaderboard.slice(0, 3);
      const others = leaderboard.slice(3);
      return (
        <div className="LeaderBoard">
          <div className="leaderBoardTitle">Leaderboard</div>
          <div className="leaders">
            <div className="secondPlace">
              <div className="leadersImg">
                <img src={require("../logos/second.png")} alt="2place" />
              </div>
              <div className="leaderDescr">
                <div className="leaderName">
                  {leaders[1].name} {leaders[1].surname}
                </div>
                <div className="leaderScore">Score: {leaders[1].score}</div>
              </div>
            </div>
            <div className="fisrtPlace">
              <div className="leadersImg">
                <img src={require("../logos/first.png")} alt="1place" />
              </div>
              <div className="leaderDescr">
                <div className="leaderName">
                  {leaders[0].name} {leaders[0].surname}
                </div>
                <div className="leaderScore">Score: {leaders[0].score}</div>
              </div>
            </div>
            <div className="thirdPlace">
              <div className="leadersImg">
                <img src={require("../logos/third.png")} alt="3place" />
              </div>
              <div className="leaderDescr">
                <div className="leaderName">
                  {leaders[2].name} {leaders[2].surname}
                </div>
                <div className="leaderScore">Score: {leaders[2].score}</div>
              </div>
            </div>
          </div>
          {others.map((elem, index) => {
            if (elem) {
              return (
                <div className="leaderboardElem" key={elem.name}>
                  <div className="leaderboardElemName">
                    {index + 4} Name: {elem.name} {elem.surname}
                  </div>
                  <div className="score"> Score: {elem.score}</div>
                </div>
              );
            }
          })}
        </div>
      );
    }
    return (
      <div className="LeaderBoard">
        <div className="leaderBoardTitle">Leaderboard</div>
        <div className="leaders">
          <div className="secondPlace">
            <div className="leadersImg">
              <img src={require("../logos/second.png")} alt="2place" />
            </div>
            <div className="leaderDescr">
              <div className="leaderName">
                {leaderboard[1].name}
                {leaderboard[1].surname}
              </div>
              <div className="leaderScore">Score: {leaderboard[1].score}</div>
            </div>
          </div>
          <div className="fisrtPlace">
            <div className="leadersImg">
              <img src={require("../logos/first.png")} alt="1place" />
            </div>
            <div className="leaderDescr">
              <div className="leaderName">
                {leaderboard[0].name}
                {leaderboard[0].surname}
              </div>
              <div className="leaderScore">Score: {leaderboard[0].score}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return <ReactLoading color={"orange"} className="center" />;
}
