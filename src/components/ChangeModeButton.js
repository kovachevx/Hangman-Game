import classes from './ChangeModeButton.module.css';
import useStore from '../store/gameLogicStore';
import { useEffect, useState } from 'react';

const ChangeModeButton = props => {
    const { isDarkMode, setIsDarkMode } = useStore();
    const [isChecked, setIsChecked] = useState(isDarkMode);

    const checkboxHandler = (event) => {
        event.target.checked ? setIsChecked(true) : setIsChecked(false);
    }

    useEffect(() => {
        isChecked ? setIsDarkMode(true) : setIsDarkMode(false);
    }, [isChecked]);

    return (
        <div className={classes.wrapper}>
            <div className={`${classes.modeButtonContainer} ${classes[isDarkMode]}`}>
                <label htmlFor={'checkbox'}>Dark Mode: &nbsp;</label>
                <input onClick={checkboxHandler} type="checkbox" id="checkbox" checked={isChecked} readOnly/>
            </div>
        </div>
    );
};

export default ChangeModeButton;