import AddGame from "../AddGame/AddGame";


function SinglePlayerSettings(): JSX.Element {
    return (
        <div >
            <AddGame isMP={false}/>
        </div>
    );
};

export default SinglePlayerSettings;