import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import './Student.styles.css'

const StudentTable = () => {
    const [userList, setUserList] = useState([])
    useEffect(() => {
        Axios.get('http://localhost:1337/api/read').then((response) => {
            setUserList(response.data)
        })
    })
    const deleteUser = (id) => {
        Axios.delete(`http://localhost:1337/api/delete/${id}`)
    }

    return (
        <div>
            <table className="table table-primary table-striped table-bordered">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Age</th>
                        <th>Mobile Number</th>
                        <th>Grade</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                {userList.map((val, key) => {
                    return <tbody key={key}>
                        <tr>
                            <td>{val.name}</td>
                            <td>{val.age}</td>
                            <td>{val.phone}</td>
                            <td>{val.grade}</td>
                            <td><button className='btn btn-danger' onClick={() => deleteUser(val._id)}>Delete</button></td>
                        </tr>
                    </tbody>
                })}
            </table>
        </div>
    )
}

export default StudentTable
