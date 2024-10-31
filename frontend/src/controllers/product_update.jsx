import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const ProductUpdate = () => {
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    images: []
  });
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);
  const [loading, setLoading] = useState(false); // Track form submission state
  const [hover, setHover] = useState(null);
  const [image, setImage] = useState([]);
  
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`/api/product/${id}`);
        setProduct(response.data);
        let image = response.data[0].images
        setImage(image)
        
      } catch (error) {
        console.error("Error fetching product", error);
        alert("Error fetching product details");
      }
    };
    fetchProduct();
  }, [id]);


  // Handle mouse over on the existing pic
  const handleMouseOver = (index) => {
    setHover(index);
  }

  // Handle mouse out on the existing pic
  const handleMouseOut = () => setHover(null);
  
  // Delete a particular image when you mouse over
  const handleImageDelete = async (id, imageId) => {
    if (confirm('Are you sure You want to delete this item?'))
      {
  
        try {
          const token = localStorage.getItem('token');
          await axios.delete(`/api/product/${id}/image/${imageId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          });
        } catch (err) {
          console.error("Error updating the product", err);
          alert("Error updating product");
        } 
        const updatedImage = image.filter((image) => image.id !== imageId);
        setImage(updatedImage);
      }
  }

 

 

  const handleProductChange = (e, index, field) => {
    const updatedProducts = [...product];
    updatedProducts[index] = {
      ...updatedProducts[index],
      [field]: e.target.value
    };
    setProduct(updatedProducts);
  };


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
      let token = localStorage.getItem('token')
      await axios.put(`/api/product/${id}/update`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Product updated successfully");
      navigate('/')
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
        {Array.isArray(product) && product.map((product, index) => (
          <div key={product.product_id}>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Name</label>
          <input
            type="text"
            value={product.name || ''}
            onChange={(e) => handleProductChange(e, index, 'name')}
            className="border border-gray-300 p-2 w-full"
            required
            
            />
            
        </div>
           
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">
            Description
          </label>
          <textarea
            value={product.description}
            onChange={(e) => handleProductChange(e, index, 'description')}
            className="border border-gray-300 p-2 w-full"
            required
          />
           

        </div>

        {/* Product Price */}
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Price</label>
          <input
            type="number"
            value={product.price}
            onChange={(e) => handleProductChange(e, index, 'price')}
            className="border border-gray-300 p-2 w-full"
            required
            />
            
        </div>
            
        {/* Display Existing Product Images */}
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">
            Existing Images
          </label>
          
          <div className="flex space-x-2 relative inline-block">
            {image && image.length > 0 ? (
              image.map((image, index) => (     
                <div className="relative" key={image.id}
                onMouseOver={() => handleMouseOver(index)}
                onMouseOut={handleMouseOut}
                >
                  <img
                    key={index}
                    src={`/images/${image.image_path}`}
                    alt={`Product Image ${index + 1}`}
                    className="w-32 h-32 object-cover"
                    />
                {hover === index && (
                  <p  className="absolute top-2 right-2 bg-red-500 text-white p-1"
                  onClick={() => handleImageDelete(product.product_id, image.id)}
                  style={{ cursor: 'pointer' }} >
                    X
                  </p>
                )}
                {/* {console.log(image)} */}
                </div>
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
          </div>
        
        ))}
      </form>
    </div>
  );
};

export default ProductUpdate;
