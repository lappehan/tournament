import AlertMessage from '../functions/alert';

export default function JoinTourney(id) {
  return (
    <button
      onClick={() => {
        join(id);
      }}
      className="double-border-button"
    >
      Join
    </button>
  );
}

async function join(id) {
  try {
    const token = sessionStorage.getItem('token');
    const req = await fetch(
      `https://alihan-myproject.azurewebsites.net/api/v1/app/tournament/join/${id.id}`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      }
    );
    if (req.ok) {
      AlertMessage('You are added!', 'success');
    } else {
      AlertMessage('You already in!', 'error');
    }
  } catch {
    console.log('error');
  }
}
