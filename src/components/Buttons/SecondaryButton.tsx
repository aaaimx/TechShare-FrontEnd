import React, { useState } from 'react'
import '@/styles/buttons.css'

interface ButtonProps {
    buttonLabel: string;
    buttonFunction: any;
    isDisabled?: boolean;
}

export default function Button({ buttonLabel, buttonFunction, isDisabled = false }: ButtonProps) {
    return (
        <button className='secondary-button'
            onClick={buttonFunction}
            disabled={isDisabled}
            type='button'
        >
            {isDisabled ? '' : buttonLabel}
        </button>
    )
}
