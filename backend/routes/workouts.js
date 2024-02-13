const express = require('express')
const { ConnectionCreatedEvent } = require('mongodb')
const { 
    createWorkout, 
    getSingleWorkout, 
    getWorkouts, 
    updateWorkout, 
    deleteWorkout 
} = require('../controllers/workoutController')
const router = express.Router()

//get all workouts
router.get('/', getWorkouts)
//get single workout
router.get('/:id', getSingleWorkout)
//post a workout
router.post('/', createWorkout)
//delete a workout
router.delete('/:id', deleteWorkout)
//update a workout
router.patch('/:id', updateWorkout)


module.exports = router