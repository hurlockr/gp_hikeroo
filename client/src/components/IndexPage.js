import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"

const IndexPage = props => {
    const [trail, setTrail] = useState([])

    const getTrails = async () => {
        try {
            const response = await fetch("/api/v1/index")
            if (!response.ok) {
                const errorMessage = `${response.status} (${response.statusText})`
                const error = new Error(errorMessage)
                throw(error)
            }
            const body = await response.json()
            setTrail(body.trail)
        } catch (error) {
            console.error(`Error in fetch: ${error.message}`)
        }
    }

    useEffect(() => {
        getTrails()
    }, [])

    const trailListItems = trail.map(trailItem => {
        return (
            <li key={trailItem.id}>
                {trailItem.trailName}
            </li>
        )
    })
    
    
    return (
        <div>
            <h1>Hello from the Index</h1>
            <ul>{trailListItems}</ul>
        </div>
    ) 
}

export default IndexPage