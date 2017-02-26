/* @flow */

export const jellyConfig: Config = {
  radius: 75,
  elasticity: 3,
  viscosity: .05,
  damping: .9,
}
export type Config = {
  damping: number,
  elasticity: number,
  radius: number,
  viscosity: number,
}
