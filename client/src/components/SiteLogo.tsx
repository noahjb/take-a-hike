import { Link } from 'react-router-dom';
const SiteLogo: React.FC = () => {
    return (
        <Link to='/'>
            <img src='https://img.icons8.com/ios-filled/100/000000/trekking.png' alt="Take A Hike logo" />
            <h1>Take A Hike</h1>
        </Link>
    );
};

export default SiteLogo;
