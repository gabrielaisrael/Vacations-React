import React, { useEffect, useState } from 'react'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import GradeIcon from '@material-ui/icons/Grade'
import { makeStyles } from '@material-ui/core/styles'
import { useSelector, useDispatch } from 'react-redux'
import { teal } from '@material-ui/core/colors'

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

export default function VacationOfFollowers(props) {

    const classes = useStyles()
    const followRed = useSelector(state => state.followRed)
    const dispatch = useDispatch()
    const [followersSum, setFollowersSum] = useState(0)

    function followFunction(e) {
        const userId = localStorage.u_id
        const vacationId = props.vacationOfFollowers.vacationId

        fetch("http://localhost:1003/vacations/followers/" + vacationId, {
            method: "post",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId, vacationId })
        }).then(console.log(vacationId))
        window.location.reload()
            .catch((err) => { })
    }

    function getFollowersSum() {
        fetch("http://localhost:1003/vacations/followers/" + props.vacationOfFollowers.vacationId)
            .then(res => res.json())
            .then(data => setFollowersSum(data))
            .catch((err) => { })
    }

    useEffect(() => {
        getFollowersSum()
    }, [followRed])

    return (
        <div>
            <Card className={classes.root}>
                <CardHeader
                    title={props.vacationOfFollowers.destination}
                    subheader="Israel"
                />
                <CardMedia
                    className={classes.media}
                    image={props.vacationOfFollowers.img_url}
                    title={props.vacationOfFollowers.destination}
                />
                <CardContent>
                    <Typography variant="h5" component="h5">
                        {props.vacationOfFollowers.descriptionVacation}
                    </Typography>
                    <Typography variant="h6" component="h6">
                        <b>Go:</b>  {props.vacationOfFollowers.dateGo.split("T")[0]}
                    </Typography>
                    <Typography variant="h6" component="h6">
                        <b>Back:</b>  {props.vacationOfFollowers.dateBack.split("T")[0]}
                    </Typography>
                    <Typography variant="h6" component="h6">
                        <b>Price:</b>{props.vacationOfFollowers.price} $
                    </Typography>
                    <Typography variant="h6" component="h6">
                        <b>Followers:</b>  {(followersSum.length > 0) ? followersSum[0].followersSum : 0}
                    </Typography>
                </CardContent>
                <CardActions disableSpacing>
                    <CardActions disableSpacing>
                        <IconButton onClick={followFunction} aria-label="add to favorites">
                            <GradeIcon id={props.vacationOfFollowers.vacationId} />
                        </IconButton>
                    </CardActions>
                </CardActions>
            </Card>
        </div>
    )
}
