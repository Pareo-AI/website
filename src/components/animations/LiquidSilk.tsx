'use client'

import { useEffect, useRef } from 'react'

// hsl(238, 61%, 54%) → rgb(66, 71, 209) — site primary
const P = { r: 72, g: 68, b: 212 }

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  life: number
  maxLife: number
  size: number
  phase: number
}

export function LiquidSilk({ className = '' }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let W = 0, H = 0, CX = 0, CY = 0
    let raf = 0
    let t = 0

    const RING_R = 56
    const PULL_R = 400
    const N = 320

    const particles: Particle[] = []

    const spawn = (scatter = false): Particle => {
      let x: number, y: number
      if (scatter) {
        x = Math.random() * W
        y = Math.random() * H
      } else {
        const side = Math.floor(Math.random() * 4)
        if (side === 0) { x = Math.random() * W; y = -8 }
        else if (side === 1) { x = Math.random() * W; y = H + 8 }
        else if (side === 2) { x = -8; y = Math.random() * H }
        else { x = W + 8; y = Math.random() * H }
      }
      return {
        x, y,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        life: scatter ? Math.random() * 350 : 0,
        maxLife: 320 + Math.random() * 380,
        size: 0.9 + Math.random() * 1.8,
        phase: Math.random() * Math.PI * 2,
      }
    }

    const resize = () => {
      W = canvas.width = window.innerWidth
      H = canvas.height = window.innerHeight
      CX = W / 2
      CY = H / 2
      particles.length = 0
      for (let i = 0; i < N; i++) particles.push(spawn(true))
    }

    // Pseudo-noise flow field via sum of sines
    const flowAngle = (x: number, y: number): number =>
      (Math.sin(x * 0.003 + t * 0.007) * Math.cos(y * 0.005 + t * 0.006) +
       Math.cos(x * 0.006 - t * 0.005) * Math.sin(y * 0.004 + t * 0.008) * 0.5) * Math.PI

    const drawRing = () => {
      const pulse = Math.sin(t * 0.04) * 0.5 + 0.5

      // Outer diffuse halo
      const halo = ctx.createRadialGradient(CX, CY, RING_R * 0.6, CX, CY, RING_R * 4.2)
      halo.addColorStop(0, `rgba(${P.r}, ${P.g}, ${P.b}, ${0.13 + pulse * 0.04})`)
      halo.addColorStop(0.45, `rgba(${P.r}, ${P.g}, ${P.b}, ${0.05 + pulse * 0.02})`)
      halo.addColorStop(1, `rgba(${P.r}, ${P.g}, ${P.b}, 0)`)
      ctx.fillStyle = halo
      ctx.beginPath()
      ctx.arc(CX, CY, RING_R * 4.2, 0, Math.PI * 2)
      ctx.fill()

      // Frosted glass body
      const glass = ctx.createRadialGradient(CX - 14, CY - 14, 0, CX, CY, RING_R)
      glass.addColorStop(0, 'rgba(255, 255, 255, 0.25)')
      glass.addColorStop(0.65, 'rgba(240, 238, 255, 0.14)')
      glass.addColorStop(1, `rgba(${P.r}, ${P.g}, ${P.b}, 0.07)`)
      ctx.fillStyle = glass
      ctx.beginPath()
      ctx.arc(CX, CY, RING_R, 0, Math.PI * 2)
      ctx.fill()

      // Outer ring border with glow
      ctx.save()
      ctx.shadowColor = `rgba(${P.r}, ${P.g}, ${P.b}, 0.55)`
      ctx.shadowBlur = 14
      ctx.strokeStyle = `rgba(${P.r}, ${P.g}, ${P.b}, ${0.32 + pulse * 0.13})`
      ctx.lineWidth = 1.5
      ctx.beginPath()
      ctx.arc(CX, CY, RING_R, 0, Math.PI * 2)
      ctx.stroke()
      ctx.restore()

      // Inner subtle ring
      ctx.strokeStyle = `rgba(165, 160, 245, ${0.18 + pulse * 0.08})`
      ctx.lineWidth = 0.7
      ctx.beginPath()
      ctx.arc(CX, CY, RING_R * 0.62, 0, Math.PI * 2)
      ctx.stroke()

      // Core bright dot
      ctx.save()
      ctx.shadowColor = `rgba(${P.r}, ${P.g}, ${P.b}, 0.9)`
      ctx.shadowBlur = 10
      ctx.fillStyle = `rgba(255, 255, 255, ${0.8 + pulse * 0.18})`
      ctx.beginPath()
      ctx.arc(CX, CY, 3.2, 0, Math.PI * 2)
      ctx.fill()
      ctx.restore()
    }

    const drawRibbon = () => {
      const s = t * 0.011
      const ex = CX + W * 0.47
      const ey = CY + Math.sin(s * 0.72 + 2.0) * H * 0.07
      const cp1x = CX + W * 0.10
      const cp1y = CY + Math.sin(s) * H * 0.16
      const cp2x = CX + W * 0.27
      const cp2y = CY + Math.sin(s + 1.3) * H * 0.14

      // Wide atmospheric glow (no shadow, just alpha)
      const grd = ctx.createLinearGradient(CX, CY, ex, ey)
      grd.addColorStop(0,   `rgba(${P.r}, ${P.g}, ${P.b}, 0.025)`)
      grd.addColorStop(0.3, `rgba(${P.r}, ${P.g}, ${P.b}, 0.04)`)
      grd.addColorStop(0.75,`rgba(165, 160, 245, 0.025)`)
      grd.addColorStop(1,   `rgba(218, 215, 252, 0)`)
      ctx.strokeStyle = grd
      ctx.lineWidth = 38
      ctx.lineCap = 'round'
      ctx.beginPath()
      ctx.moveTo(CX, CY)
      ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, ex, ey)
      ctx.stroke()

      // Mid glow
      const grd2 = ctx.createLinearGradient(CX, CY, ex, ey)
      grd2.addColorStop(0,   `rgba(${P.r}, ${P.g}, ${P.b}, 0.07)`)
      grd2.addColorStop(0.35,`rgba(${P.r}, ${P.g}, ${P.b}, 0.12)`)
      grd2.addColorStop(0.75,`rgba(155, 150, 238, 0.07)`)
      grd2.addColorStop(1,   `rgba(218, 215, 252, 0)`)
      ctx.strokeStyle = grd2
      ctx.lineWidth = 14
      ctx.beginPath()
      ctx.moveTo(CX, CY)
      ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, ex, ey)
      ctx.stroke()

      // Focused layer
      const grd3 = ctx.createLinearGradient(CX, CY, ex, ey)
      grd3.addColorStop(0,   `rgba(${P.r}, ${P.g}, ${P.b}, 0.22)`)
      grd3.addColorStop(0.4, `rgba(${P.r}, ${P.g}, ${P.b}, 0.35)`)
      grd3.addColorStop(0.78,`rgba(145, 138, 235, 0.2)`)
      grd3.addColorStop(1,   `rgba(218, 215, 252, 0)`)
      ctx.strokeStyle = grd3
      ctx.lineWidth = 5
      ctx.beginPath()
      ctx.moveTo(CX, CY)
      ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, ex, ey)
      ctx.stroke()

      // Bright silk core with shadow glow
      ctx.save()
      ctx.shadowColor = `rgba(${P.r}, ${P.g}, ${P.b}, 0.5)`
      ctx.shadowBlur = 8
      const grd4 = ctx.createLinearGradient(CX, CY, ex, ey)
      grd4.addColorStop(0,   `rgba(${P.r}, ${P.g}, ${P.b}, 0.9)`)
      grd4.addColorStop(0.45,`rgba(${P.r}, ${P.g}, ${P.b}, 0.95)`)
      grd4.addColorStop(0.8, `rgba(175, 170, 248, 0.65)`)
      grd4.addColorStop(1,   `rgba(218, 215, 252, 0)`)
      ctx.strokeStyle = grd4
      ctx.lineWidth = 1.4
      ctx.beginPath()
      ctx.moveTo(CX, CY)
      ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, ex, ey)
      ctx.stroke()
      ctx.restore()
    }

    const animate = () => {
      t++

      // Background trail (slight alpha = motion blur / silk trail)
      ctx.fillStyle = 'rgba(255, 255, 255, 0.87)'
      ctx.fillRect(0, 0, W, H)

      drawRibbon()

      for (const p of particles) {
        p.life++
        p.phase += 0.017

        if (p.life > p.maxLife) {
          Object.assign(p, spawn(false))
          continue
        }

        const dx = CX - p.x
        const dy = CY - p.y
        const dist = Math.sqrt(dx * dx + dy * dy)

        if (dist < RING_R * 0.48) {
          Object.assign(p, spawn(false))
          continue
        }

        const angle = flowAngle(p.x, p.y)
        const pull = Math.max(0, 1 - dist / PULL_R) * 0.019

        p.vx += Math.cos(angle) * 0.013 + (dx / dist) * pull
        p.vy += Math.sin(angle) * 0.013 + (dy / dist) * pull
        p.vx *= 0.964
        p.vy *= 0.964

        const spd = Math.sqrt(p.vx * p.vx + p.vy * p.vy)
        if (spd > 2.3) { p.vx *= 2.3 / spd; p.vy *= 2.3 / spd }

        p.x += p.vx
        p.y += p.vy

        const colorT = Math.max(0, Math.min(1, 1.25 - dist / (PULL_R * 0.62)))
        const r = Math.round(178 + (P.r - 178) * colorT)
        const g = Math.round(181 + (P.g - 181) * colorT)
        const b = Math.round(200 + (P.b - 200) * colorT)

        const lr = p.life / p.maxLife
        const alpha = Math.min(lr * 5, 1) * Math.min((1 - lr) * 5, 1) * 0.58

        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fill()
      }

      drawRing()

      raf = requestAnimationFrame(animate)
    }

    resize()
    window.addEventListener('resize', resize)
    animate()

    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(raf)
    }
  }, [])

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
        zIndex: 0,
      }}
    />
  )
}
