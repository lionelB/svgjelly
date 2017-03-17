/* @flow */
import type { Config, MouseCoord, SvgSegment, WobblyPoint } from "./types"

export function toWobblyPoints(points: SvgSegment[]): WobblyPoint[] {
  const wobblyPoints = []
  const dx = 0
  const dy = 0

  for (let i = 0; i < points.length; i++) {
    const [command, ...coord] = points[i]

    if (command === "M") {
      const [x, y] = coord
      const x0 = x
      const y0 = y
      wobblyPoints.push({ command, cx1: 0, cy1: 0, cx2: 0, cy2: 0, x0, y0, x, y, dx, dy })
    }
    else {
      const [cx1, cy1, cx2, cy2, x, y] = coord
      const x0 = x
      const y0 = y
      wobblyPoints.push({ command, cx1, cy1, cx2, cy2, x0, y0, x, y, dx, dy })
    }
  }
  return wobblyPoints
}

export function updatePoints(mouse: MouseCoord, config: Config, points: WobblyPoint[]) {

  const { mouseX, mouseY } = mouse
  if (!mouseX || !mouseY) {
    return points
  }
  const { elasticity, damping, radius, viscosity } = config

  for (let i = 0; i < points.length; i++) {
    const p = points[i]
    p.dx += (p.x0 - p.x) / elasticity
    p.dy += (p.y0 - p.y) / elasticity

    const dx = p.x - mouseX
    const dy = p.y - mouseY

    const dist = Math.sqrt(dx * dx + dy * dy)

    if (dist <= radius) {
      const a = Math.atan2(dy, dx)
      p.dx += (Math.cos(a) * radius - dx) * (1 - damping)
      p.dy += (Math.sin(a) * radius - dy) * (1 - damping)
    }

    p.dx *= 1 - viscosity
    p.dy *= 1 - viscosity
    if (Math.abs(p.dx) < .001) {
      p.dx = 0
    }

    if (Math.abs(p.dy) < .001) {
      p.dy = 0
    }

    p.x += p.dx
    p.y += p.dy
    p.cx1 += p.dx
    p.cy1 += p.dy
    p.cx2 += p.dx
    p.cy2 += p.dy

  }
  return points
}

export function pointsToSvg(points: WobblyPoint[]): string {
  let out = ""
  for (let i = 0; i < points.length; i++) {
    const { command, x, y } = points[i]
    if (command === "M") {
      out += `M${x},${y}`
    }
    else {
      out += ` ${command}${x},${y} ${x},${y} ${x},${y}`
    }
  }
  return out
}
