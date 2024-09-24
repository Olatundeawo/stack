import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ProductDetail = () => {
  const { id } = useParams();
  const [products, setProducts] = useState(null);
  const [activeImage, setActiveImage] = useState(null); // State to store the active image
  const navigate = useNavigate()

  const handleClick = (id) => {
    navigate(`/product/${id}/update`)
  }

  useEffect(() => {
    axios.get(`/api/product/${id}`).then((response) => {
      const productData = response.data;
      setProducts(productData);
      console.log(response)

      // Set the first image as the active image by default
      if (productData.length > 0 && productData[0].images && productData[0].images.length > 0) {
        setActiveImage(productData[0].images[0]);
      }
    });
  }, [id]);

  if (!products) {
    return <p className="text-center text-lg font-semibold">Loading...</p>;
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      {products.map((product) => (
        <div key={product.product_id} className="flex flex-col md:flex-row bg-white shadow-lg rounded-lg overflow-hidden mb-6">
          {/* Left Column: Product Images */}
          <div className="md:w-1/2 p-4">
            <div className="mb-4">
              {activeImage ? (
                <img
                  src={`/images/${activeImage}`}
                  alt="Main Product"
                  className="w-full h-auto object-cover rounded-lg"
                />
              ) : (
                <p className="text-gray-500 text-center">No images available.</p>
              )}
            </div>

            {/* Thumbnail Images */}
            <div className="flex space-x-2 overflow-x-auto">
              {product.images && product.images.length > 0
                ? product.images.map((image, index) => (
                    <img
                      key={index}
                      src={`/images/${image}`}
                      alt={`Thumbnail ${index + 1}`}
                      className={`w-20 h-20 object-cover border border-gray-300 rounded-lg cursor-pointer ${activeImage === image ? 'border-blue-500' : ''}`} // Add border to the active thumbnail
                      onClick={() => setActiveImage(image)} // Set the clicked thumbnail as the active image
                    />
                  ))
                : null}
            </div>
          </div>

          {/* Right Column: Product Details */}
          <div className="md:w-1/2 p-6">
            <h1 className="text-3xl font-bold text-gray-800">{product.name}</h1>

            {/* Price */}
            <div className="text-2xl font-bold text-green-500 mt-4">N{product.price}</div>

            {/* Description */}
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-gray-700">Description</h3>
              <p className="text-gray-600 mt-2">{product.description}</p>
            </div>

            {/* Creation Date */}
            <p className="text-sm text-gray-500 mt-4">
              Added on: {new Date(product.created_at).toLocaleDateString()}
            </p>

            {/* Quantity Selector & Buttons */}
            <div className="mt-6 flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
              <button className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700">
                Purchase Now
              </button>
              <button className="bg-purple-600 text-white px-6 py-3 rounded-md hover:bg-purple-700">
                Add to Cart
              </button>
              <button className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700"
              onClick={() => handleClick(product.product_id)}>
                Edit
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductDetail;
