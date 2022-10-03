import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import useStore from '../store/gameLogicStore';
import classes from './ProgressModal.module.css';

const ProgressModal = props => {
    const { modalIsOpen, modalProps, modalToggleHandler } = useStore();

    return (
        <Modal className={classes.modalContainer} isOpen={modalIsOpen}>
            <ModalHeader className={classes[modalProps.color]}>{modalProps.title}</ModalHeader>
            <ModalBody>
                {modalProps.body}
            </ModalBody>
            <ModalFooter>
                <Button color={modalProps.color} onClick={modalToggleHandler}>
                    {modalProps.buttonText}
                </Button>
            </ModalFooter>
        </Modal>
    );
}

export default ProgressModal;