/* @flow */
export type Config = {
  damping: number,
  elasticity: number,
  radius: number,
  viscosity: number,
}

export type MouseCoord = {
  mouseX: number,
  mouseY: number,
}

export type Instruction = string

export type SvgSegment = [ Instruction, number, number, number, number, number, number ]

export type WobblyPoint = {
  command: string,
  x0: number,
  y0: number,
  cx1: number,
  cy1: number,
  cx2: number,
  cy2: number,
  x: number,
  y:number,
  dx: number,
  dy: number,
}
