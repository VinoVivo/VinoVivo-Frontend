import Link from "next/link";

const Header = () => {
    return (
        <header className="bg-violeta fixed top-0 w-full z-50 h-36"> 
            <img src="/logo-vinovivo.png" alt="" className="ml-32 mt-5"/>
            <div className="container mx-auto flex justify-between items-center h-full"> 
                <Link href="/"></Link>
                <Link href="/"></Link>
                <Link href="/"></Link>
            </div>
        </header>
    );
};

export default Header;
