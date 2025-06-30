import React from 'react'

export function BoltFooter() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 py-8 mt-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center">
          <p className="text-sm text-gray-600">
            Made with{' '}
            <a 
              href="https://bolt.new" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-700 font-medium underline"
            >
              Bolt
            </a>
            {' '}⚡
          </p>
        </div>
      </div>
    </footer>
  )
}