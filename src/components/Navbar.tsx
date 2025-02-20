import { useState } from "react";
import { Link, useLocation } from "react-router-dom";


const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const location = useLocation()
    const navbar = [
        {
            id: 1,
            name: 'Home',
            link:'/'
        },
        {
            id: 2,
            name: 'Quiz',
            link: '/quiz'
        },
        {
            id: 3,
            name: 'History',
            link: '/history'
        }
    ]
    return (
        <nav className="border-grid sticky top-0 z-50 w-full  bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="max-w-full px-2 sm:px-6 lg:px-8">
                <div className="relative flex py-2 items-center justify-between">
                    <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                        <button
                            onClick={() => setMenuOpen(!menuOpen)}
                            type="button"
                            className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700  focus:ring-2 focus:ring-white focus:outline-none focus:ring-inset"
                            aria-controls="mobile-menu"
                            aria-expanded={menuOpen}
                        >
                            <span className="sr-only">Open main menu</span>

                            {!menuOpen ? (
                                <svg className="block size-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                                </svg>
                            ) : (
                                <svg className="block size-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                </svg>
                            )}
                        </button>
                    </div>
                    <div className="flex flex-1 text-white items-center justify-end sm:items-stretch md:justify-start">
                        <h2 className="text-[#646cff] text-3xl">Quiz App</h2>
                    </div>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                        {navbar.map((item)=>{
                            return (
                                <div key={item.id} className="hidden sm:ml-6 sm:block">
                                    <div className="flex space-x-4">
                                        <Link to={item.link} className={`rounded-md px-3 py-2 text-sm font-medium text-blue ${location.pathname === item.link && 'bg-blue-500 text-white'}`}>
                                            {item.name}
                                        </Link>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>

            {menuOpen && (
                <div
                    className="fixed inset-0   z-40"
                    onClick={() => setMenuOpen(false)} // Clicking outside closes menu
                >
                    <div className="absolute top-16 left-0 w-full bg-white shadow-lg py-4 flex flex-col items-start space-y-2">
                        {navbar.map((item) => (
                            <Link
                                key={item.id}
                                to={item.link}
                                className={`w-full px-5 py-2 text-sm font-medium text-blue ${location.pathname === item.link ? "bg-blue-500 text-white" : ""
                                    }`}
                                onClick={() => setMenuOpen(false)}
                            >
                                {item.name}
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
