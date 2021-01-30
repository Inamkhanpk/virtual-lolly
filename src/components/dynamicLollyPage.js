import React from "react"
import Lolly from "./lolly"
import { graphql } from "gatsby"
import Header from "./header"

export const query = graphql`
  query MyQuery($lollyPath: String!) {
    LOLLIES {
      getLollyByPath(lollyPath: $lollyPath) {
        flavorBot
        flavorMid
        flavorTop
        lollyPath
        message
        recipientName
        sendersName
      }
    }
  }
`

export default function DynamicLollyPage({ data }) {

  return (
    <div>
      <Header
        mainHeadingText="Kuch Meetha Hojaye?"
        secondaryHeadingText="You recieved a lolly, dont eat it alone !"
      />
      <h5 className="sharableLinkContainer">Your sharable link: </h5>{" "}
      <span className="sharableLink">
        {" "}
        {`https://sharelolly.netlify.app/lollies/${data.LOLLIES.getLollyByPath.lollyPath}`}
      </span>
      <div className="recievedContentContainer">
        <Lolly
          style="lollyRecieved"
          lollyTop={data.LOLLIES.getLollyByPath.flavorTop}
          lollyMid={data.LOLLIES.getLollyByPath.flavorMid}
          lollyBot={data.LOLLIES.getLollyByPath.flavorBot}
        />

        <div className="recievedTextContainer">
          <h3>HI {data.LOLLIES.getLollyByPath.recipientName.toUpperCase()}</h3>
          <p>{data.LOLLIES.getLollyByPath.message}</p>
          <h4>From: {data.LOLLIES.getLollyByPath.sendersName}</h4>
        </div>
      </div>
    </div>
  )
}
