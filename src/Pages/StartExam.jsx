import React, { useEffect, useState } from 'react'
import api from './api';

const StartExam = () => {
  const [paper, setPaper] = useState([])
  const [index, setIndex] = useState(0)
  const [userResponse, setUserResponse] = useState([])
  const [selectedQuestion, setSelectedQuestion] = useState()
  const [show, setShow] = useState(true)
  
  const getExamQuestion = async e => {
    try {
      const {data} = await api.get("/exam",{
        params:{ publish:true}
      })
      setPaper(data)
     setSelectedQuestion(data[index]|| null)
    } catch (error) {
      console.log(error);
    }

  }
const handelUserResponse = e=>{
  const x= userResponse.findIndex(item =>item.id === selectedQuestion.id)
  console.log(x);
  if (x=== -1) {
    setUserResponse([...userResponse,{...selectedQuestion,userAnswer:e.target.value}])
    
  } else {
    const copy = [...userResponse]
    copy[x].userAnswer = e.target.value
    setUserResponse(copy)
  }
}
const handelChecked = data =>{
  const x= userResponse.findIndex(item => item.id === selectedQuestion.id)
  if (x === -1) {
    return false
    
  } else {
    if( data === userResponse[x].userAnswer){
      return true
    } else{
      return false
    }
  }
}
 const endExam = () =>{
  setShow(false)
 }
  const content = selectedQuestion && <div class="card p-2 ">
    <div class="card-header d-flex justify-content-between ">
      {selectedQuestion.question}
      <button onClick={endExam} type="button" class="btn btn-danger">Submit & End Exam</button>
      </div>
    <div class="card-body">
      <div className="form-check">
        <input checked={handelChecked(selectedQuestion.option1)} value={selectedQuestion.option1} onChange={handelUserResponse} type="radio" name={selectedQuestion.question} id={selectedQuestion.option1} />
        <label htmlFor={selectedQuestion.option1} className='form-check-label'>{selectedQuestion.option1}</label>
      </div>
      <div className="form-check">
        <input checked={handelChecked(selectedQuestion.option2)} value={selectedQuestion.option2} onChange={handelUserResponse} type="radio" name={selectedQuestion.question} id={selectedQuestion.option2} />
        <label htmlFor={selectedQuestion.option2} className='form-check-label'>{selectedQuestion.option2}</label>
      </div>
      <div className="form-check">
        <input checked={handelChecked(selectedQuestion.option3)} value={selectedQuestion.option3} onChange={handelUserResponse} type="radio" name={selectedQuestion.question} id={selectedQuestion.option3} />
        <label htmlFor={selectedQuestion.option3} className='form-check-label'>{selectedQuestion.option3}</label>
      </div>
      <div className="form-check">
        <input checked={handelChecked(selectedQuestion.option4)} value={selectedQuestion.option4} onChange={handelUserResponse} type="radio" name={selectedQuestion.question} id={selectedQuestion.option4} />
        <label htmlFor={selectedQuestion.option4} className='form-check-label'>{selectedQuestion.option4}</label>
      </div>
    </div>
    <div className="card-footer d-flex justify-content-between ">
     
       {
        index !== 0 && <>
         <span></span> <button
        onClick={e=>{
          setIndex(pre=>{
            setSelectedQuestion(paper[pre -1])
            return pre -1
          })
        }}
        type='button'
        className='btn btn-primary'
        >Prev
          
        </button>
        </>
       }

       {
        index !== paper.length -1 && <>
        <span></span> <button
        onClick={e=>{
          setIndex(pre=>{
            setSelectedQuestion(paper[pre + 1])
            return pre + 1
          })
        }}
        type='button'
        className='btn btn-primary'
        >Next
          
        </button>
       </>
       }

          </div>
  </div>

  useEffect(()=>{
    getExamQuestion()
  },[])
  const x = userResponse.filter(item=>item.answer === item.userAnswer)
  const stat = <>
 {
  paper && <>
  <h1 className='text-bg-dark'>Toal Marks {x.length}/ {paper.length}</h1>
  <h1 className='text-bg-dark'>Attemted{userResponse.length}</h1>
  <h1 className='text-bg-dark'>Completed {Math.ceil(x.length/paper.length *100)}%</h1>
  
  </>
 }
  
  </>
  return <>
  {
    show 
    ? <div className='container'  >
    {
      paper && <h1 className="bg-dark">{index +  1}/{paper.length}</h1>
    }
    {
      paper && <div className="progress my-3">
       
        <div 
        style={{width:`${Math.floor((index+1)/(paper.length)*100)}%`}}
        className="progress-bar progress-bar-striped progress-bar-animated ">
          {Math.floor((index+1)/(paper.length)*100)}
        </div>

      </div>
    }
{content}
  <pre className='text-dark '>{JSON.stringify(userResponse)}</pre>
  {stat}
  </div>
  :
<h2 className='text-bg-dark'>Exam has been ended</h2>


  }
  </>
 
}

export default StartExam