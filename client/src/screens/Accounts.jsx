import axios from 'axios'
import {useEffect, useState} from 'react'
import {url, config} from '../services/apiConfig'

export default function Accounts({destroyUsers}) {
    const [airtableUsers, setUsers] = useState([])
    const [deletedUsers, setDeletedUsers] = useState([])

    useEffect(() => {
        const getAirtableUsers = async () => {
            const {data} = await axios.get(url, config)
            setUsers(data.records)
        }
        getAirtableUsers()
    }, [])


    const getCreateAtDate = (createdAt) => {
        const datetime = new Date(createdAt)
        return new Intl.DateTimeFormat('en-US').format(datetime)
    }

    const handleChange = (e) => {
        const {name, value} = e.target
        console.log(name, value)
        // setUsers(prev => airtableUsers.map())
    }

    const handleDeleteChange = async (e) => {
        const id = e.target.id
        setDeletedUsers(prev => ([...prev, id]))
    }
    
    const handleDelete = async () => {
        const res = await destroyUsers(deletedUsers)
        console.log(res)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        handleDelete()
    }

    return (
        <div className="accounts-screen">
            <h1>Users</h1>
            <form className="accounts-form" onSubmit={handleSubmit}>
                {airtableUsers.map((user, idx) => (
                    <div key={idx} className="account">
                        <p className="account-email">{user.fields.email}</p>
                        <div className="checkbox-container">
                            <label htmlFor={`is-owner-${user.id}`}>Owner Access</label>
                            <input 
                                type="checkbox" 
                                name="isOwner" 
                                id={`is-owner-${user.id}`} 
                                checked={user.fields.isOwner}
                                onChange={(e) => handleChange(e)}
                            />
                        </div>
                        <div className="checkbox-container">
                            <label htmlFor={`is-admin-${user.id}`}>Admin Access</label>
                            <input 
                                type="checkbox" 
                                name="isAdmin" 
                                id={`is-admin-${user.id}`} 
                                checked={user.fields.isAdmin}
                                onChange={(e) => handleChange(e)}
                            />
                        </div>
                        <div className="checkbox-container">
                            <label htmlFor={user.id}>Delete</label>
                            <input 
                                type="checkbox" 
                                name="delete" 
                                id={user.id} 
                                checked={deletedUsers[user.id]}
                                onChange={(e) => handleDeleteChange(e)}
                            />
                        </div>
                        <p>created at:<span className="account-date">{getCreateAtDate(user.createdTime)}</span></p>
                    </div>
                ))}
                <input className="big-secure-btn" type="submit" value="Submit" />
            </form>
        </div>
    )
}
