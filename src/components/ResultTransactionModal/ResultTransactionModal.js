import React from 'react';
import Modal from "react-modal";

const modalStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: '#3e3a3f',
        display: 'flex',
        flexDirection: 'column',
        gap: '25px'
    },
};

const ResultTransactionModal = ({
                                    modalHeader = 'Success',
                                    modalText = 'The transaction was made successfully',
                                    modalIsOpen,
                                    setIsOpen
                                }) => {

    //модальное окно результата

    const closeModal = () => {
        setIsOpen(false);
    }

    return (
        <div>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={modalStyles}
                ariaHideApp={false}
            >
                <h2 style={{textAlign: 'center'}}>{modalHeader}</h2>
                <p>{modalText}</p>
                <button onClick={closeModal}>Close</button>
            </Modal>
        </div>
    );
};

export default ResultTransactionModal;