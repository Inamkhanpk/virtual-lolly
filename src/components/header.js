import React from "react"



export default function Header(props) {
  return (
    <div className="headerContainer">
      <h1>{props.mainHeadingText}</h1>
      <h3>{props.secondaryHeadingText}</h3>
    </div>
  )
}
