type Props = {
    mainContent: React.ReactNode
};

const Homepage: React.FC<Props> = ({ mainContent }) => {
    return (
        <div>
            {mainContent}
        </div>
    );
};

export default Homepage;
