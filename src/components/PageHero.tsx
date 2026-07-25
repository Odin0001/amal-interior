'use client'

import type { ReactNode } from 'react'
import { MeshGradient } from '@paper-design/shaders-react'

export default function PageHero({
  title,
  dir = 'ltr',
}: {
  title: ReactNode
  dir?: 'ltr' | 'rtl'
}) {
  return (
    <div className="w-full h-screen bg-black relative overflow-hidden">
      <MeshGradient
        className="w-full h-full absolute inset-0"
        colors={['#000000', '#1a1a1a', '#333333', '#ffffff']}
        speed={1}
      />

      {/* Lighting overlay effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/4 left-1/3 w-32 h-32 bg-gray-800/5 rounded-full blur-3xl animate-pulse"
          style={{ animationDuration: '3s' }}
        />
        <div
          className="absolute bottom-1/3 right-1/4 w-24 h-24 bg-white/2 rounded-full blur-2xl animate-pulse"
          style={{ animationDuration: '2s', animationDelay: '1s' }}
        />
        <div
          className="absolute top-1/2 right-1/3 w-20 h-20 bg-gray-900/3 rounded-full blur-xl animate-pulse"
          style={{ animationDuration: '4s', animationDelay: '0.5s' }}
        />
      </div>

      <div className="absolute inset-0 flex items-center justify-center pointer-events-none px-6">
        <h1
          className="text-white text-3xl sm:text-4xl lg:text-7xl font-bold text-center max-w-5xl leading-[1.1]"
          dir={dir}
        >
          {title}
        </h1>
      </div>
    </div>
  )
}
