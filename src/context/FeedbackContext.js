import { createContext,useState,useEffect } from "react";


const FeedbackContext = createContext()

export const FeedbackProvider = ({children}) => {
    const[isLoading, setIsLoading] = useState(true)
    const [feedback,setFeedback] = useState([])
    //Sets items to be updated
    const [feedbackEdit, setFeedbackEdit] = useState({
        item:{},
        edit: false
    })
    useEffect(()=> {
        fetchFeedback()
    },[]) // array of dependency which is empty , only want to run once when is loads
    //whith out ,[], the function keeps running unnecessarily  

    //Fetch Feedback
    const fetchFeedback = async () => {
        const response = await fetch ("/feedback?_sort=id&_order=desc") //sorts by the id and the order of descending
        const data = await response.json() // fetch api
        setFeedback(data)
        setIsLoading(false)
    }
    //Edit feedback
    const editFeedback = (item) => {
        setFeedbackEdit({
            item,
            edit:true
        })
    }
    //Delete Feedback
    const deleteFeedback = async (id) => {
        if(window.confirm('are you sure you want to delete?')){
            // filter , filters out items with a certain id
            //will return all items exept item with the certain id 
            await fetch(`/feedback/${id}`,{method:'DELETE'})
            setFeedback(feedback.filter((item) => item.id !== id ))
        }
    }
    //Add feedback
    const addFeedback = async (newFeedback)=> {
        const response = await fetch('/feedback',{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
            },
            body:JSON.stringify(newFeedback)
        })
        const data = await response.json()
        setFeedback([data,...feedback])
    }
    //update Feedback Item
    const updateFeedback = async (id, updItem) => {
        const response = await fetch(`/feedback/${id}`,{
            method:'PUT',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updItem)
        })
        const data = await response.json()
        setFeedback(feedback.map((item)=> (item.id === id ? {
            ...item, ...data}:item))
        )
    }

    return <FeedbackContext.Provider value ={{
        feedback,
        deleteFeedback,
        addFeedback,
        editFeedback,
        feedbackEdit,
        updateFeedback,
        isLoading
    }}>
      {children}  
    </FeedbackContext.Provider>
}
export default FeedbackContext