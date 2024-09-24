import { useState } from 'react'
import Routing from '../assest/routes'
import './index.css';



function App() {
  
  return (
    <div>

      <div className="max-h-full w-full bg-white-600">
        
        <Routing />


      </div>
      
        <footer className='w-full bg-gray-800 text-white text-center p-4'>
        <p>

         Multiple Backends: You can set up as many proxies as you need, each pointing to different services (e.g., microservices, static file servers).
          CORS Issues: By using a proxy, Vite handles CORS issues for you, as requests from the frontend will appear to come from the same origin as the Vite dev server.
          Serving Files: If you're using the /uploads proxy for serving images, make sure your backend serves the files correctly (as mentioned in previous answers).
          By setting up multiple proxies in Vite's configuration, you can easily route requests to different backends during development without worrying about CORS or other network-related issues.
        </p>
          </footer>
    </div>
  )
}

export default App
