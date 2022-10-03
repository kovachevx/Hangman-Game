import { WORDS_ARRAY, LETTERS_ARRAY, USED_WORDS, resetUsedWords  } from "./constants";

export default function gameOn() {

    const chosenWord = WORDS_ARRAY[Math.floor(Math.random() * WORDS_ARRAY.length)];

    const chosenWordIndex = WORDS_ARRAY.indexOf(chosenWord);
    const cutWord = WORDS_ARRAY.splice(chosenWordIndex, 1);
    USED_WORDS.push(cutWord[0]);

    const availableLetters = new Set;

    let displayedWord = '';

    const firstLetter = chosenWord[0];
    displayedWord += firstLetter;

    const lastLetter = chosenWord[chosenWord.length - 1];

    const CORRECT_LETTERS = [firstLetter, lastLetter];

    for (let i = 1; i < chosenWord.length - 1; i++) {
        if (chosenWord[i] === firstLetter) {
            displayedWord += firstLetter;
        } else if (chosenWord[i] === lastLetter) {
            displayedWord += lastLetter;
        } else {
            availableLetters.add(chosenWord[i]);
            displayedWord += '_';
        }
    }

    displayedWord += lastLetter;

    const letterOptionsLength = chosenWord.length * 2 <= 12 ? 12 : chosenWord.length * 2;

    while (availableLetters.size < letterOptionsLength) {
        const letterOption = LETTERS_ARRAY[Math.floor(Math.random() * LETTERS_ARRAY.length)]
        if (letterOption !== firstLetter && letterOption !== lastLetter) {
            availableLetters.add(letterOption);
        }
    }

    const letterOptions = Array.from(availableLetters).sort();

    return {
        chosenWord,
        CORRECT_LETTERS,
        letterOptions,
        displayedWord
    }
}

export function newGame() {
    for (let word of USED_WORDS) {
        WORDS_ARRAY.push(word);
    }
    resetUsedWords();
}