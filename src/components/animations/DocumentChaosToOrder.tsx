'use client'

import { useEffect, useRef } from 'react'

interface Document {
  x: number
  y: number
  targetX: number
  targetY: number
  rotation: number
  targetRotation: number
  chaos: boolean
  type: 'pdf' | 'excel' | 'xml' | 'email'
  color: string
  phase: number
  scale: number
  targetScale: number
  opacity: number
  homeX: number
  homeY: number
}

interface DocumentChaosToOrderProps {
  documentCount?: number
  className?: string
}

export function DocumentChaosToOrder({
  documentCount = 20,
  className = ''
}: DocumentChaosToOrderProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const documentsRef = useRef<Document[]>([])
  const animationFrameRef = useRef<number | undefined>(undefined)
  const phaseRef = useRef(0)
  const scrollYRef = useRef(0)
  const prevScrollYRef = useRef(0)
  const isScrollingRef = useRef(false)
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const stackPositionRef = useRef({ x: 0, y: 0 })
  const scrollStartTimeRef = useRef(0)
  const shouldStackRef = useRef(false)
  const stackTargetYRef = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const handleScroll = () => {
      prevScrollYRef.current = scrollYRef.current
      scrollYRef.current = window.scrollY

      const scrollDelta = scrollYRef.current - prevScrollYRef.current

      // User just started scrolling
      if (!isScrollingRef.current) {
        isScrollingRef.current = true
        scrollStartTimeRef.current = Date.now()
        shouldStackRef.current = false
        // Initialize stack target at current viewport center
        stackTargetYRef.current = window.innerHeight / 2
      } else if (shouldStackRef.current) {
        // Stack is active - flows with scroll but with organic drift
        stackTargetYRef.current -= scrollDelta * 0.5
      }

      // Stack position - center but with organic horizontal drift
      const time = Date.now() / 1000
      const driftX = Math.sin(time * 0.8) * 60

      stackPositionRef.current = {
        x: window.innerWidth / 2 + driftX,
        y: stackTargetYRef.current
      }

      // Reset timer for scroll end detection
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current)
      }

      scrollTimeoutRef.current = setTimeout(() => {
        isScrollingRef.current = false
        shouldStackRef.current = false
      }, 300)
    }

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      initDocuments()
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    const typeColors = {
      pdf: 'hsl(0 70% 55%)',
      excel: 'hsl(142 65% 45%)',
      xml: 'hsl(238 55% 58%)',
      email: 'hsl(217 75% 58%)'
    }

    const initDocuments = () => {
      const types: Array<'pdf' | 'excel' | 'xml' | 'email'> = ['pdf', 'excel', 'xml', 'email']
      const cols = 5
      const rows = 4
      const spacing = Math.min(90, canvas.width / (cols + 2))
      const startX = (canvas.width - (cols - 1) * spacing) / 2
      const startY = (canvas.height - (rows - 1) * spacing) / 2

      // Account for current scroll position
      const currentScrollY = window.scrollY
      const viewportCenterY = canvas.height / 2

      documentsRef.current = Array.from({ length: documentCount }, (_, i) => {
        const col = i % cols
        const row = Math.floor(i / cols)
        const type = types[i % types.length]

        // Each document gets a "home region" spread across the full width
        // Position relative to current viewport position
        const homeX = (i / documentCount) * canvas.width
        const homeY = viewportCenterY + (Math.random() * 0.6 - 0.3) * canvas.height

        return {
          x: homeX,
          y: homeY,
          targetX: startX + col * spacing,
          targetY: startY + row * spacing,
          rotation: (Math.random() - 0.5) * Math.PI * 0.8,
          targetRotation: 0,
          chaos: true,
          type,
          color: typeColors[type],
          phase: Math.random() * Math.PI * 2,
          scale: 0.8 + Math.random() * 0.4,
          targetScale: 1,
          opacity: 0.6 + Math.random() * 0.2,
          homeX,
          homeY
        }
      })
    }

    const drawDocument = (doc: Document, ctx: CanvasRenderingContext2D) => {
      ctx.save()
      ctx.translate(doc.x, doc.y)
      ctx.rotate(doc.rotation)
      ctx.scale(doc.scale, doc.scale)

      const size = 28
      const baseOpacity = doc.chaos ? doc.opacity * 0.5 : doc.opacity * 0.9

      // Soft shadow for depth
      if (!doc.chaos) {
        ctx.shadowColor = 'rgba(0, 0, 0, 0.1)'
        ctx.shadowBlur = 8
        ctx.shadowOffsetX = 0
        ctx.shadowOffsetY = 2
      }

      // Document body with gradient
      const gradient = ctx.createLinearGradient(-size / 2, -size / 2, size / 2, size * 1.4)
      gradient.addColorStop(0, `${doc.color.replace(')', ` / ${baseOpacity})`)}`)
      gradient.addColorStop(1, `${doc.color.replace(')', ` / ${baseOpacity * 0.7})`)}`)

      ctx.fillStyle = gradient
      ctx.strokeStyle = `${doc.color.replace(')', ` / ${baseOpacity * 0.3})`)}`
      ctx.lineWidth = 1.5

      // Rounded rectangle
      const radius = 3
      ctx.beginPath()
      ctx.roundRect(-size / 2, -size / 2, size, size * 1.4, radius)
      ctx.fill()
      ctx.stroke()

      ctx.shadowColor = 'transparent'
      ctx.shadowBlur = 0

      // Type indicator with better styling
      ctx.fillStyle = `hsl(0 0% 100% / ${baseOpacity * 1.2})`
      ctx.font = 'bold 9px system-ui, -apple-system, sans-serif'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'

      let label = ''
      if (doc.type === 'pdf') label = 'PDF'
      else if (doc.type === 'excel') label = 'XLS'
      else if (doc.type === 'xml') label = 'XML'
      else label = '✉'

      ctx.fillText(label, 0, -2)

      // Elegant checkmark when organized
      if (!doc.chaos) {
        ctx.strokeStyle = `hsl(142 70% 45% / ${baseOpacity * 1.1})`
        ctx.lineWidth = 2
        ctx.lineCap = 'round'
        ctx.lineJoin = 'round'

        const checkSize = 7
        ctx.beginPath()
        ctx.moveTo(-checkSize / 2, size / 4 + 2)
        ctx.lineTo(-checkSize / 4, size / 2.2 + 2)
        ctx.lineTo(checkSize / 2, -size / 4 + 2)
        ctx.stroke()
      }

      ctx.restore()
    }

    const animate = () => {
      // Subtle gradient background
      const bgGradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
      bgGradient.addColorStop(0, 'hsl(0 0% 100%)')
      bgGradient.addColorStop(1, 'hsl(240 20% 99%)')
      ctx.fillStyle = bgGradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      documentsRef.current.forEach((doc, i) => {
        doc.phase += 0.015

        if (isScrollingRef.current) {
          // Check if delay has passed (200ms after scroll start)
          const timeSinceScrollStart = Date.now() - scrollStartTimeRef.current
          if (timeSinceScrollStart > 200) {
            shouldStackRef.current = true
          }

          if (shouldStackRef.current) {
            // SCROLLING + DELAY PASSED: Flow together like a living organism
            const stackX = stackPositionRef.current.x
            const stackY = stackPositionRef.current.y

            // Organic grouping - each doc has its own wave motion within the group
            const waveX = Math.sin(doc.phase * 0.7 + i * 0.3) * 30
            const waveY = Math.cos(doc.phase * 0.5 + i * 0.2) * 20
            const formationOffsetX = (i - documentsRef.current.length / 2) * 8
            const formationOffsetY = Math.sin(i * 0.5) * 15 + i * 3

            const targetStackX = stackX + formationOffsetX + waveX
            const targetStackY = stackY + formationOffsetY + waveY

            // Smooth organic motion
            doc.x += (targetStackX - doc.x) * 0.08
            doc.y += (targetStackY - doc.y) * 0.08

            // Gentle rotation like swimming
            const targetRot = Math.sin(doc.phase * 0.3) * 0.15
            doc.rotation += (targetRot - doc.rotation) * 0.06

            doc.scale += (0.85 - doc.scale) * 0.06
            doc.chaos = false
          } else {
            // SCROLLING BUT DELAY NOT PASSED: Move with scroll to stay in place
            const scrollDelta = scrollYRef.current - prevScrollYRef.current
            doc.y -= scrollDelta // Move opposite to scroll to stay in place

            // Tiny breathing motion
            const floatX = Math.sin(doc.phase * 0.5) * 0.5
            const floatY = Math.cos(doc.phase * 0.3) * 0.5
            doc.x += floatX
            doc.y += floatY
            doc.chaos = true
          }

        } else {
          // NOT SCROLLING: Float around home region (spread across full width)
          const floatX = Math.sin(doc.phase * 0.5) * 80
          const floatY = Math.cos(doc.phase * 0.3) * 60
          const targetX = doc.homeX + floatX
          const targetY = doc.homeY + floatY
          const targetRot = Math.sin(doc.phase * 0.2) * 0.4

          doc.x += (targetX - doc.x) * 0.015
          doc.y += (targetY - doc.y) * 0.015
          doc.rotation += (targetRot - doc.rotation) * 0.015
          doc.scale += (0.8 + Math.sin(doc.phase * 0.3) * 0.1 - doc.scale) * 0.025
          doc.chaos = true
        }

        drawDocument(doc, ctx)
      })

      animationFrameRef.current = requestAnimationFrame(animate)
    }

    resize()
    window.addEventListener('resize', resize)
    animate()

    return () => {
      window.removeEventListener('resize', resize)
      window.removeEventListener('scroll', handleScroll)
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current)
      }
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [documentCount])

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 0
      }}
    />
  )
}
