import AlertMessage from '../functions/alert';

export default async function deleteTournament(id) {
  try {
    // console.log(id);
    const token = sessionStorage.getItem('token');
    const req = await fetch(
      `https://alihan-myproject.azurewebsites.net/api/v1/app/admin/delete/${id}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      }
    );
    if (req.ok) {
      AlertMessage('Tournament Deleted!', 'success');
    }
  } catch (err) {
    AlertMessage('You can`t delete this tournament!', 'error');
  }
}
