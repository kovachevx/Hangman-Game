import classes from './DisplayWordAndHeader.module.css';
import useStore from '../store/gameLogicStore';

const DisplayWordAndHeader = props => {
    const { updatedDisplayedWord, currentLevel } = useStore();

    return (
        <div>
            <h1 className={classes.h2}>БЕСЕНИЧКА</h1>
            <div className={classes.wordContainer}>
                <h2 className={classes.word}>{updatedDisplayedWord}</h2>
            </div>
            <div className={classes.statsContainer}>
                <div>Брой познати думи: {currentLevel}</div>
            </div>
        </div>
    );
};

export default DisplayWordAndHeader;