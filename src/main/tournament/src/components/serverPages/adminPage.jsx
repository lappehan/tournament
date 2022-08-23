import Footer from '../pageElements/footer';
import Header from '../pageElements/header';
import Tournaments from '../openTournament/Tournaments';
import ActiveTournaments from '../activeTournament/activeTournaments';

export default function AdminPage() {
  const isAdmin =
    sessionStorage.getItem('role') === 'ROLE_ADMIN' ? true : false;
  if (isAdmin) {
    return (
      <div className="adminPage">
        <Header />
        <div className="adminPageBody">
          <div className="createTournament">
            <a className="border-button" href="/createAdminTournament">
              New Super Tournament
            </a>
            <a className="border-button" href="/deleteUser">
              Delete User
            </a>
          </div>

          <div className="allTournaments">
            <div className="mainPageTitle">
              <h2>Open and Active tournaments</h2>
            </div>
            <Tournaments />
            <ActiveTournaments />
          </div>
        </div>
        <Footer />
      </div>
    );
  }
  return <div>YOU NOT ADMIN!</div>;
}
