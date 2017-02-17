/* @flow */
import React from "react"

type MouseCoord = {
  mouseX: number,
  mouseY: number
}
export default class SVGelly extends React.Component {

  position: MouseCoord

  state: {
    mouseX: number,
    mouseY: number,
    hovered: boolean,
  }

  animationId: number

  svg: HTMLElement

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
    const svgRect = this.svg.getBoundingClientRect()
    const mouseX = Math.round(event.touches[0].clientX - svgRect.left)
    const mouseY = Math.round(event.touches[0].clientY - svgRect.top)
    this.position = {
      mouseX,
      mouseY,
    }
  }
  onMouseMove = (event: SyntheticMouseEvent) => {
    event.preventDefault()
    const svgRect = this.svg.getBoundingClientRect()
    const mouseX = Math.round(event.clientX - svgRect.left)
    const mouseY = Math.round(event.clientY - svgRect.top)
    this.position = {
      mouseX,
      mouseY,
    }
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
      { props.children }
    </svg>
    )
  }
}

SVGelly.propTypes = {
  debug: React.PropTypes.bool,
}

SVGelly.childContextTypes = {
  mouseX: React.PropTypes.number,
  mouseY: React.PropTypes.number,
  hovered: React.PropTypes.bool,
}
