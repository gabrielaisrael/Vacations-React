import React from 'react'
import './App.css'
import { BrowserRouter, Route } from 'react-router-dom'
import Login from './components/Login'
import Register from './components/Register'
import MyVacations from './components/MyVacations'
import AllVacations from './components/AllVacations'
import Search from './components/Search';
import VacationsAdmin from './components/VacationsAdmin.js'

function App() {
  return (
    <BrowserRouter>

      <div className="App">

        <Route exact path="/">
          <Login />
        </Route>

        <Route exact path="/register">
          <Register />
        </Route>

        <Route exact path="/home">
          <MyVacations />
        </Route>

        <Route exact path="/vacations">
          <AllVacations />
        </Route>

        <Route exact path="/search">
          <Search />
        </Route>
        <Route exact path="/vacations/admin">
          <VacationsAdmin />
        </Route>

        <Route exact path="/vacations/search">
          <Search />
        </Route>

      </div>

    </BrowserRouter>
  )
}

export default App
