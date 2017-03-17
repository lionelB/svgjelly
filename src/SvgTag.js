/* @flow */
import React from "react"

import type { MouseCoord } from "./types"

type Point = {
  x: number,
  y: number
}

export default class SVGelly extends React.Component {

  position: MouseCoord

  state: {
    mouseX: number,
    mouseY: number,
    hovered: boolean,
  }

  animationId: number

  svg: any
  origin: any

  constructor() {
    super()
    this.position = {
      mouseX: 0,
      mouseY: 0,
    }

    this.state = {
      mouseX: 0,
      mouseY: 0,
      hovered: false,
    }
  }

  getChildContext() {
    return {
      mouseX: this.position.mouseX,
      mouseY: this.position.mouseY,
      hovered: this.state.hovered,
    }
  }
  componentDidMount() {
    this.updatePosition()
  }

  updatePosition = () => {
    this.setState({
      mouseX: this.position.mouseX,
      mouseY: this.position.mouseY,
      hovered: this.state.hovered,
    })
    this.animationId = requestAnimationFrame(this.updatePosition)
  }

  componentWillUnmount() {
    cancelAnimationFrame(this.animationId)
  }

  onMouseEnter = () => {
    this.setState({
      hovered: true,
    })
  }

  onMouseLeave = () => {
    this.setState({
      hovered: false,
    })
  }

  onTouchMove = (event: SyntheticTouchEvent) => {
    event.preventDefault()
    const svgRect = this.origin.getBoundingClientRect()
    const x = Math.round(event.touches[0].clientX - svgRect.left)
    const y = Math.round(event.touches[0].clientY - svgRect.top)
    const { x: mouseX, y: mouseY } = this.toSvgCoord({ x, y })
    this.position = {
      mouseX,
      mouseY,
    }
  }

  onMouseMove = (event: SyntheticMouseEvent) => {
    event.preventDefault()
    const svgRect = this.origin.getBoundingClientRect()
    const x = Math.round(event.clientX - svgRect.left)
    const y = Math.round(event.clientY - svgRect.top)
    const { x: mouseX, y: mouseY } = this.toSvgCoord({ x, y })
    this.position = {
      mouseX,
      mouseY,
    }
  }

  toSvgCoord(point: Point) {
    const { x, y } = point
    const p = this.svg.createSVGPoint()
    const mat  = this.svg.getScreenCTM()
    mat.e = mat.f = 0

    p.x = x
    p.y = y

    return p.matrixTransform(mat.inverse())
  }

  render() {
    const props = {
      ...this.props,
      ref: svg => { this.svg = svg },
      onMouseEnter: this.onMouseEnter,
      onMouseLeave: this.onMouseLeave,
      onMouseMove: this.onMouseMove,
      onTouchStart: this.onMouseEnter,
      onTouchMove: this.onTouchMove,
      onTouchEnd: this.onMouseLeave,
    }

    return (
    <svg {...props}>
      <rect id="jelly-origin" ref={origin => { this.origin = origin }} fill="none" stroke="none" x="0" y="0" width="100%" height="100%" />
      { props.children }
    </svg>
    )
  }
}

SVGelly.childContextTypes = {
  mouseX: React.PropTypes.number,
  mouseY: React.PropTypes.number,
  hovered: React.PropTypes.bool,
}
