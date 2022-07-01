import React from 'react'
import Header from './components/Header'
import FeedbackData from './data/FeedbackData'
import FeedbackList from './components/FeedbackList'
import FeedbackStats from './components/FeedbackStats'
import FeedbackForm from './components/FeedbackForm'
import {v4 as uuidv4} from 'uuid'
import {useState} from 'react'
function App(){
    const [feedback, setFeedback] = useState(FeedbackData)
    const deleteFeedback = (id) => {
        if(window.confirm('are you sure you want to delete?')){
            // filter , filters out items with a certain id
            //will return all items exept item with the certain id 
            setFeedback(feedback.filter((item) => item.id !== id ))
        }
    }
    const addFeedback = (newFeedback)=> {
        newFeedback.id = uuidv4()
        setFeedback([newFeedback,...feedback])
        console.log(newFeedback)
    }
    return (
        <>
        <Header />
        <div className='container'>
            <FeedbackForm handleAdd = {addFeedback}/>
            <FeedbackStats feedback = {feedback}/>
            <FeedbackList feedback = {feedback}
            handleDelete = {deleteFeedback}/>
        </div>
        </>
    )
}
export default App