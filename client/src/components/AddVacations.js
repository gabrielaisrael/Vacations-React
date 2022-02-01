import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

export default function AddVacations(props) {
  const useStyles = makeStyles((theme) => ({
    margin: {
      margin: theme.spacing(1),
    },
    extendedIcon: {
      marginRight: theme.spacing(1),
    },
  }));

  const classes = useStyles();
  const followRed = useSelector((state) => state.followRed);
  const [descriptionVacation, setDescriptionVacation] = useState("");
  const [destination, setDestination] = useState("");
  const [img_url, setImgUrl] = useState("");
  const [price, setPrice] = useState("");
  const [dateGo, setDateGo] = useState("");
  const [dateBack, setDateBack] = useState("");
  const [allVacations, setAllVacations] = useState([]);

  function closeModal() {
    props.setIsOpen(false);

    getAllVacations();
    window.location.reload();
  }

  function getAllVacations() {
    fetch("http://localhost:1003/vacations")
      .then((data) => data.json())
      .then((res) => setAllVacations(res));
    // .catch((err) => { })
  }

  function addVacation() {
    fetch("http://localhost:1003/admin/add", {
      method: "post",
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
    })
      .then((res) => setAllVacations(res))
      .then(closeModal());
  }

  useEffect(() => {
    getAllVacations();
  }, [followRed]);

  return (
    <div id="modal_bg">
      <form className={classes.root} noValidate autoComplete="off">
        <div id="form_bg">
          <span id="close" onClick={closeModal}>
            {" "}
            X{" "}
          </span>
          <h2 className="form_header">New Vacation:</h2>
          <TextField
            label="Description"
            onChange={(e) => setDescriptionVacation(e.target.value)}
          />
          <br />
          <TextField
            label="Destination"
            onChange={(e) => setDestination(e.target.value)}
          />
          <br />
          <TextField
            label="Img_Url"
            onChange={(e) => setImgUrl(e.target.value)}
          />
          <br />
          <TextField
            type="number"
            label="Price"
            onChange={(e) => setPrice(e.target.value)}
          />
          <br />
          <label> Go: </label>
          <input
            type="date"
            onChange={(e) => {
              setDateGo(e.target.value);
            }}
          />
          <br />
          <label> Back: </label>
          <input type="date" onChange={(e) => setDateBack(e.target.value)} />
          <br />
          <Button
            onClick={addVacation}
            id="add_btn"
            variant="contained"
            size="large"
            color="primary"
            className={classes.margin}
          >
            ADD
          </Button>
        </div>
      </form>
    </div>
  );
}
