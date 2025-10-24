"use client"

import React from 'react'
import { ReactNode } from 'react'
import '@/styles/containers.css'
import '@/styles/modal.css'
import PrimaryButton from '@/components/Buttons/PrimaryButton'
import SecondaryButton from '@/components/Buttons/SecondaryButton'

interface ModalProps {
    onClose: () => void; // Función para cerrar el modal
    header: string;
    children?: ReactNode;
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    showButtons?: boolean; // Nuevo prop opcional
}

export default function Modal({ onClose, header, children, onSubmit, showButtons = true }: ModalProps) {
    // Prevent Enter key from submitting the form when focus is inside certain interactive elements
    const handleKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
        const target = e.target as HTMLElement;
        // If Enter is pressed within a combobox or input that should not submit, prevent default
        if (e.key === 'Enter') {
            const role = target.getAttribute('role');
            const tag = target.tagName?.toLowerCase();
            if (role === 'combobox' || role === 'listbox' || tag === 'input' || tag === 'textarea' || target.getAttribute('aria-haspopup') === 'listbox') {
                // Stop Enter from submitting the form; allow newlines in textareas
                if (tag !== 'textarea') {
                    e.preventDefault();
                    e.stopPropagation();
                }
            }
        }
    };

    return (
        <form onSubmit={onSubmit} onKeyDown={handleKeyDown}>
            <div className='modal'>
                <div className='border-b-[1px] mb-6'>
                    <h2 className='text-lg mb-2'>{header}</h2>
                </div>
                <div className='flex flex-col'>
                    {children}
                </div>
                {showButtons && (
                    <div className='justify-end flex space-x-3 mt-2'>
                        <SecondaryButton
                            buttonLabel='Cancelar'
                            buttonFunction={onClose}
                        />
                        <PrimaryButton
                            buttonLabel='Guardar'
                            buttonFunction={() => { }}
                        />
                    </div>
                )}
            </div>
        </form>
    )
}