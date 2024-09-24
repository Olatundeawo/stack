import { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import ProductCreate from "../src/controllers/project_create";
import Product from "../src/controllers/projects";
import About from "./about";
import ProductDetail from "../src/controllers/product_details";
import ProductUpdate from "../src/controllers/product_update";

function Routing() {

    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
                 <Router>
                    <nav className="bg-white text-black p-4 border-b border-b-white-500 border-b-solid">
                        <div className="container mx-auto flex justify-between items-center">
                            <div className="hidden md:flex space-x-6">
                                <Link className="hover:text-gray-300" to="/"> Home </Link>
                                <Link className="hover:text-gray-300" to="/add">Add Product </Link>
                            </div>

                             {/* Mobile Menu */}
                            <div className="md:hidden">
                                <button id="mobile-menu-button" className="focus:outline-none">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                                    </svg>
                                </button>
                            </div>

                            {/* Mobile Menu */}
                                {isOpen && (
                                    <div className="md:hidden bg-gray-700">
                                        <Link className="block p-4 hover:bg-gray-600" to="/" onClick={toggleMenu}>Home</Link>
                                        <Link className="block p-4 hover:bg-gray-600" to="/about" onClick={toggleMenu}>About</Link>
                                    </div>
                                )}
                        </div>
                    </nav>

                    <About />
                    <Routes>
                        <Route path="/product/:id" element={ <ProductDetail />} />
                        <Route path="/product/:id/update" element={ <ProductUpdate />} />
                        <Route path="/" element={ <Product />} />
                        <Route path="/add" element={ <ProductCreate />} />
                    </Routes>
                </Router>

        
        </>
    )
}


export default Routing;