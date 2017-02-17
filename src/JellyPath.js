/* @flow */
import React from "react"

import abs from "abs-svg-path"
import normalize from "normalize-svg-path"
import parse from "parse-svg-path"
import {
  jellyConfig,
  JellyPoint,
} from "./jellify"

export default class JellyPath extends React.Component {
  points: JellyPoint[];

  constructor(props: Props) {
    super(props)
    this.points = normalize(abs(parse(props.d))).map(el => new JellyPoint(el, jellyConfig))
  }

  render() {
    this.points.forEach(p => p.update(this.context.mouseX, this.context.mouseY))
    const path = this.points.map(p => p.toSVG()).join(" ")

    const props = {
      ...this.props,
      d: path,
    }
    return (
      <path {...props}/>
    )
  }
}

JellyPath.contextTypes = {
  mouseX: React.PropTypes.number,
  mouseY: React.PropTypes.number,
  hovered: React.PropTypes.bool,
}

type Props = {
  d: string
}
