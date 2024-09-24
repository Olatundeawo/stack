import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";


function Product () {
    const [products, setProducts] = useState([]);
    const[loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('/api/products')
        .then((response) => {
            setProducts(response.data);
            setLoading(false);
        });
    },[]);

    const handleProductClick = (id) => {
        navigate(`/product/${id}`);
    }

    return (
        <div>
            <div className="w-full h-52 bg-blue-500 flex items-center justify-center">
                <h1 className="text-white text-3xl md:text-4xl lg:text-6xl font-bold">
                    Welcome to Hollat Kiddies
                </h1>
            </div>
            <div className="container mx-auto p-4">
                {loading ? (
                    <p className="text-center text-lg">Loading...</p>
                ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                    <div key={product.product_id} className="bg-white shadow-md rounded-lg overflow-hidden"
                    onClick={() => handleProductClick(product.product_id)}>
                        
                    {/* Product Image */}
                    {product.images && product.images.length > 0 && (
                        <img
                        src={`/images/${product.images[0]}`}  // Assuming your images are stored in an 'uploads' folder
                        alt={product.name}
                        className="w-full h-48 object-cover"
                        />
                    )}

                        <div className="p-4">
                            {/* Product Name */}
                            <h2 className="text-xl font-semibold text-gray-800">{product.name}</h2>
                            
                            {/* Product Price */}
                            <div className="mt-4">
                            <span className="text-lg font-bold text-green-500">N{product.price}</span>
                            </div>

                        </div>
                    </div>
                ))}
                </div>
                )}
            </div>
            
        
        </div>
    )
};

export default Product;