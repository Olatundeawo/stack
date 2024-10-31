import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import ProtectedRoute from './ProtectedRoute'; // Import the ProtectedRoute component
import ProductCreate from "../src/controllers/project_create";
import Product from "../src/controllers/projects";
import About from "./about";
import Contact from "./contact";
import ProductDetail from "../src/controllers/product_details";
import ProductUpdate from "../src/controllers/product_update";
import ProductDelete from "../src/controllers/product_delete";
import ProductDeleteImage from "../src/controllers/product_delete_image";
import UserCreate from "../src/controllers/user_create";
import UserLogin from "../src/controllers/user_login";



function Routing() {
    const [isOpen, setIsOpen] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };
    
    // Check if the user is authenticated
    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsAuthenticated(!!token); // Set to true if a token is found
        
    }, []);

    const handleLogout = () => {
      localStorage.removeItem('token')
      
      window.location.reload();
    }
    return (
        <>
            <Router>
                <nav className="bg-white text-black shadow-md">
                    <div className="container mx-auto flex justify-between items-center p-4">
                        {/* Logo or Brand Name */}
                        <div className="text-2xl font-bold">
                        <Link to="/">HollartKiddies</Link>
                        </div>

                        {/* Desktop Menu */}
                        <div className="hidden md:flex space-x-8">
                        <Link className="hover:text-gray-600 transition-colors duration-300" to="/">Home</Link>
                        <Link className="hover:text-gray-600 transition-colors duration-300" to="/about">About</Link>

                        {isAuthenticated && (
                            <>
                            <Link className="hover:text-gray-600 transition-colors duration-300" to="/add">Add Product</Link>
                            <Link className="hover:text-gray-600 transition-colors duration-300" onClick={handleLogout}>Logout</Link>
                            </>
                        )}
                        </div>

                        {/* Mobile Toggle Button */}
                        <div className="md:hidden">
                        <button id="mobile-menu-button" className="focus:outline-none" onClick={toggleMenu}>
                            <svg className={`w-6 h-6 transition-transform ${isOpen ? "rotate-90" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                            </svg>
                        </button>
                        </div>
                    </div>

                    {/* Mobile Menu */}
                    <div className={`md:hidden overflow-hidden transition-all duration-300 ${isOpen ? "max-h-screen" : "max-h-0"}`}>
                        <div className="bg-gray-100">
                        <Link className="block px-4 py-2 text-lg hover:bg-gray-200 transition-colors duration-300" to="/" onClick={toggleMenu}>Home</Link>
                        <Link className="block px-4 py-2 text-lg hover:bg-gray-200 transition-colors duration-300" to="/about" onClick={toggleMenu}>About</Link>

                        {isAuthenticated && (
                            <>
                            <Link className="block px-4 py-2 text-lg hover:bg-gray-200 transition-colors duration-300" to="/add" onClick={toggleMenu}>Add Product</Link>
                            <Link className="block px-4 py-2 text-lg hover:bg-gray-200 transition-colors duration-300" onClick={handleLogout}>Logout</Link>
                            </>
                        )}
                        </div>
                    </div>
                </nav>



                <Routes>
                    
                    <Route path="/" element={<Product />} />
                    <Route path="/product/:id" element={<ProductDetail />} />
                    {/* Protected Routes */}
                    <Route 
                    path="/product/:id/update"
                    element={
                         <ProtectedRoute>
                        <ProductUpdate />
                        </ProtectedRoute>
                        
                    }
                     />
                    
                    <Route
                     path="/product/:id/delete"
                      element={
                        <ProtectedRoute>
                        <ProductDelete />
                        </ProtectedRoute>
                        
                    }
                     />
                    
                    <Route 
                    path="/product/:id/image/:imageId" 
                    element={
                        <ProtectedRoute>
                        <ProductDeleteImage />
                        </ProtectedRoute>
                       
                    }
                     />

                    <Route
                        path="/add"
                        element={
                            <ProtectedRoute>
                                <ProductCreate />
                                </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/admin/to/register"
                        element={
                           <ProtectedRoute>
                                <UserCreate />
                            </ProtectedRoute>
                        }
                    />
                    

                    {/* Unprotected Routes */}
                    <Route path="/admin/to/login" element={<UserLogin />} />
                    <Route path="/about" element={<About />} />
                </Routes>

                <Contact />
            </Router>
        </>
    );
}

export default Routing;
