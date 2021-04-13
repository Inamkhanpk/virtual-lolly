import React, { useState, useRef } from "react"
import Lolly from "../components/lolly"
import Header from "../components/header"
import { navigate } from "gatsby"
import { useQuery, useMutation, gql } from "@apollo/client"
import { useFormik } from "formik"
import * as Yup from "yup"
import shortid from "shortid"
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
  header:{
    textAlign:'center'
  },
  editorRoot:{
    display:'flex',
    justifyContent:'center'
  },
  colorSelectorContainer:{
    display:'flex',
    flexDirection:'column',
    margin:theme.spacing(2)
  },
  colorPickerLabel:{
    margin:theme.spacing(4),
    borderRadius:'50%',
    
    width: '25px'
  },
  formlabel:{
    margin:theme.spacing(2)
  }


}));


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
  const classes = useStyles();
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
    <Grid container >

      <Grid item xs={12} className={classes.header}>
      <Header
        mainHeadingText="VirtualLolly"
        secondaryHeadingText="because we all know someone who deserves some sugar"
      />
      </Grid>
    
      <Grid item xs={12} className={classes.editorRoot}>
        <Grid className={classes.LollyCreaterColorContainer}>
          <Lolly
            style="lollipopEditor"
            lollyTop={colorTop}
            lollyBot={colorBot}
            lollyMid={colorMid}
          />
          </Grid>

          <Grid className={classes.colorSelectorContainer}>
            
            <Grid >
            <label htmlFor="topFlavor" className="colorPickerLabel">
              <input
                className={classes.colorPickerLabel}
                value={colorTop}
                type="color"
                name="topFlavor"
                id="topFlavor"
                onChange={e => {
                  setcolorTop(e.target.value)
                }}
              ></input>
            </label>
            </Grid>
            
            <Grid >
            <label  htmlFor="midFlavor" >
              <input
                className={classes.colorPickerLabel}
                value={colorMid}
                type="color"
                name="midFlavor"
                id="midFlavor"
                onChange={e => {
                  setcolorMid(e.target.value)
                }}
              ></input>
            </label>
            </Grid>
            
            <Grid >
            <label htmlFor="botFlavor" className="colorPickerLabel">
              <input
                className={classes.colorPickerLabel}
                value={colorBot}
                type="color"
                name="botFlavor"
                id="botFlavor"
                onChange={e => {
                  setcolorBot(e.target.value)
                }}
              ></input>
            </label>
            </Grid>
            
         
        </Grid>
        
        <Grid>
        <form className="formContainer" onSubmit={formik.handleSubmit}>
            
           <Grid>
           <Grid item className={classes.formlabel}>
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
           </Grid>

           <Grid item className={classes.formlabel}>
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
          </Grid>

          <Grid item className={classes.formlabel}>
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
          </Grid>

          <Grid item className={classes.formlabel}>
          <Button className="submitButton" type="submit">
            Send
          </Button>
          </Grid>
          </Grid> 
        </form>
      
        </Grid>


      </Grid>
    </Grid>
  )
}
