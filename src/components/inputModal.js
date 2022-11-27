import React, { useState, useEffect } from 'react';

const InputModal = ({
    closeModal,
    clickBtn,
    btnText,
}) => {
    const close = () => {
        closeModal(false)
    }

    const [amount, setAmount] = useState('0')

    return (
        <div className='bg-modal-page'>
            <div onClick={close} className='bg-modal'></div>
            <div style={{
                zIndex: '1000',
                backgroundColor: '#fff',
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                display: 'flex',
                flexDirection: 'column',
                width: '50rem',
                padding: '20px',
            }}>
                <span
                    style={{
                        fontSize: '20px',
                        marginBottom: '10px'
                    }}
                > Input the amount </span>
                <div style={{
                    display: 'flex',
                    flexDirection: 'row',

                }}>
                    <input 
                        type="text" 
                        style={{
                            fontSize: '20px',
                            padding: '2px',
                            borderRadius: '5px',
                            width: '100%'
                        }}
                        value={amount} 
                        onChange={(e) => setAmount(e.target.value)} 
                    />
                    <button
                        style={{
                            fontSize: '20px',
                            padding: '5px 20px',
                            borderRadius: '5px',
                            backgroundColor: '#AAA',
                            color: 'white',
                        }}
                        onClick={() => {
                            clickBtn(amount)
                        }}
                    >
                        {btnText}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default InputModal