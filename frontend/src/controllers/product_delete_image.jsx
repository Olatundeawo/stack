import React, { useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const ProductDeleteImage = () => {
    const { id, imageId } = useParams();
    const navigate = useNavigate();

    const deleteProduct = async () => {

        try {
          const token = localStorage.getItem('token'); 
            await axios.delete(`/api/product/${id}/image/${imageId}`, {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data",
              },
            });
            alert("Product delete successfully");
            navigate('/')
          } catch (err) {
            console.error("Error updating the product", err);
            alert("Error updating product");
          } 
    }

    useEffect(() => {
        deleteProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
}


export default ProductDeleteImage;