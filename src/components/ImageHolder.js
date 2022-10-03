import classes from './ImageHolder.module.css';
import useStore from '../store/gameLogicStore';

const ImageHolder = props => {
    const { lifePoints } = useStore();

    return (
        <div className={classes.imgContainer}>
            <img className={classes.images} src={`../images/hang${lifePoints}.png`} alt="Hanged stickman" />
        </div>
    );
}

export default ImageHolder;