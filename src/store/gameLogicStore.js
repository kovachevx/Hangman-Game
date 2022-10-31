import React, { createContext, useEffect, useState } from "react";
import useLocalStorage from "./localStorageHook";
import gameOn, { newGame } from "./updateLevelState";

const AppContext = createContext();

const { displayedWord, chosenWord, letterOptions, CORRECT_LETTERS } = gameOn();

export function GameProgressStore(props) {
    const [updatedChosenWord, setUpdatedChosenWord] = useLocalStorage('chosenWord', chosenWord);
    const [updatedDisplayedWord, setUpdatedDisplayedWord] = useLocalStorage('displayedWord', displayedWord);
    const [correctLetters, setCorrectLetters] = useLocalStorage('correctLetters', CORRECT_LETTERS);
    const [updatedLetterOptions, setUpdatedLetterOptions] = useLocalStorage('letterOptions', letterOptions);
    const [lifePoints, setLifePoints] = useLocalStorage('lifePoints', 6);
    const [currentLevel, setCurrentLevel] = useLocalStorage('currentLevel', 0);
    const [guessedLetters, setGuessedLetters] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [modalProps, setModalProps] = useState({});
    const [isDarkMode, setIsDarkMode] = useState(false);

    const nextLevel = () => {
        const newLevelProps = gameOn();
        setUpdatedDisplayedWord(newLevelProps.displayedWord);
        setCorrectLetters(newLevelProps.CORRECT_LETTERS);
        setUpdatedChosenWord(newLevelProps.chosenWord);
        setUpdatedLetterOptions(newLevelProps.letterOptions)
        setLifePoints(6);
        setGuessedLetters([]);
        setCurrentLevel(previousState => {
            return previousState + 1;
        });
    }

    const modalToggleHandler = () => {
        setModalIsOpen(!modalIsOpen);
        if (modalProps.title === 'Опа!') {
            newGame();
            nextLevel();
            setCurrentLevel(0);
        }
    };

    const letterSelectionHandler = (event) => {
        setGuessedLetters(previousState => {
            return [...previousState, event.target.textContent];
        });

        if (updatedChosenWord.includes(event.target.textContent)) {
            setCorrectLetters(previousState => {
                return [...previousState, event.target.textContent];
            });
        } else {
            setLifePoints(previousValue => {
                return previousValue - 1;
            });
        }
    };

    useEffect(() => {
        let newWord = '';
        for (let letter of updatedChosenWord) {
            if (correctLetters.includes(letter)) {
                newWord += letter;
            } else {
                newWord += '_';
            }
        }
        setUpdatedDisplayedWord(newWord);
    }, [correctLetters, updatedChosenWord]);

    useEffect(() => {
        if (!updatedDisplayedWord.includes('_')) {
            setModalIsOpen(true);
            setModalProps({
                title: 'Поздравления!',
                body: `Успешно позна думата "${updatedChosenWord}".`,
                color: 'success',
                buttonText: 'Продължи напред'
            });
            nextLevel();
        } else if (lifePoints === 0) {
            setModalIsOpen(true);
            setModalProps({
                title: 'Опа!',
                body: `Не успя да познаеш думата! Край на играта.`,
                color: 'danger',
                buttonText: 'Играй отново'
            });
        }
    }, [updatedDisplayedWord, lifePoints]);

    return (
        <AppContext.Provider
            value={{
                updatedChosenWord,
                updatedDisplayedWord,
                correctLetters,
                guessedLetters,
                updatedLetterOptions,
                lifePoints,
                currentLevel,
                modalIsOpen,
                modalProps,
                isDarkMode,
                setIsDarkMode,
                modalToggleHandler,
                letterSelectionHandler
            }}
        >
            {props.children}
        </AppContext.Provider>
    );
}

export default function useStore() {
    return React.useContext(AppContext);
};