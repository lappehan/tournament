import Footer from '../pageElements/footer';
import Header from '../pageElements/header';

export default function Developers() {
  return (
    <div className="developersPage">
      <Header />
      <div className="developersInfo">
        <div className="teamLogo">
          <img src={require('../logos/teamLogo.png')} alt="teamLogo" />
        </div>
        <div className="developers">
          <div className="developer">
            <div className="developerPic">
              <img src={require('../logos/nariman.png')} alt="dev" />
            </div>
            <div className="developerInfo">Azamatov Nariman (Frontend)</div>
          </div>
          <div className="developer">
            <div className="developerPic">
              <img src={require('../logos/tima.png')} alt="dev" />
            </div>
            <div className="developerInfo">Amanzhol Temirbolat (Backend)</div>
          </div>
          <div className="developer">
            <div className="developerPic">
              <img src={require('../logos/rakhim.png')} alt="dev" />
            </div>
            <div className="developerInfo">Lugma Rakhim (Backend)</div>
          </div>
          <div className="developer">
            <div className="developerPic">
              <img src={require('../logos/aida.png')} alt="dev" />
            </div>
            <div className="developerInfo">Moldaly Aida (IOS)</div>
          </div>
          <div className="developer">
            <div className="developerPic">
              <img src={require('../logos/alibek.png')} alt="dev" />
            </div>
            <div className="developerInfo">Dariger Alibek (DevOps)</div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
