import Link from "next/link";

const NotFound: React.FC = () => {
    return (
        <div className="w-full h-screen md:h-[83vh] flex flex-col items-center justify-between">
            <div className="flex flex-col h-full w-full gap-4 justify-center items-center">
                <div className="flex flex-col text-center gap-2">
                    <h1 className="text-4xl font-medium">404 not found</h1>
                    <p className="text-lg opacity-80 text-center">
                        <span>wrong url, let me help you</span>
                    </p>
                </div>
                <div className="flex gap-4">
                    <Link href="/" className="text-sm hover:underline hover:opacity-80 transition-all">home</Link>
                    <Link href="/about" className="text-sm hover:underline hover:opacity-80 transition-all">about</Link>
                    <Link href="/work" className="text-sm hover:underline hover:opacity-80 transition-all">works</Link>
                    <Link href="/contact" className="text-sm hover:underline hover:opacity-80 transition-all">contact</Link>
                </div>
            </div>
        </div>
    );
};

export default NotFound;