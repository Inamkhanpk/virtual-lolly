import React from "react"
import Lolly from "../components/lolly"
import Header from "../components/header"
import { navigate } from "gatsby"
import Grid from "@material-ui/core/Grid"
import { makeStyles } from '@material-ui/core/styles';
import Button from "@material-ui/core/Button"
const useStyles = makeStyles((theme) => ({
  header:{
    textAlign:'center'
  },
  lolliesContainer:{
    display:'flex',
    justifyContent:'center'
  },
  createLollyButton:{
    textAlign:'center'
  }
}));


export default function Home() {
  const classes = useStyles();
  return (
    <Grid container>

      <Grid item xs={12}  className={classes.header}>
      <Header
        mainHeadingText="Virtual Lollypop"
        secondaryHeadingText="because we all someone who deserves some sugar"
        />
      </Grid >


      <Grid className={classes.lolliesContainer} item xs={12}>
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
      </Grid>

      <Grid item xs={12}  className={classes.createLollyButton}>
       <Button
        
        onClick={() => {
          navigate("/createNew")
        }}
      >
        Make a new lollipop to send to a friend
      </Button>
      </Grid>

    </Grid>
  )
}