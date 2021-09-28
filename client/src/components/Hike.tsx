type Props = {
    hike: {
        id: string,
        title: string,
        description: string
    }
};

const Hike: React.FC<Props> = ({hike}) => {
    return (
        <div>
            <img src="" alt={hike.title} />
            <h2>{hike.title}</h2>
            <p>{hike.description}</p>
        </div>
    );
};

export default Hike;
