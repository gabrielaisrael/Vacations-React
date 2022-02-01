import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import GradeIcon from '@material-ui/icons/Grade'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import { teal } from '@material-ui/core/colors'
import { unfollow } from '../actions/UnfollowAction'

const tealcolor = teal['A400']



const useStyles = makeStyles(theme => ({
    root: {
        maxWidth: 345,
        margin: 50,
        backgroundColor: tealcolor,
        height: '44vw'
    },
    media: {
        height: 0,
        paddingTop: '56.25%',
    },

}))

export default function Vacation(props) {

    const classes = useStyles()
    const dispatch = useDispatch()
    const [followersSum, setFollowersSum] = useState(0)
    const followRed = useSelector(state => state.followRed)

    function unfollowFunction(e) {
        const userId = localStorage.u_id;
        const vacationId = props.vacation.vacationId;
        console.log(vacationId)
        fetch(`http://localhost:1003/vacations/unfollow/${userId}/${vacationId}`, {
            method: "delete"
        }).then(console.log(vacationId))
            .then(dispatch(unfollow()))
            window.location.reload()
            .catch((err) => { })
    }

    function getFollowersSum() {
        fetch("http://localhost:1003/vacations/followers/" + props.vacation.vacationId)
            .then(res => res.json())
            .then(data => setFollowersSum(data))
            .catch((err) => { })

    }

    useEffect(() => {
        getFollowersSum()
    }, [followRed])

    return (
        <div >
            <Card className={classes.root} key={props.vacation.price}>
                <CardHeader
                    title={props.vacation.destination}
                    subheader="Israel"
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
                        <b>Go:</b>  {props.vacation.dateGo.split("T")[0]}
                    </Typography>
                    <Typography variant="h6" component="h6">
                        <b>Back:</b>  {props.vacation.dateBack.split("T")[0]}
                    </Typography>
                    <Typography variant="h6" component="h6">
                        <b>Price: </b>{props.vacation.price} ₪
                    </Typography>
                    <Typography variant="h6" component="h6">
                                 <b>Followers:</b>  {(followersSum.length > 0) ? followersSum[0].followersSum : 0}
                    </Typography>

                </CardContent>
                <CardActions disableSpacing>
                    <IconButton onClick={unfollowFunction} aria-label="add to favorites">
                        <GradeIcon color="primary" id={props.vacation.vacationId} />
                    </IconButton>
                </CardActions>
            </Card>

        </div>
    )
}

