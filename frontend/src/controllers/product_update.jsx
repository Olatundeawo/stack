import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const ProductUpdate = () => {
  const [product, setProduct] = useState(null);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);
  const [loading, setLoading] = useState(false); // Track form submission state
  const { id } = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`/api/product/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product", error);
        alert("Error fetching product details");
      }
    };
    fetchProduct();
  }, [id]);

  // Handle file input change
  const handleFileChange = (e) => {
    const files = e.target.files;
    setSelectedFiles(files);

    // Preview the selected images
    const filePreviews = Array.from(files).map((file) =>
      URL.createObjectURL(file)
    );
    setPreviewImages(filePreviews);
  };

  // Handle the form submission for product update
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading state

    const formData = new FormData();
    formData.append("name", product[0].name);
    formData.append("description", product[0].description);
    formData.append("price", product[0].price);

    // Append all selected new images to formdata
    for (let i = 0; i < selectedFiles.length; i++) {
      formData.append("images", selectedFiles[i]);
    }

    // Update the product details and images
    try {
      await axios.put(`/api/product/${id}/update`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Product updated successfully");
    } catch (err) {
      console.error("Error updating the product", err);
      alert("Error updating product");
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  if (!product) {
    return <p>Loading product details...</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Update Product</h1>

      <form onSubmit={handleSubmit}>
        {/* Product Name */}
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Name</label>
          <input
            type="text"
            value={product[0].name}
            onChange={(e) =>
              setProduct({ ...product, name: e.target.value })
            }
            className="border border-gray-300 p-2 w-full"
            required
            />
            
        </div>

        {/* Product Description */}
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">
            Description
          </label>
          <textarea
            value={product[0].description}
            onChange={(e) =>
              setProduct({ ...product, description: e.target.value })
            }
            className="border border-gray-300 p-2 w-full"
            required
          />
        </div>

        {/* Product Price */}
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Price</label>
          <input
            type="number"
            value={product[0].price}
            onChange={(e) =>
              setProduct({ ...product, price: e.target.value })
            }
            className="border border-gray-300 p-2 w-full"
            required
            />
            {console.log(product[0].images)}
        </div>
            
        {/* Display Existing Product Images */}
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">
            Existing Images
          </label>
          <div className="flex space-x-2">
            {product[0].images && product[0].images.length > 0 ? (
              product[0].images.map((image, index) => (
                <img
                  key={index}
                  src={`/images/${image}`}
                  alt={`Product Image ${index + 1}`}
                  className="w-32 h-32 object-cover"
                />
              ))
            ) : (
              <p>No images available</p>
            )}
          </div>
        </div>

        {/* Select New Images */}
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">
            Upload New Images
          </label>
          <input
            type="file"
            multiple
            onChange={handleFileChange}
            className="border border-gray-300 p-2 w-full"
          />
          {/* Preview Selected Images */}
          {previewImages.length > 0 && (
            <div className="flex space-x-2 mt-2">
              {previewImages.map((preview, index) => (
                <img
                  key={index}
                  src={preview}
                  alt={`Preview Image ${index + 1}`}
                  className="w-32 h-32 object-cover"
                />
              ))}
            </div>
          )}
        </div>

        {/* Submit Button */}
        <div className="mb-4">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
            disabled={loading}
          >
            {loading ? "Updating..." : "Update Product"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductUpdate;
