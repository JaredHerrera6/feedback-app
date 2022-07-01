import React from 'react'
import { useContext } from 'react';
import FeedbackContext from '../context/FeedbackContext';

function FeedbackStats({}) {
  const {feedback} = useContext(FeedbackContext)
  // Calculate Rating Average
  // takes in the accumulator and the current value
  let average = feedback.reduce((acc, current)=>{
    return acc + current.rating
    // second argument is the default for the accumulator for the function which is 0
  }, 0)/ feedback.length;


  average = average.toFixed(1).replace(/[,.]0$/,'')

  console.log(average)
  return <div className='feedback-stats'>
    <h4>{feedback.length} Reviews</h4>
    
    <h4>Average Rating: {isNaN(average) ? 0 : average}</h4> 
  </div>
}
export default FeedbackStats