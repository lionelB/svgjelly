/* @flow */
import type { Config } from "./config"

type PathPoint = ['M' | 'C', number, number, number, number, number, number, number]

class Point {
  x: number
  y: number

  constructor(x, y) {
    this.x = x
    this.y = y
  }
  add(p) {
    return new Point(this.x + p.x, this.y + p.y)
  }
  subtract(p) {
    return new Point(this.x - p.x, this.y - p.y)
  }
  length() {
    return Math.sqrt(this.x * this.x + this.y * this.y)
  }
  normalize(length = 0) {
    const factor = length / this.length()
    return new Point(this.x * factor, this.y * factor)
  }
}

export class JellyPoint {
  x: number
  y: number
  offsetX: number
  offsetY: number

  command: string

  coord: {
    x: number,
    y: number,
    x1?: number,
    y1?: number,
    x2?: number,
    y2?: number,
  }

  settings: Config

  constructor([command, ...coord]: PathPoint, settings: Config) {
    this.command = command
    if (command === "M") {
      const [x, y] = coord
      this.x = x
      this.y = y
      this.coord = { x, y }
    }
    else {
      const [x1, y1, x2, y2, x, y] = coord
      this.x = x
      this.y = y
      this.coord = { x, y, x1, y1, x2, y2 }
    }
    this.settings = { ...settings }
    this.offsetX = 0
    this.offsetY = 0
  }

  update(mouseX: number = 0, mouseY: number = 0) {
    if (!mouseX || !mouseY) {
      return
    }
    this.offsetX += (this.coord.x - this.x) / this.settings.elasticity
    this.offsetY += (this.coord.y - this.y) / this.settings.elasticity

    const delta = new Point(this.x, this.y).subtract({ x: mouseX, y: mouseY })

    if (delta.length() <= this.settings.radius) {
      const a = Math.atan2(delta.y, delta.x)
      this.offsetX += (Math.cos(a) * this.settings.radius - delta.x) * (1 - this.settings.damping)
      this.offsetY += (Math.sin(a) * this.settings.radius - delta.y) * (1 - this.settings.damping)
    }

    this.offsetX *= 1 - this.settings.viscosity
    this.offsetY *= 1 - this.settings.viscosity
    if (Math.abs(this.offsetX) < .001) {
      this.offsetX = 0
    }
    if (Math.abs(this.offsetY) < .001) {
      this.offsetY = 0
    }

    this.x += this.offsetX
    this.y += this.offsetY
  }

  toSVG() {
    if (this.command === "M") {
      return `M${this.x},${this.y}`
    }
    else {
      return `${this.command}${this.x},${this.y} ${this.x},${this.y} ${this.x},${this.y}`
    }
  }
}
