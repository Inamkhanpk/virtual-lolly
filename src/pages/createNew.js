import React, { useState, useRef } from "react"
import Lolly from "../components/lolly"
import Header from "../components/header"
import { navigate } from "gatsby"
import { useQuery, useMutation, gql } from "@apollo/client"
import { useFormik } from "formik"
import * as Yup from "yup"
import shortid from "shortid"





const createLollyMutation = gql`
  mutation createLolly(
    $recipientName: String!
    $sendersName: String!
    $message: String!
    $flavorTop: String!
    $flavorMid: String!
    $flavorBot: String!
    $lollyPath: String!
  ) {
    createLolly(
      recipientName: $recipientName
      sendersName: $sendersName
      message: $message
      flavorTop: $flavorTop
      flavorMid: $flavorMid
      flavorBot: $flavorBot
      lollyPath: $lollyPath
    ) {
      message
      lollyPath
    }
  }
`

export default function CreateNew() {
  const [colorTop, setcolorTop] = useState("#d52368")
  const [colorBot, setcolorBot] = useState("#deaa10")
  const [colorMid, setcolorMid] = useState("#e95946")
  
  const formik = useFormik({
    initialValues: {
      recName: "",
      sendersName: "",
      message: "",
    },
    validationSchema: Yup.object({
      recName: Yup.string()
        .required("Required")
        .max(15, "Must be 15 characters or less"),
      sendersName: Yup.string()
        .required("Required")
        .max(15, "Must be 15 characters or less"),
      message: Yup.string().required("Required"),
    }),
    onSubmit: values => {
      const id = shortid.generate()

      const submitLollyForm = async () => {
        const result = await createLolly({
          variables: {
            recipientName: values.recName,
            sendersName: values.sendersName,
            message: values.message,
            flavorTop: colorTop,
            flavorMid: colorMid,
            flavorBot: colorBot,
            lollyPath: id,
          },
        })
      }

      submitLollyForm()

      navigate(`/lollies/${id}`)
    },
  })

  const [createLolly] = useMutation(createLollyMutation)
   
   
  return (
    <div>
      <Header
        mainHeadingText="Kuch Meetha Hojaye?"
        secondaryHeadingText="Add Some Toppings, Add Some Love..."
      />
    
      <div className="editorRoot">
        <div className="LollyCreaterColorContainer">
          <Lolly
            style="lollipopEditor"
            lollyTop={colorTop}
            lollyBot={colorBot}
            lollyMid={colorMid}
          />

          <div className="colorSelectorContainer">
            <label htmlFor="topFlavor" className="colorPickerLabel">
              <input
                className="colorPicker"
                value={colorTop}
                type="color"
                name="topFlavor"
                id="topFlavor"
                onChange={e => {
                  setcolorTop(e.target.value)
                }}
              ></input>
            </label>

            <label htmlFor="midFlavor" className="colorPickerLabel">
              <input
                className="colorPicker"
                value={colorMid}
                type="color"
                name="midFlavor"
                id="midFlavor"
                onChange={e => {
                  setcolorMid(e.target.value)
                }}
              ></input>
            </label>

            <label htmlFor="botFlavor" className="colorPickerLabel">
              <input
                className="colorPicker"
                value={colorBot}
                type="color"
                name="botFlavor"
                id="botFlavor"
                onChange={e => {
                  setcolorBot(e.target.value)
                }}
              ></input>
            </label>
          </div>
        </div>

        <form className="formContainer" onSubmit={formik.handleSubmit}>
          <label className="formLabel" htmlFor="sendName">
            To:
          </label>
          <div className="formErrors">
            {formik.errors.recName && formik.touched.recName
              ? formik.errors.recName
              : null}
          </div>
          <input
            className="inputText"
            type="text"
            name="recName"
            id="recName"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />

          <label className="formLabel" htmlFor="msg">
            Message:{" "}
          </label>
          <div className="formErrors">
            {formik.errors.message && formik.touched.message
              ? formik.errors.message
              : null}
          </div>
          <textarea
            id="message"
            name="message"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            className="inputTextBox"
            cols={30}
            rows={15}
          />

          <label className="formLabel" htmlFor="Recname">
            {" "}
            From:{" "}
          </label>
          <div className="formErrors">
            {formik.errors.sendersName && formik.touched.sendersName
              ? formik.errors.sendersName
              : null}
          </div>
          <input
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            className="inputText"
            type="text"
            name="sendersName"
            id="sendersName"
          />

          <button className="submitButton" type="submit">
            Send
          </button>
        </form>
      </div>
    </div>
  )
}
