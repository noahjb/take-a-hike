import { Link } from 'react-router-dom';
const Profile: React.FC = () => {
    return (
        <div>
            <Link to='/profile'>
                <span>Logged in as User1</span>
            </Link>
            <button>
                Logout
            </button>
        </div>
    );
};

export default Profile;
