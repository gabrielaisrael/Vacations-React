import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import VacationCard from './VacationCard'
import VacationOfFollowers from './VacationOfFollowers'

export default function AllVacations() {

    const [allVacations, setAllVacations] = useState([])
    const [allVacationsAll, setAllVacationsAll] = useState([])
    const followRed = useSelector(state => state.followRed)

    function getFollowedVacations() {
        fetch(`http://localhost:1003/vacations/${localStorage.getItem('u_id')}`)
            .then(res => res.json())
            .then(data => {
                setAllVacations(data)
                console.log(data)
                if (allVacations.length === 0) {
                    getAllVacationsAll()
                }
                getAllVacations(data)
            })
            .catch((err) => { })
    }

    function getAllVacations(followedVacations) {
        fetch(`http://localhost:1003/vacations/unfollowedVacations`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(followedVacations)
        })
            .then(data => data.json())
            .then(res => setAllVacationsAll(res))
            .catch((err) => { })
    }

    function getAllVacationsAll() {
        fetch("http://localhost:1003/vacations")
            .then(data => data.json())
            .then(res => setAllVacationsAll(res))
            .catch((err) => { })
    }

    useEffect(() => {
        getFollowedVacations()
    }, [followRed])

    return (
        <div>
            <h2 id="vacations_header">My Vacations</h2>
            <div className="vacations_list">
                {allVacations.map(
                    v => (<VacationCard vacation={v} key={v.descriptionVacation}/>)
                )}
            </div>
            <br />
            <hr className="hr_vacations" />
            <h2 id="vacations_header">See More Vacations</h2>
            <div className="vacations_list">
                {
                    allVacationsAll.map(
                        v => (<VacationOfFollowers vacationOfFollowers={v} key={v.vacationId} />)
                    )}
            </div>
        </div>
    )
}


