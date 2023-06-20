import React, { useEffect, useState } from 'react'
import api from './api'
import axios from 'axios'


const AddQuestions = () => {
    let dataDelete
    const [question, setQuestion] = useState({
        question: "",
        option1: "",
        option2: "",
        option3: "",
        option4: "",
        answer: "",
        publish: false
    })

    const [tableData, setTableData] = useState([])
    const getData = async () => {
        try {
            const { data } = await api.get("/exam")
            console.log(data);
            setTableData(data)
        } catch (error) {
            console.log(error);

        }
    }

    const createQuestion = async () => {
        try {
            const { data } = await api.post("/exam", question)
            setQuestion({
                question: "",
                option1: "",
                option2: "",
                option3: "",
                option4: "",
                answer: "",
                publish: false
            })
            getData()
        } catch (error) {
            console.log(error);

        }
    }
    useEffect(() => {
        getData()
    }, [])

    const deleteData = async () => {
        const { data } = await api.delete(`/exam/${dataDelete}`)
        getData()
        console.log(data);
    }
    const handelPublish = async (id, publish) => {
        try {
            const { data } = await api.patch(`/exam/${id}`, { publish })
            getData()
        } catch (error) {
            console.log(error);

        }
    }

    const table = <table class="table table-dark table-striped table-hover">
        <thead>
            <tr>
                <th scope="col">Sr.no</th>
                <th scope="col">Question</th>
                <th scope="col">opt-1</th>
                <th scope="col">opt-2</th>
                <th scope="col">opt-3</th>
                <th scope="col">opt-4</th>
                <th scope="col">Answer</th>
                <th scope="col">Publish</th>
                <th scope="col">Action</th>
            </tr>
        </thead>
        <tbody>
            {
                tableData.map((item, i) => <tr key={item.id}  className={!item.publish && "table-danger"}>
                    <td>{item.id}</td>
                    <td>{item.question}</td>
                    <td>{item.option1}</td>
                    <td>{item.option2}</td>
                    <td>{item.option3}</td>
                    <td>{item.option4}</td>
                    <td>{item.answer}</td>
                    <td>
                        <div class="form-check form-switch">
                            <input class="form-check-input"
                                checked={item.publish} type="checkbox"
                                id={`id-${item.id}`}
                                onChange={e => handelPublish(item.id, e.target.checked)}

                            />
                            <label id={`id-${item.id}`}>Publish</label>
                        </div>
                    </td>
                    <td>
                        <button type="button" class="btn btn-outline-success"><i className=' bi bi-pencil my-2 '></i></button>
                        <button type="button"
                            data-bs-toggle="modal" data-bs-target="#deleteModal"
                            onClick={e => dataDelete = item.id}
                            class="btn btn-outline-danger">

                            <i className='bi bi-trash  my-2 '></i>
                        </button>
                    </td>
                </tr>)
            }
        </tbody>
    </table>
    return <>

        <div className="container">
            <div className='text-end my-5'>
                <button data-bs-toggle="modal" data-bs-target="#exampleModal"
                    type="button" className="btn btn-primary"><i className='bi bi-plus'></i>Add Questions</button>

            </div>
        </div>

        {table}

        {/*  ----------------------- main modal --------------------------------------------------------------------- */}
        <div className="modal fade" id="exampleModal">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div className="row">
                            <div className="col-sm-12">
                                <input type="text"
                                    value={question.question}
                                    onChange={e => setQuestion({ ...question, question: e.target.value })}
                                    className='form-control my-2' placeholder='Enter question' name="" id="" />
                            </div>
                            <div className="col-sm-6">
                                <input type="text"
                                    value={question.option1}
                                    onChange={e => setQuestion({ ...question, option1: e.target.value })}
                                    className='form-control my-2' placeholder='Add option 1' name="" id="q1" />
                            </div>
                            <div className="col-sm-6">
                                <input type="text"
                                    value={question.option2}
                                    onChange={e => setQuestion({ ...question, option2: e.target.value })}
                                    className='form-control my-2' placeholder='Add option 2' name="" id="q2" />
                            </div>
                            <div className="col-sm-6">
                                <input type="text"
                                    value={question.option3}
                                    onChange={e => setQuestion({ ...question, option3: e.target.value })}
                                    className='form-control my-2' placeholder='Add option 3' name="" id="q3" />
                            </div>
                            <div className="col-sm-6">
                                <input type="text"
                                    value={question.option4}
                                    onChange={e => setQuestion({ ...question, option4: e.target.value })}
                                    className='form-control my-2' placeholder='Add option 4' name="" id="q4" />
                            </div>
                            <div className="col-sm-12 my-2">
                                <select
                                    value={question.answer}
                                    onChange={e => setQuestion({ ...question, answer: e.target.value })}
                                    className='form-select' >
                                    <option selected>Choose Answer</option>
                                    <option value="1">Option 1</option>
                                    <option value="2">Option 2</option>
                                    <option value="3">Option 3</option>
                                    <option value="4">Option 4</option>
                                </select>
                            </div>

                        <div>
                            <button
                             onClick={createQuestion}
                             data-bs-dismiss="modal"
                                type="button" class="btn btn-primary">Add</button>
                        </div>
                        </div>

                    </div>

                </div>
            </div>
        </div>

        {/* --------------------------delete modal------------------------------------------------------------- */}




        <div class="modal fade" id="deleteModal" >
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <h3>Are you sure to delete this data</h3>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">cancel</button>
                        <button type="button"
                        data-bs-dismiss="modal"
                            onClick={deleteData}
                            class="btn btn-danger">yes</button>
                    </div>
                </div>
            </div>
        </div>



    </>
}

export default AddQuestions