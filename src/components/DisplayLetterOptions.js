import classes from './DisplayLetterOptions.module.css';
import useStore from '../store/gameLogicStore';


const DisplayLetterOptions = props => {
    const { guessedLetters, updatedLetterOptions, letterSelectionHandler } = useStore();

    return (
        <div className={classes.letterContainer}>
            {updatedLetterOptions.map(letter =>
                <button
                    disabled={guessedLetters.includes(letter)}
                    key={Math.random().toString()}
                    onClick={letterSelectionHandler}
                    className={`${classes.button} `}
                >
                    {letter}
                </button>
            )}
        </div>
    );
};

export default DisplayLetterOptions;