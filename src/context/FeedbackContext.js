import { createContext,useState } from "react";
import {v4 as uuidv4} from 'uuid'

const FeedbackContext = createContext()

export const FeedbackProvider = ({children}) => {
    const [feedback,setFeedback] = useState([
        {
            id:1,
            text:'This is feedback item1',
            rating: 10
        },
        {
            id:2,
            text:'This is feedback item2',
            rating: 8
        },
        {
            id:3,
            text:'This is feedback item3',
            rating: 7
        }
    ])
    //Sets items to be updated
    const [feedbackEdit, setFeedbackEdit] = useState({
        item:{},
        edit: false
    })
    //Add feedback
    const editFeedback = (item) => {
        setFeedbackEdit({
            item,
            edit:true
        })
    }
    //Delete Feedback
    const deleteFeedback = (id) => {
        if(window.confirm('are you sure you want to delete?')){
            // filter , filters out items with a certain id
            //will return all items exept item with the certain id 
            setFeedback(feedback.filter((item) => item.id !== id ))
        }
    }
    //Add feedback
    const addFeedback = (newFeedback)=> {
        newFeedback.id = uuidv4()
        setFeedback([newFeedback,...feedback])
        console.log(newFeedback)
    }
    //update Feedback Item
    const updateFeedback = (id, updItem) => {
        setFeedback(feedback.map((item)=> (item.id === id ? {
            ...item, ...updItem}:item))
        )
    }

    return <FeedbackContext.Provider value ={{
        feedback,
        deleteFeedback,
        addFeedback,
        editFeedback,
        feedbackEdit,
        updateFeedback
    }}>
      {children}  
    </FeedbackContext.Provider>
}
export default FeedbackContext