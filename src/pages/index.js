import React from "react"
import Lolly from "../components/lolly"
import Header from "../components/header"
import { navigate } from "gatsby"

export default function Home() {
  return (
    <div>
      <Header
        mainHeadingText="Kuch Meetha Hojaye?"
        secondaryHeadingText="Aoo Khushiyaan Baantain..."
      />
      <div className="lolliesContainer">
        <Lolly style="lollipop" />
        <Lolly
          style="lollipop"
          lollyTop="#6b6bde"
          lollyBot="#4ac383"
          lollyMid="#d2ec27"
        />
        <Lolly
          style="lollipop"
          lollyTop="#b71616"
          lollyBot="#bf10f1"
          lollyMid="#10adf1"
        />
        <Lolly
          style="lollipop"
          lollyTop="#ffc107"
          lollyBot="#00a97e"
          lollyMid="#ec398f"
        />
      </div>

      <button
        className="createLollyButton"
        onClick={() => {
          navigate("/createNew")
        }}
      >
        Send a customized lolly to a friend
      </button>
    </div>
  )
}