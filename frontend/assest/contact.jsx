import React from "react";

export default function Contact() {
    return (
        <div className="bg-gray-100 py-6 px-4 sm:px-6 lg:px-8 w-full">
            <div className="max-w-4xl mx-auto text-center bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-2xl font-extrabold text-gray-800 mb-4">Get in Touch</h3>
                <p className="text-lg text-gray-600 mb-6">
                    You can contact us using the following platforms:
                </p>
                <div className="flex flex-col sm:flex-row sm:flex-wrap gap-4 text-lg font-medium text-gray-700">
                    <ul className="flex flex-col sm:flex-row sm:flex-wrap gap-4 w-full">
                        <li className="hover:text-blue-500 transition-colors">
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>
                        </li>
                        <li className="hover:text-blue-500 transition-colors">
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a>
                        </li>
                        <li className="hover:text-blue-500 transition-colors">
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
                        </li>
                        <li className="hover:text-blue-500 transition-colors">
                        <a href="https://whatsapp.com" target="_blank" rel="noopener noreferrer">WhatsApp</a>
                        </li>
                        <li className="hover:text-blue-500 transition-colors">
                        <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer">TikTok</a>
                        </li>
                    </ul>
                </div>

            </div>
        </div>
    );
}
