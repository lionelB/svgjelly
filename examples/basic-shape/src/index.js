import React from "react"
import ReactDOM from "react-dom"

import { SvgJelly } from "SvgJelly"

// import Shape from "./Shape"
// import Meteor from "./Meteor"
import Europe from "./Europe"

const Jelly = SvgJelly(Europe)

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
    <Jelly debug width="100%" height="100%" />
  </div>
  ,
  document.getElementById("root")
)

