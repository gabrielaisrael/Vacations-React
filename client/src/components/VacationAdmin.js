import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import { teal } from '@material-ui/core/colors'
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'
import UpdateVacations from './UpdateVacations'

const tealcolor = teal['A400']
const useStyles = makeStyles(theme => ({
    root: {
        maxWidth: 345,
        maxHeight: 500,
        margin: 50,
        backgroundColor: tealcolor,

    },
    media: {
        height: 0,
        paddingTop: '56.25%'
    },
}))

export default function VacationAdmin(props) {

    const classes = useStyles()
    const dispatch = useDispatch()
    const [isOpen, setIsOpen] = useState(false)

    function deleteVacation(e) {
        const vacationId = props.vacation.vacationId;
        fetch("http://localhost:1003/admin/delete/" + vacationId, {
            method: "delete",
            headers: { 'Content-Type': 'application/json', Authorization: localStorage.getItem('token') },
        }).then(console.log(vacationId))
            window.location.reload()
    }

    function openModal() {
        setIsOpen(true)
    }

    return (
        <div>
            <Card className={classes.root}>
                <CardHeader
                    title={props.vacation.destination}
                />
                <CardMedia
                    className={classes.media}
                    image={props.vacation.img_url}
                    title={props.vacation.destination}
                />
                <CardContent>
                    <Typography variant="h5" component="h5">
                        {props.vacation.descriptionVacation}
                    </Typography>
                    <Typography variant="h6" component="h6">
                        <b>Price: </b>{props.vacation.price} ₪
                    </Typography>
                    <Typography variant="p" component="p">
                        <b>Go:</b>  {props.vacation.dateGo.split("T")[0]}
                    </Typography>
                    <Typography variant="p" component="p">
                        <b>Back:</b>  {props.vacation.dateBack.split("T")[0]}
                    </Typography>
                </CardContent>
                <CardActions disableSpacing>
                    <DeleteIcon id={props.vacation.vacationId} onClick={deleteVacation} className="delete_btn" />
                    <EditIcon onClick={openModal} className="update_btn" />
                </CardActions>
            </Card>

            {isOpen ? (<UpdateVacations v={props.vacation} setIsOpen={setIsOpen} />) : null}

        </div>
    )
}
