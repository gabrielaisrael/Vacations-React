import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import GradeIcon from "@material-ui/icons/Grade";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { teal } from "@material-ui/core/colors";

const tealcolor = teal["A400"];

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    margin: 50,
    backgroundColor: tealcolor,
  },
  media: {
    height: 0,
    paddingTop: "56.25%",
  },
}));

export default function Search(props) {
  const classes = useStyles();
  const isSearch = useSelector((state) => state.isSearch);
  const [searchArray, setSearchArray] = useState([]);

  useEffect(() => {
    console.log({
      Destination: props.search,
      "Date Go": props.dateGo,
      "Date Back": props.dateBack,
    });
    getSearch();
  }, [isSearch]);

  function getSearch() {
    fetch(`http://localhost:1003/vacations/search`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        descriptionVacation: props.search,
        dateGo: props.dateGo,
        dateBack: props.dateBack,
      }),
    })
      .then((data) => data.json())
      .then((res) => setSearchArray(res))
      .catch((err) => console.log(err));
  }

  return (
    <div>
      <h1 id="results">Results:</h1>
      <div className="vacations_list">
        {searchArray.map((results) => (
          <Card key={results.destination} className={classes.root}>
            <CardHeader title={results.destination} subheader="Israel" />
            <CardMedia
              className={classes.media}
              image={results.img_url}
              title={results.destination}
            />
            <CardContent>
              <Typography variant="h5" component="h5">
                {results.descriptionVacation}
              </Typography>
              <Typography variant="h6" component="h6">
                <b>Go :</b> {results.dateGo.split("T")[0]}
              </Typography>
              <Typography variant="h6" component="h6">
                <b>Back :</b> {results.dateBack.split("T")[0]}
              </Typography>
            </CardContent>
            <CardActions disableSpacing>
              <CardActions disableSpacing>
                <IconButton aria-label="add to favorites">
                  <GradeIcon id={results.vacationId} />
                </IconButton>
              </CardActions>
            </CardActions>
          </Card>
        ))}
      </div>
    </div>
  );
}
