import axios from 'axios'
import {useEffect, useState} from 'react'
import {url, config} from '../services/apiConfig'

export default function Accounts({destroyUsers, updateUsers}) {
    const [updateUserIDs, setUpdateIDs] = useState([]) // to track updated records
    const [deletedUserIDs, setDeletedUserIDs] = useState([]) // to track deleted record

    const [usersData, setUsersData] = useState([]) // for updating user data and sending
    const [airtableUsers, setAirtableUsers] = useState([]) // for listing on pg only

    useEffect(() => {
        const getAirtableUsers = async () => {
            const {data} = await axios.get(url, config)
            const modifiedUsers = data.records.map(u => ({
                "id": u.id,
                "fields": {
                    "email": u.fields.email,
                    "isOwner": !!u.fields.isOwner,
                    "isAdmin": !!u.fields.isAdmin
                }
            }))
            setUsersData(modifiedUsers)
            setAirtableUsers(data.records)
        }
        getAirtableUsers()
    }, [])


    const getCreateAtDate = (createdAt) => {
        const datetime = new Date(createdAt)
        return new Intl.DateTimeFormat('en-US').format(datetime)
    }

    const handleUpdateChange = (e) => {
        const {name, dataset: {userId}} = e.target
        setUpdateIDs(prev => {
            if(prev.includes(userId)){
                return prev.filter(uid => uid !== userId)
            }
            return [...prev, userId]
        })
        setUsersData(prev => {
            return prev.map(u => {
                if(userId === u.id){
                    return {
                        id: u.id,
                        fields: {
                            ...u.fields,
                            [name]: !u.fields[name]
                        }
                    }
                }else{
                    return u
                }
            })
        })
    }

    const handleDeleteChange = async (e) => {
        const id = e.target.id
        setDeletedUserIDs(prev => {
            if(prev.includes(id)){
                return prev.filter(uid => uid !== id)
            }
            return [...prev, id]
        })
    }
    
    const handleDelete = async () => {
        await destroyUsers(deletedUserIDs)
    }

    const handleUpdate = async () => {
        await updateUsers(usersData)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if(updateUserIDs.length){
            handleUpdate()
        }
        if(deletedUserIDs.length){
            handleDelete()
        }
    }

    return (
        <div className="accounts-screen">
            <h1>Accounts</h1>
            <form className="accounts-form" onSubmit={handleSubmit}>
                {airtableUsers.map((user, idx) => {
                    const userData = usersData.find(u => u?.id === user?.id)
                    return (
                        <div key={idx} className="account">
                            <p className="account-email">{user.fields.email}</p>
                            <div className="checkbox-container">
                                <label htmlFor={`is-owner-${user.id}`}>Owner Access</label>
                                <input 
                                    type="checkbox" 
                                    name="isOwner" 
                                    id={`is-owner-${user.id}`}
                                    data-user-id={user.id} 
                                    checked={userData?.fields.isOwner}
                                    onChange={(e) => handleUpdateChange(e)}
                                    />
                            </div>
                            <div className="checkbox-container">
                                <label htmlFor={`is-admin-${user.id}`}>Admin Access</label>
                                <input 
                                    type="checkbox" 
                                    name="isAdmin" 
                                    id={`is-admin-${user.id}`} 
                                    data-user-id={user.id} 
                                    checked={userData?.fields.isAdmin}
                                    onChange={(e) => handleUpdateChange(e)}
                                />
                            </div>
                            <div className="checkbox-container">
                                <label htmlFor={user.id}>Delete</label>
                                <input 
                                    type="checkbox" 
                                    name="delete" 
                                    id={user.id} 
                                    onChange={(e) => handleDeleteChange(e)}
                                />
                            </div>
                            <p>created at:<span className="account-date">{getCreateAtDate(user.createdTime)}</span></p>
                        </div>
                    )
                })}
                <input className="big-secure-btn" type="submit" value="Submit" disabled={!updateUserIDs.length && !deletedUserIDs.length}/>
            </form>
        </div>
    )
}
