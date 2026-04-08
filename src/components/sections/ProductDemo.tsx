'use client'

import { Play } from 'lucide-react'
import { useState } from 'react'

export function ProductDemo() {
  const [showVideo, setShowVideo] = useState(false)

  return (
    <section className="py-24 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-block mb-4">
            <span className="bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-medium flex items-center gap-2">
              <Play className="h-4 w-4" />
              Product Demo
            </span>
          </div>
          <h2 className="text-3xl font-bold sm:text-4xl">See Pareo In Action</h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
            Watch how Pareo transforms a customer request from supplier documents to compliant output in minutes.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="relative rounded-xl overflow-hidden shadow-2xl border bg-card">
            {!showVideo ? (
              <button
                onClick={() => setShowVideo(true)}
                className="relative w-full aspect-video bg-muted group cursor-pointer"
                aria-label="Play product demo video"
              >
                <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition">
                  <div className="bg-primary rounded-full p-6 group-hover:scale-110 transition">
                    <Play className="h-12 w-12 text-primary-foreground" fill="currentColor" />
                  </div>
                </div>
              </button>
            ) : (
              <video
                controls
                autoPlay
                className="w-full aspect-video"
                preload="none"
              >
                <source src="/videos/PareoAI_product_intro.mp4?v=2" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            )}
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 rounded-lg bg-muted/50">
              <div className="text-2xl font-bold text-primary mb-1">5-10 min</div>
              <div className="text-sm text-muted-foreground">Processing time for 100 products</div>
            </div>
            <div className="text-center p-4 rounded-lg bg-muted/50">
              <div className="text-2xl font-bold text-primary mb-1">95%+</div>
              <div className="text-sm text-muted-foreground">Automatic extraction accuracy</div>
            </div>
            <div className="text-center p-4 rounded-lg bg-muted/50">
              <div className="text-2xl font-bold text-primary mb-1">Hours</div>
              <div className="text-sm text-muted-foreground">Not days for customer responses</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
