import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { notAdmin } from "../actions/NotAdminAction";
import { signOut } from "../actions/SingOutAction";
import { Redirect } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import VacationAdmin from "./VacationAdmin";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import { VictoryBar, VictoryChart } from "victory";
import AddVacations from "./AddVacations";

export default function VacationsAdmin() {
  const useStyles = makeStyles((theme) => ({
    margin: {
      margin: theme.spacing(1),
    },
    extendedIcon: {
      marginRight: theme.spacing(1),
    },
  }));
  const classes = useStyles();
  const isLogged = localStorage.getItem("token") ? true : false;
  const [allVacations, setAllVacations] = useState([]);
  const isAdmin = localStorage.getItem("isAdmin") ? true : false;
  const dispatch = useDispatch();
  const followRed = useSelector((state) => state.followRed);
  const [charts, setCharts] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  function getAllVacations() {
    fetch("http://localhost:1003/vacations")
      .then((data) => data.json())
      .then((res) => setAllVacations(res))
      .catch((err) => {});
  }

  function logout() {
    dispatch(signOut());
    dispatch(notAdmin());
    window.location = window.location.origin;
    localStorage.removeItem("u_id");
    localStorage.removeItem("isAdmin");
    localStorage.removeItem("token");
  }

  function getChart() {
    fetch("http://localhost:1003/vacations/followers")
      .then((data) => data.json())
      .then((res) => setCharts(res))
      .catch((err) => {});
  }

  function openModal() {
    setIsOpen(true);
  }

  useEffect(() => {
    getAllVacations();
    getChart();
  }, [followRed]);

  return (
    <div>
      <div className="logout_btn" onClick={logout}>
        {" "}
        Logout{" "}
      </div>
      <h1 className="main_header_admin"> Admin Area </h1>
      <hr className="hr_vacations" />

      <h2 id="vacations_header"> Followers of Vacations:</h2>

      <div className="chart_div">
        <VictoryChart domainPadding={30}>
          <VictoryBar data={charts} x="destination" y="followersSum" />
        </VictoryChart>
      </div>

      <hr className="hr_vacations" />

      <h2 id="vacations_header"> Vacations: </h2>
      <div className="vacations_list">
        {allVacations.map((v) => (
          <VacationAdmin vacation={v} key={v.vacationId} />
        ))}
      </div>
      <AddCircleIcon
        onClick={openModal}
        fontSize="large"
        className="addVacation_btn"
      />

      {isOpen ? (
        <AddVacations
          setIsOpen={setIsOpen}
          setAllVacations={setAllVacations}
          allVacations={allVacations}
        />
      ) : null}
    </div>
  );
}
