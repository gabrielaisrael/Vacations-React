import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

export default function UpdateVacations(props) {
  const useStyles = makeStyles((theme) => ({
    margin: {
      margin: theme.spacing(1),
    },
    extendedIcon: {
      marginRight: theme.spacing(1),
    },
  }));

  const classes = useStyles();
  const dispatch = useDispatch();
  const followRed = useSelector((state) => state.followRed);
  const [descriptionVacation, setDescriptionVacation] = useState("");
  const [destination, setDestination] = useState("");
  const [img_url, setImgUrl] = useState("");
  const [price, setPrice] = useState("");
  const [dateGo, setDateGo] = useState("");
  const [dateBack, setDateBack] = useState("");
  const [allVacations, setAllVacations] = useState([]);

  function UpdateVacations() {
    fetch("http://localhost:1003/admin/update/" + props.v.vacationId, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
      body: JSON.stringify({
        descriptionVacation,
        destination,
        img_url,
        dateGo,
        dateBack,
        price,
      }),
    }).then(closeModal());
  }

  function getAllVacations() {
    fetch("http://localhost:1003/vacations")
      .then((data) => data.json())
      .then((res) => setAllVacations(res));
  }

  function closeModal() {
    props.setIsOpen(false);
    getAllVacations();
    window.location.reload();
  }
  useEffect(() => {}, [followRed]);

  return (
    <div>
      <form className={classes.root} noValidate autoComplete="off">
        <div id="update_div">
          <span className="close_up" onClick={closeModal}>
            {" "}
            X{" "}
          </span>
          <h3> Update a vacation </h3>
          <TextField
            id="vacation_description"
            label="Description"
            onChange={(e) => setDescriptionVacation(e.target.value)}
          />
          <br />
          <TextField
            id="vacation_destination"
            label="Destination"
            onChange={(e) => setDestination(e.target.value)}
          />
          <br />
          <TextField
            id="vacation_img"
            label="Img-Url"
            onChange={(e) => setImgUrl(e.target.value)}
          />
          <br />
          <TextField
            id="vacation_price"
            type="number"
            label="Price"
            onChange={(e) => setPrice(e.target.value)}
          />
          <br />
          <br />

          <label>Go: </label>
          <input type="date" onChange={(e) => setDateGo(e.target.value)} />
          <br />
          <label>Back: </label>
          <input type="date" onChange={(e) => setDateBack(e.target.value)} />
          <br />
          <Button
            onClick={UpdateVacations}
            variant="contained"
            size="large"
            color="primary"
            className={classes.margin}
          >
            SAVE
          </Button>
        </div>
      </form>
    </div>
  );
}
