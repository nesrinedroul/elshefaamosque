import Announcement from './Announcement';
import About from './About';
import InfoPage from './InfoPage';
import "./index.css";
import NavBar from './NavBar';
import PrayerTime from './PrayerTime';
import News from './News';

function App1({ userRole }) {
    return (
        <>
            <NavBar userRole={userRole} />  {/* Pass the userRole as a prop */}
            <InfoPage />
            <News />
            <PrayerTime country="DZ" city="Algiers" />
            <About />
            <Announcement />
        </>
    );
}

export default App1;


