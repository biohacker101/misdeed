import React, { useState } from 'react'
import Image from 'next/image'

export function MisdeedLogo({ className = "h-16" }: { className?: string }) {
  const [imageError, setImageError] = useState(false)

  if (imageError) {
    return (
      <div className={className}>
        <svg viewBox="0 0 540 180" className="h-full w-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M75 35C75 20 85 10 100 10C115 10 125 20 125 35" stroke="#1e40af" strokeWidth="8" fill="none" strokeLinecap="round"/>
          <circle cx="100" cy="35" r="8" fill="#1e40af"/>
          <text x="0" y="140" fontSize="90" fontWeight="bold" fill="#1e40af" fontFamily="Arial, sans-serif">m</text>
          <text x="75" y="140" fontSize="90" fontWeight="bold" fill="#1e40af" fontFamily="Arial, sans-serif">i</text>
          <text x="110" y="140" fontSize="90" fontWeight="bold" fill="#1e40af" fontFamily="Arial, sans-serif">s</text>
          <text x="160" y="140" fontSize="90" fontWeight="bold" fill="#1e40af" fontFamily="Arial, sans-serif">d</text>
          <text x="230" y="140" fontSize="90" fontWeight="bold" fill="#1e40af" fontFamily="Arial, sans-serif">e</text>
          <text x="290" y="140" fontSize="90" fontWeight="bold" fill="#1e40af" fontFamily="Arial, sans-serif">e</text>
          <text x="350" y="140" fontSize="90" fontWeight="bold" fill="#1e40af" fontFamily="Arial, sans-serif">d</text>
        </svg>
      </div>
    )
  }

  return (
    <div className={className}>
      <Image
        src="/misdeed-logo.png"
        alt="Misdeed Logo"
        width={400}
        height={120}
        className="h-full w-auto"
        priority
        onError={() => setImageError(true)}
      />
    </div>
  )
} 