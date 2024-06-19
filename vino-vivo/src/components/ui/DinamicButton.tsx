import React from 'react';
import clsx from 'clsx';

interface ButtonProps {
    children?: React.ReactNode;
    bgColor?: string;
    textColor?: string;
    width?: string;
    borderRadius?: string;
    hoverBgColor?: string;
    hoverTextColor?: string;
    hoverBorderColor?: string;
    hoverShadow?: boolean;
    activeBgColor?: string;
    activeTextColor?: string;
    activeBorderColor?: string;
    changeBgOnClick?: boolean;
    className?: string;
    onClick?: () => void;
}
// Explicación de los parámetros del componente:
// bgColor: Color de fondo del botón.
// textColor: Color del texto del botón.
// width: Ancho del botón.
// border: Booleano para decidir si el botón tiene borde o no.
// borderColor: Color del borde del botón (si border es true).
// borderRadius: Define el radio del borde para esquinas redondeadas.
// hoverBgColor: Color de fondo al hacer hover.
// hoverTextColor: Color del texto al hacer hover.
// hoverShadow: Booleano para decidir si el botón tiene sombra al hacer hover.
// activeBgColor: Color de fondo al hacer clic.
// activeTextColor: Color del texto al hacer clic.
// className: Clases adicionales para el botón.
// onClick: Función a ejecutar al hacer clic en el botón.

const DinamicButton: React.FC<ButtonProps> = ({
    children,
    bgColor = 'bg-violeta',
    textColor = 'text-whiteTypograph',
    width = 'W-[300px]',
    borderRadius = 'rounded-sm',
    hoverBgColor = 'hover:bg-violeta',
    hoverTextColor = 'hover:text-whiteTypograph',
    hoverBorderColor = 'hover:border-transparent',
    hoverShadow = true,
    activeBgColor = 'active:bg-violeta-foreground',
    activeTextColor = 'active:text-whiteTypograph',
    activeBorderColor = 'active:border-transparent',
    changeBgOnClick = true,
    className,
    onClick,
}) => {
    return (
        <button
        className={clsx(
            'py-2 px-4 transition-colors duration-300 focus:outline-none',
                bgColor,
                textColor,
                width,
                borderRadius,
                hoverBgColor,
                hoverTextColor,
                `hover:border ${hoverBorderColor}`,
                hoverShadow ? 'hover:shadow-lg' : '',
                changeBgOnClick && `active:border ${activeBorderColor}`,
                changeBgOnClick && activeBgColor,
                changeBgOnClick && activeTextColor,
                className
        )}
            onClick={onClick}
        >
        {children}
        </button>
    );
};

export default DinamicButton;
