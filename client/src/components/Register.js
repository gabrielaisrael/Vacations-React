import React, { useState } from 'react'
import { Navigate } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Swal from 'sweetalert2'

    const useStyles = makeStyles(theme => ({
        root: {
            '& > *': {
                margin: theme.spacing(1),
                width: 190,
            },
        },
    }))
    
    export default function Register() {
    
        const classes = useStyles()
        const [firstname, setFirstname] = useState()
        const [lastname, setLastname] = useState()
        const [username, setUsername] = useState()
        const [password, setPassword] = useState()
        const isAdmin = false
    
        function registerUser(e) {
            e.preventDefault()
            console.log({
                firstname, lastname, username, password, isAdmin
            })
    
            fetch("http://localhost:1003/users/register",
                {
                    method: "post",
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ firstname, lastname, username, password, isAdmin })
                })
                .then(res => console.log(res))
                .then(() => {
                    Swal.fire('Congratulations!',
                        'You created your new account!')
                    document.getElementById("firstname").value = ""
                    document.getElementById("lastname").value = ""
                    document.getElementById("username").value = ""
                    document.getElementById("password").value = ""
                }
                ).then(<Navigate to="/home" />)
                .catch((err) => {
                    console.log(err);
                    Swal.fire(
                        {
                            icon: 'error',
                            title: 'Oops...',
                            text: 'Missing some info..',
                            footer: '<a href>Why do I have this issue?</a>'
                        })
                })
    
        }
    
        return (
            <div id="register">
                             <img className="israel_deguel" src="data:image/png;base64,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" alt="israel-images" />
            <h1 className="main_header_register"> Israel Vacations</h1>
            <br />
            <hr className="hr_login" />
            <div id="register_div">
                <h1 className="register_header"> Register: </h1>
                <form onSubmit={registerUser} className={classes.root} noValidate autoComplete="off">
                    <TextField id="firstname" label="Firstname" onChange={e => setFirstname(e.target.value)} />
                    <br />
                    <TextField id="lastname" label="Lastname" onChange={e => setLastname(e.target.value)} />
                    <br />
                    <TextField id="username" label="Username" onChange={e => setUsername(e.target.value)} />
                    <br />
                    <TextField id="password" label="Password" onChange={e => setPassword(e.target.value)} />
                    <br />
                    <Button type="submit" id="register_btn" variant="contained" size="large" color="primary" className={classes.margin}>
                        Create Account
                        </Button>
                </form>
                <br />
                <NavLink to="/" id="login_link"> Login </NavLink>
            </div>
            <img className="logo_img_register" src="https://images.forwardcdn.com/image/1300x/center/images/cropped/istock-820247602-1562617675.jpg" alt="logo-img" />
            </div>
        )
    }
    
   