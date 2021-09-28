import { Link } from 'react-router-dom';
const CreateHikeButton: React.FC = () => {
    return (
        <Link to='/create'>
            <button>Create Hike</button>
        </Link>
    );
};

export default CreateHikeButton;
