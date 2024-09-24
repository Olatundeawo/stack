import {useState, useEffect} from "react";
import axios from "axios";

function ProductCreate() {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: ''
    });
    const [images, setImages] = useState([]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleImageChange = (e) => {
        setImages(e.target.files);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = new FormData();

        data.append('name', formData.name);
        data.append('description', formData.description);
        data.append('price', formData.price);
        
        for (let i =0; i < images.length; i++) {
            data.append('images', images[i]);
        }

        try {
            const response = await axios.post('/api/product/create', data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log('Response:', response.data);
            alert('Product Created successfully!');
        } catch(err) {
            console.error('Error:', err);
            alert('Failed to create product');
        }
    };
    
    return (
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
  <div className="mb-4">
    <label className="block text-gray-700 font-bold mb-2">Name</label>
    <input
      type="text"
      name="name"
      value={formData.name}
      onChange={handleChange}
      required
      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>

  <div className="mb-4">
    <label className="block text-gray-700 font-bold mb-2">Description</label>
    <textarea
      name="description"
      value={formData.description}
      onChange={handleChange}
      required
      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>

  <div className="mb-4">
    <label className="block text-gray-700 font-bold mb-2">Price</label>
    <input
      type="number"
      name="price"
      value={formData.price}
      onChange={handleChange}
      required
      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>

  <div className="mb-6">
    <label className="block text-gray-700 font-bold mb-2">Images</label>
    <input
      type="file"
      multiple
      accept="image/*"
      onChange={handleImageChange}
      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>

  <button
    type="submit"
    className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200"
  >
    Create Product
  </button>
</form>

    )
}


export default ProductCreate;