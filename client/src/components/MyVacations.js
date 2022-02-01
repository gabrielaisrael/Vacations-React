import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { signOut } from "../actions/SingOutAction";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import { fade, makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Search from "./Search";
import SearchIcon from "@material-ui/icons/Search";
import { search } from "../actions/SearchAction";
import { notAdmin } from "../actions/NotAdminAction";
import { clearSearch } from "../actions/ClearSearchAction";
import AllVacations from "./AllVacations";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginLeft: 30,
    marginRight: 30,
    margin: 55,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  },
  searchIcon: {
    width: theme.spacing(7),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: 120,
      "&:focus": {
        width: 200,
      },
    },
  },
}));

export default function MyVacations() {
  const classes = useStyles();
  const isAdmin = useSelector((state) => state.isAdmin);
  const isLogged = useSelector((state) => state.isLogged);
  const isSearch = useSelector((state) => state.isSearch);
  const [searchValue, setSearchValue] = useState("");
  const [searchDateGo, setSearchDateGo] = useState("");
  const [searchDateBack, setSearchDateBack] = useState("");
  const dispatch = useDispatch();

  function logout() {
    dispatch(signOut());
    dispatch(notAdmin());
    dispatch(clearSearch());
    window.location = window.location.origin;
    localStorage.removeItem("u_id");
    localStorage.removeItem("isAdmin");
    localStorage.removeItem("token");
  }

  function searchFunction() {
    console.log(searchValue);

    dispatch(search());
  }

  function clearSearchFunction() {
    dispatch(clearSearch());
    window.location.reload();
  }

  return (
    <div>
      <div className="logout_btn" onClick={logout}>
        {" "}
        Logout{" "}
      </div>
      <span className="hello">
        {" "}
        Welcome, {localStorage.getItem("firstname")} !{" "}
      </span>
      <h1 className="main_header_home"> </h1>

      <AppBar position="static" id="app_bar">
        <Toolbar id="toolbar">
          <Typography id="logo" className={classes.title}>
            Israel Vacations
          </Typography>
          <Typography className={classes.title} variant="h6" noWrap>
            Description:
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              id="description_myvacations"
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ "aria-label": "search" }}
            />
          </div>
          <Typography className={classes.title} variant="h6" noWrap>
            Go:
          </Typography>
          <input
            onChange={(e) => setSearchDateGo(e.target.value)}
            className="datePicker"
            type="date"
            id="dateGo"
          />
          <Typography className={classes.title} variant="h6" noWrap>
            Back:
          </Typography>
          <input
            onChange={(e) => setSearchDateBack(e.target.value)}
            className="datePicker"
            type="date"
            id="dateBack"
          />
          <Button
            onClick={searchFunction}
            variant="contained"
            size="medium"
            color="primary"
            className={classes.margin}
          >
            Search
          </Button>
          <Button
            onClick={clearSearchFunction}
            variant="contained"
            size="medium"
            color="terciary"
            className={classes.margin}
          >
            Clear
          </Button>
        </Toolbar>
      </AppBar>
      {/* 
           {
                (isLogged && isAdmin) ? <Redirect to="/vacations/admin" /> : <Redirect to="/" />
    } */}

      {isLogged && isAdmin ? <Navigate to="/vacations/admin" /> : null}

      {/* 
 {
                 isLogged ? null : <Redirect to="/" />
//             } */}
      {isSearch &&
      (searchValue !== undefined ||
        searchDateGo !== undefined ||
        searchDateBack !== undefined) ? (
        <Search
          search={searchValue}
          dateGo={searchDateGo}
          dateBack={searchDateBack}
        />
      ) : (
        <AllVacations />
      )}
    </div>
  );
}
