/* eslint-disable no-unused-vars */
import React from "react";


function About() {
    return(
        <div>
        <section className="w-full bg-white text-black p-8 border-t-4 border-black max-w-5xl mx-auto rounded-lg shadow-md">
          <h3 className="text-3xl font-extrabold mb-6 text-center">About Us</h3>
          <h5 className="text-xl font-semibold text-gray-600 mb-4 text-center">Welcome to Hollartkiddies – Where beauty begins...</h5>
          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            At Hollartkiddies, we are dedicated to providing the finest in children’s fashion, accessories, and essentials.
            Located at the heart of Ibadan, at No. 5, Oja Oba, we pride ourselves on being a trusted destination for parents
            who seek quality, style, and comfort for their little ones. Our mission is to ensure every child is dressed in the best,
            with a collection that combines elegance, comfort, and durability. From casual wear to special occasion outfits, 
            Hollartkiddies curates a range of products that inspire confidence and showcase the beauty of childhood.
          </p>
          
          <h4 className="text-2xl font-bold mb-4">What We Offer</h4>
          <ul className="list-disc list-inside mb-6 space-y-3 text-gray-700">
            <li><strong>Fashion-forward Designs</strong>: Carefully selected pieces that reflect the latest trends while maintaining the playful innocence of childhood.</li>
            <li><strong>Premium Quality</strong>: We believe in offering only the best fabrics and materials to ensure your child’s comfort, no matter the occasion.</li>
            <li><strong>Affordable Pricing</strong>: Style doesn’t have to come with a hefty price tag. We provide premium clothing options at prices that fit every budget.</li>
            <li><strong>Customer-Centered Service</strong>: We strive to offer a seamless shopping experience, both in-store and online, with a focus on customer satisfaction and personalized service.</li>
          </ul>
      
          <h4 className="text-2xl font-bold mb-4">Why Choose Us?</h4>
          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            At Hollartkiddies, we understand that every child is unique, and their clothing should reflect that individuality. Our store is not just a place to shop; it’s a space where parents and children can explore fashion in a fun, welcoming environment.
          </p>
          
          <p className="text-lg text-gray-700 leading-relaxed">
            Whether you’re shopping for everyday essentials or something special for a memorable occasion, Hollartkiddies has you covered.
          </p>
        </section>
      </div>
      

    )
}


export default About;