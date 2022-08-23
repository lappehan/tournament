import AlertMessage from '../functions/alert';

async function deletePlayer(player_name, player_lastname, tournament_id) {
  try {
    const token = sessionStorage.getItem('token');
    const values = {
      player_name: player_name,
      player_lastname: player_lastname,
      tournament_id: tournament_id,
    };
    const req = await fetch(
      `https://alihan-myproject.azurewebsites.net/api/v1/app/admin/delete-player`,
      {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(values, null, 2),
      }
    );
    AlertMessage('player deleted!', 'success');
  } catch (err) {
    AlertMessage(err, 'error');
  }
}

export default function DeletePlayer(props) {
  const [player_name, player_lastname] = props.user.split(' ');
  const tournament_id = props.id;
  const isAdmin =
    sessionStorage.getItem('role') === 'ROLE_ADMIN' ? true : false;
  if (isAdmin) {
    return (
      <button
        className="deletePlayerBtn"
        onClick={() => {
          deletePlayer(player_name, player_lastname, tournament_id);
        }}
      >
        ❌
      </button>
    );
  }
}
