import React, { useState } from 'react';
import Cards, { Focused } from 'react-credit-cards-2';
import 'react-credit-cards-2/dist/es/styles-compiled.css';
import { ValidationErrors } from './Payment';

interface PaymentFormProps {
    onValidationError: (errors: ValidationErrors) => void;
}

const PaymentForm: React.FC<PaymentFormProps> = ({ onValidationError }) => {
    const [state, setState] = useState({
        number: '',
        expiry: '',
        cvc: '',
        name: '',
        focus: undefined as string | undefined,
        errors: {
            name: '',
            expiry: '',
            cvc: '',
        }
    });

    const handleInputChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = evt.target;
        setState((prev) => ({ ...prev, [name]: value }));
    };

    const handleInputFocus = (evt: React.FocusEvent<HTMLInputElement>) => {
        setState((prev) => ({ ...prev, focus: evt.target.name }));
    };

    const validateName = (name: string) => {
        const regex = /^[A-Za-z\s]+$/;
        if (!regex.test(name)) {
            return "El nombre solo puede contener letras.";
        }
        return "";
    };

    const validateExpiry = (expiry: string) => {
        const regex = /^(0[1-9]|1[0-2])\/([0-9]{2})$/;
        if (!regex.test(expiry)) {
            return "Formato de vencimiento inválido.";
        }
    
        const parts = expiry.split('/').map(Number);
        const month = parts[0];
        const year = parts[1];
        
        const currentYear = new Date().getFullYear() % 100;
        const currentMonth = new Date().getMonth() + 1;
    
        if (year < currentYear || (year === currentYear && month < currentMonth)) {
            return "Tarjeta vencida.";
        }
        return "";
    };

    const validateCVC = (cvc: string) => {
        const regex = /^[0-9]{3}$/;
        if (!regex.test(cvc)) {
            return "El CVC debe tener 3 números.";
        }
        return "";
    };

    const validateField = (name: string, value: string) => {
        switch (name) {
            case "name":
                return validateName(value);
            case "expiry":
                return validateExpiry(value);
            case "cvc":
                return validateCVC(value);
            default:
                return "";
        }
    };

    const handleValidation = (evt: React.FocusEvent<HTMLInputElement>) => {
        const { name, value } = evt.target;
        const error = validateField(name, value);

        setState((prev) => ({
            ...prev,
            errors: {
                ...prev.errors,
                [name]: error
            }
        }));

        onValidationError({
            ...state.errors,
            [name]: error
        });
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="flex justify-center lg:justify-end">
                <Cards
                    number={state.number}
                    expiry={state.expiry}
                    cvc={state.cvc}
                    name={state.name}
                    focused={state.focus as Focused | undefined}
                />
            </div>
            <form className="flex flex-col gap-2">
                <input
                    type="text"
                    name="number"
                    placeholder="Número de tarjeta"
                    value={state.number}
                    onChange={handleInputChange}
                    onFocus={handleInputFocus}
                    onBlur={handleValidation}
                    className="border border-gray-200 rounded-md px-3 py-2 focus:outline-none focus:border-primary"
                />
                {/* {state.errors.number && <p className="text-red-500 text-xs">{state.errors.number}</p>} */}
                <input
                    type="text"
                    name="name"
                    placeholder="Nombre del titular"
                    value={state.name}
                    onChange={handleInputChange}
                    onFocus={handleInputFocus}
                    onBlur={handleValidation}
                    className="border border-gray-200 rounded-md px-3 py-2 focus:outline-none focus:border-primary"
                />
                {state.errors.name && <p className="text-red-500 text-xs">{state.errors.name}</p>}
                    <input
                        type="text"
                        name="expiry"
                        placeholder="Vencimiento (MM/YY)"
                        value={state.expiry}
                        onChange={handleInputChange}
                        onFocus={handleInputFocus}
                        onBlur={handleValidation}
                        className="border border-gray-200 rounded-md px-3 py-2 focus:outline-none focus:border-primary flex-1"
                    />
                    {state.errors.expiry && <p className="text-red-500 text-xs">{state.errors.expiry}</p>}
                    <input
                        type="text"
                        name="cvc"
                        placeholder="CVC"
                        value={state.cvc}
                        onChange={handleInputChange}
                        onFocus={handleInputFocus}
                        onBlur={handleValidation}
                        className="border border-gray-200 rounded-md px-3 py-2 focus:outline-none focus:border-primary w-1/2"
                    />
                    {state.errors.cvc && <p className="text-red-500 text-xs">{state.errors.cvc}</p>}
            </form>
        </div>
    );
};

export default PaymentForm;
