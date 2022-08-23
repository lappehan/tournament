import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import isEmpty from "../functions/checkEmpty";
import doWeHaveToken from "../functions/checkIfAutorized";
import Header from "../pageElements/header";
import ReactLoading from "react-loading";
import JoinTourney from "../buttons/joinTournament";
import StartButton from "../buttons/startButton";
import AlertMessage from "../functions/alert";
import Footer from "../pageElements/footer";

async function tournamentDetails(id) {
  const token = sessionStorage.getItem("token");
  if (!token) {
    AlertMessage("You must be authorized", "error");
  }
  try {
    const req = await fetch(
      `https://alihan-myproject.azurewebsites.net/api/v1/app/tournament/tourney/id/${id}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );
    const res = await req.json();
    return res;
  } catch (err) {
    AlertMessage("myMessage", "success");
  }
}

export default function TournamentPage() {
  const { id } = useParams();
  const [tournamentTable, setTable] = useState([]);

  const getTournament = useCallback(async () => {
    try {
      const data = await tournamentDetails(id);
      setTable(data);
    } catch {
      console.log("error");
    }
  }, [id]);

  useEffect(() => {
    try {
      getTournament();
    } catch {
      console.log("error");
    }
  }, [getTournament]);

  if (doWeHaveToken() && !isEmpty(tournamentTable)) {
    return (
      <div className="tournamentPage">
        <Header />
        <div className="participantsInfo">
          <div className="mainPageTitle">
            <h2>TOURNAMENT</h2>
          </div>

          <div className="participantsElemets">
            <div className="tournayName">
              {tournamentTable.name} ({tournamentTable.type})
            </div>

            <JoinTourney id={tournamentTable.id} />

            <div className="participantsElemetsDiv">
              <div className="participantsInfoDescr">
                <div className="participantsListTtile">
                  Tournament Desctiption
                </div>
                {tournamentTable.description}
              </div>
              <div className="participantsList">
                <div className="participantsListTtile">Participants</div>
                {tournamentTable.list.map((elem) => {
                  return (
                    <div
                      key={elem.login}
                      className="participant"
                    >{`${elem.lastName} ${elem.firstName} (${elem.major})`}</div>
                  );
                })}
              </div>
            </div>
            <StartButton id={id} />
          </div>
        </div>
        <Footer />
      </div>
    );
  }
  return (
    <div className="tournamentPage">
      <Header />
      <ReactLoading color={"orange"} className="center" />
      <Footer />
    </div>
  );
}
