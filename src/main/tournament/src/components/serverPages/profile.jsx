import { useCallback, useEffect, useState } from 'react';
import isEmpty from '../functions/checkEmpty';
import doWeHaveToken from '../functions/checkIfAutorized';
import Header from '../pageElements/header';
import ReactLoading from 'react-loading';
import Footer from '../pageElements/footer';

// function profInfoImitation() {
//   return
// }

export default function Profile() {
  const [user, setUser] = useState();
  const profile = useCallback(async () => {
    const token = sessionStorage.getItem('token');
    const userReq = await fetch('https://alihan-myproject.azurewebsites.net/api/v1/app/user', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    const userRes = await userReq.json();
    setUser(userRes);
  }, []);
  useEffect(() => {
    profile();
  }, [profile]);

  if (doWeHaveToken() && !isEmpty(user)) {
    return (
      <div className="profilePage">
        <Header />
        <div className="ProfileInfo">
          <div className="mainPageTitle">
            <h2>Profile Info</h2>
          </div>
          <div className="ProfileDetails">
            <div className="ProfileInfoField">Firstname: {user.firstName}</div>
            <div className="ProfileInfoField">Lastname: {user.lastName}</div>
            <div className="ProfileInfoField">Major: {user.major}</div>
            <div className="ProfileInfoField">Login: {user.login}</div>
            <div className="ProfileInfoField">
              Role: {sessionStorage.getItem('role').split('_')[1]}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
  return (
    <div className="profilePage">
      <Header />
      <ReactLoading color={'orange'} className="center" />
      <Footer />
    </div>
  );
}
