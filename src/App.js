import classes from './App.module.css';
import useStore from './store/gameLogicStore';
import DisplayWordAndHeader from './components/DisplayWordAndHeader';
import DisplayLetterOptions from './components/DisplayLetterOptions';
import CustomProgressBar from './components/CustomProgressBar';
import ImageHolder from './components/ImageHolder';
import ProgressModal from './components/ProgressModal';
import ChangeModeButton from './components/ChangeModeButton';

function App() {
  const { isDarkMode } = useStore();

  return (
    <div className={`${classes.container} ${classes[isDarkMode]}`}>
      <DisplayWordAndHeader />
      <DisplayLetterOptions />
      <CustomProgressBar />
      <ImageHolder />
      <ProgressModal />
      <ChangeModeButton />
    </div >
  );
}

export default App;