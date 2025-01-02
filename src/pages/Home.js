import {useEffect} from 'react'
import {useWorkoutsContext} from '../hooks/useWorkoutsContext'

//components
import WorkoutDetails from '../components/WorkoutDetails'
import WorkoutForm from '../components/WorkoutForm'

const Home = () => {
    const {workouts, dispatch} = useWorkoutsContext()

    useEffect(() => {
        const fetchWorkouts = async () => {
            const response = await fetch('/api/workouts')
            const json = await response.json()
            console.log('response:', response)
            console.log('json', json)
            if (response.ok) {
                dispatch({type:'SET_WORKOUTS', payload: json})
            }
        }

        fetchWorkouts()
    }, [dispatch])//dependency array, since its empty, useEffect will only fire once

    return (
        <div className="home">
            <div className="workouts">
                {workouts && workouts.map((workout) => (
                    <WorkoutDetails key={workout._id} workout={workout}/>
                ))}
            </div>
            <WorkoutForm />
        </div>
    )
}

export default Home