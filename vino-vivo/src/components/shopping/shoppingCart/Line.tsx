
interface LineProps {
    color?: string;
    margin?: string;
    width?: string;
    thickness?: string;
}

const Line: React.FC<LineProps> = ({
    color = 'bg-black',
    width = 'w-full',
    thickness = 'border-2',
    margin= 'mt-0'
}) => {
    return (
        <div className={`flex`}>XXXXX
            <hr className={`border-liza ${color} ${width} ${thickness} ${margin}`} />
        </div>
    );
};

export default Line;
