import React from "react"
import ReactDOM from "react-dom"

import { SvgJelly } from "SvgJelly"
import Shape from "./Shape"

const JellyShape = SvgJelly(Shape)

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "stretch",
    height: "100%",
    width: "100%",
  },
}

ReactDOM.render(
  <div style={styles.container}>
    <JellyShape debug width="100%" height="100%" />
  </div>
  ,
  document.getElementById("root")
)

