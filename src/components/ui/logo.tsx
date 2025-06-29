import React from 'react'
import Image from 'next/image'

export function MisdeedLogo({ className = "h-16" }: { className?: string }) {
  return (
    <div className={className}>
      {/* Using the actual logo image - fallback to SVG if image not found */}
      <Image
        src="/misdeed-logo.png"
        alt="Misdeed Logo"
        width={400}
        height={120}
        className="h-full w-auto"
        priority
        onError={(e) => {
          // Fallback to SVG if image not found
          const target = e.target as HTMLImageElement;
          target.style.display = 'none';
          const parent = target.parentElement;
          if (parent) {
            parent.innerHTML = `
              <svg viewBox="0 0 540 180" class="h-full w-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M75 35C75 20 85 10 100 10C115 10 125 20 125 35" stroke="#1e40af" stroke-width="8" fill="none" stroke-linecap="round"/>
                <circle cx="100" cy="35" r="8" fill="#1e40af"/>
                <text x="0" y="140" font-size="90" font-weight="bold" fill="#1e40af" font-family="Arial, sans-serif">m</text>
                <text x="75" y="140" font-size="90" font-weight="bold" fill="#1e40af" font-family="Arial, sans-serif">i</text>
                <text x="110" y="140" font-size="90" font-weight="bold" fill="#1e40af" font-family="Arial, sans-serif">s</text>
                <text x="160" y="140" font-size="90" font-weight="bold" fill="#1e40af" font-family="Arial, sans-serif">d</text>
                <text x="230" y="140" font-size="90" font-weight="bold" fill="#1e40af" font-family="Arial, sans-serif">e</text>
                <text x="290" y="140" font-size="90" font-weight="bold" fill="#1e40af" font-family="Arial, sans-serif">e</text>
                <text x="350" y="140" font-size="90" font-weight="bold" fill="#1e40af" font-family="Arial, sans-serif">d</text>
              </svg>
            `;
          }
        }}
      />
    </div>
  )
} 