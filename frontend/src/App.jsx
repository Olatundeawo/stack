import { useState } from 'react'
import Routing from '../assest/routes'
import './index.css';



function App() {
  
  return (
    <div>

      <div className="max-h-full w-full bg-white-600">
        
        <Routing />


      </div>
      
          <footer className="w-full bg-gray-900 text-white text-center py-6">
            <div className="max-w-4xl mx-auto">
              <p className="text-gray-400 text-sm">© 2024 Hollartkiddies. All rights reserved.</p>
              <p className="mt-2 text-gray-300">
                Made with <span className="text-red-500">♥</span> by 
                <a href="https://twitter.com/bokinsin/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline ml-1">Babatunde</a>
              </p>
            </div>
          </footer>

    </div>
  )
}

export default App
