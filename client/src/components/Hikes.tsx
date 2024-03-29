import Hike from './Hike';
const Hikes: React.FC = () => {
    const hikes = [
        {
            id: "ab77de82-ba82-4bd8-a3e8-0e6a6adce031",
            title: "Long's Peak",
            description: "Best 14er in the land"
        },
        {
            id: "9ddb41f3-d652-4c57-8ee0-49465dff5a02",
            title: "Appalachian Trail",
            description: "Miles and miles and miles"
        },
        {
            id: "98e8ba44-1e9e-4257-9224-568dac25a838",
            title: "Mt. Falcon",
            description: "Didn't see any falcons"
        },
        {
            id: "c7566dbb-24a9-4bfa-9ca0-1dd238d6e2fc",
            title: "Shell Falls",
            description: "Looked like water to me"
        }
    ];

    return (
        <div>
            {hikes.map(hike => <Hike key={hike.id} hike={hike} />)}
        </div>
    );
};

export default Hikes;
