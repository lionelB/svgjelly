import { JellyPoint } from "./JellyPoint"

describe("JellyPoint", () => {
  describe("constructor", () => {
    it("should initialize Move point", () => {
      const point = new JellyPoint(["M", 10, 20])
      expect(point.command).toBe("M")
      expect(point.x).toBe(10)
      expect(point.y).toBe(20)
      expect(point.coord).toEqual({
        x: 10,
        y: 20,
      })
    })
    it("should initialize Curve point", () => {
      const point = new JellyPoint(["C", 5, 15, 25, 35, 10, 20])
      expect(point.command).toBe("C")
      expect(point.x).toBe(10)
      expect(point.y).toBe(20)
      expect(point.coord).toEqual({
        x: 10,
        y: 20,
        x1: 5,
        y1: 15,
        x2: 25,
        y2: 35,
      })
    })
  })

  describe("toSVG", () => {
    it("should return the Svg path representation of a Move point", () => {
      const point = new JellyPoint(["M", 10, 20])
      expect(point.toSVG()).toBe("M10,20")
    })
    it("should return the Svg path representation of a Curve point", () => {
      const point = new JellyPoint(["C", 5, 15, 6, 16, 10, 20])
      expect(point.toSVG()).toBe("C10,20 10,20 10,20")
    })
  })
})
