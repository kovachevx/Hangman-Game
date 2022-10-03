import { Progress } from 'reactstrap';
import classes from './CustomProgressBar.module.css'
import useStore from '../store/gameLogicStore';

const CustomProgressBar = props => {
    const { lifePoints } = useStore();

    let barColor;

    if (lifePoints > 4) {
        barColor = 'success';
    } else if (lifePoints > 2) {
        barColor = 'warning';
    } else {
        barColor = 'danger';
    }

    return (
        <div className={classes.progressBarContainer}>
            <div>Точки живот:</div>
            <Progress color={barColor} className={classes.bar} value={lifePoints * 17}>{lifePoints}</Progress>
        </div>
    );
}

export default CustomProgressBar;