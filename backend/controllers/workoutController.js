const Workouts = require('../models/workoutModel')
const mongoose = require('mongoose')
//get all workouts
const getWorkouts = async (req, res) => {
    const workouts = await Workouts.find({}).sort({createdAt: -1})

    res.status(200).json(workouts)
}

//get single workout
const getSingleWorkout = async (req, res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'Invalid ID', id})
    }
    const workout = await Workouts.findById(id)

    if(!workout){
        return res.status(404).json({error: 'no such workout'})
    }

    res.status(200).json(workout)
}

//create new workout
const createWorkout = async(req, res) => {
    const {title, reps, load} = req.body
    try {
        const workout = await Workouts.create({title, load, reps})
        res.status(200).json(workout)

    } catch (error){
        res.status(400).json({error: error.message})
    }
}

//delete a workout
const deleteWorkout = async (req, res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'Invalid ID', id})
    }

    const workout = await Workouts.findByIdAndDelete(id)
    if(!workout){
        return res.status(404).json({error: 'no such workout'})
    }

    res.status(200).json(workout)
}

//patch
const updateWorkout = async(req, res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'Invalid ID', id})
    }

    const workout = await Workouts.findOneAndUpdate({_id: id}, {
        ...req.body
    })
    if(!workout){
        return res.status(404).json({error: 'no such workout'})
    }

    res.status(200).json(workout)
}
module.exports = {
    createWorkout,
    getWorkouts,
    getSingleWorkout,
    deleteWorkout,
    updateWorkout
}