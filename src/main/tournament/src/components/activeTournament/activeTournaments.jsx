import { useCallback, useEffect, useState } from 'react';
import isEmpty from '../functions/checkEmpty';
import deleteTournament from '../buttons/deleteTournament';

async function tournamentList() {
  try {
    const req = await fetch(
      'https://alihan-myproject.azurewebsites.net/api/v1/app/tournament/tourney/started',
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          // "Access-Control-Allow-Origin": "*",
          // Authorization: `Bearer ${token}`,
        },
      }
    );
    const res = await req.json();
    if (req.status !== 200) {
      return {};
    }
    return res;
  } catch (error) {
    console.log(error);
  }
}

export default function ActiveTournaments() {
  const [isTournament, setisTournament] = useState(false);
  const [tournament, setTournament] = useState([]);

  const showTournament = useCallback(async () => {
    const tournamentInfo = await tournamentList();
    if (isEmpty(tournamentInfo)) {
      setisTournament(false);
    } else {
      setTournament(tournamentInfo);
      setisTournament(true);
    }
  }, []);

  useEffect(() => {
    try {
      showTournament();
    } catch (error) {
      setTournament([]);
    }
  }, [showTournament]);

  let tournamentImg = 'default';
  const isAdmin =
    sessionStorage.getItem('role') === 'ROLE_ADMIN' ? true : false;

  if (isTournament) {
    return (
      <div className="tournamentList">
        {tournament.map((elem, index) => {
          let divClass;
          if (elem.adminOwner) {
            divClass = 'tournamentInfo super';
          } else {
            divClass = 'tournamentInfo';
          }
          if (
            elem.type === 'UFC' ||
            elem.type === 'MortalKombat' ||
            elem.type === 'Tennis' ||
            elem.type === 'Fifa'
          ) {
            tournamentImg = elem.type;
          } else {
            tournamentImg = 'default';
          }
          return (
            <div className={divClass} key={`${elem.name}=${index}`}>
              <div className="tournamentImg">
                <img
                  src={`logos/${tournamentImg}.jpg`}
                  alt="tournamentImg"
                  width={200}
                  height={100}
                />
              </div>
              <div className="tournamentName">{elem.name}</div>
              <div className="tournamentGame">{elem.type}</div>
              <div className="tournamentDescription">{elem.description}</div>
              <div className="tournamentPlayers">
                <img src={`logos/gamePad.png`} width={25} alt="Players" />{' '}
                {elem.participants}
              </div>
              <div className="viewTournaments">
                <a href={`/active/${elem.id}`}>View</a>
              </div>
              {isAdmin && (
                <button
                  className="deleteTournament"
                  onClick={() => {
                    deleteTournament(elem.id);
                  }}
                >
                  ❌
                </button>
              )}
            </div>
          );
        })}
      </div>
    );
  }

  return <div className="tournamentInfo">No active tournaments</div>;
}
