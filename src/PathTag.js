/* @flow */
import React from "react"

import { jellyConfig } from "./config"

import abs from "abs-svg-path"
import normalize from "normalize-svg-path"
import parse from "parse-svg-path"

import type { WobblyPoint } from "./types"

import {
  toWobblyPoints,
  updatePoints,
  pointsToSvg,
} from "./JellyPoint"

export default class JellyPath extends React.Component {
  points: WobblyPoint[];

  constructor(props: Props) {
    super(props)
    this.points = toWobblyPoints(normalize(abs(parse(props.d))))
  }

  render() {
    const mouseCoord = {
      mouseX: this.context.mouseX,
      mouseY: this.context.mouseY,
    }

    updatePoints(mouseCoord, jellyConfig, this.points)
    const path = pointsToSvg(this.points)

    const props = {
      ...this.props,
      d: path,
    }
    return (
      <path {...props} />
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
