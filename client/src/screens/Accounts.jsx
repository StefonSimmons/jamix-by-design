import axios from 'axios'
import {useEffect, useState} from 'react'

export default function Accounts() {
    const [airtableUsers, setUsers] = useState([])

    useEffect(() => {
        const getAirtableUsers = async () => {
            const url = `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE}/users/?view=Gridview&fields%5B%5D=email&fields%5B%5D=isOwner&fields%5B%5D=isAdmin`
            const config = {
              headers: {
                "Authorization": `Bearer ${process.env.REACT_APP_AIRTABLE_KEY}`
              }
            }
            const {data} = await axios.get(url, config)
      
            setUsers(data.records)
          }
      
          getAirtableUsers()
    }, [])


    const getCreateAtDate = (createdAt) => {
        const datetime = new Date(createdAt)
        return new Intl.DateTimeFormat('en-US').format(datetime)
    }


    return (
        <div className="accounts-screen">
            <h1>Users</h1>
            <form className="accounts-form">
                {airtableUsers.map((user, idx) => (
                    <div key={idx} className="account">
                        <p className="account-email">{user.fields.email}</p>
                        <div className="checkbox-container">
                            <label htmlFor={`is-owner-${user.id}`}>Owner Access</label>
                            <input type="checkbox" name="" id={`is-owner-${user.id}`} checked={user.fields.isOwner}/>
                        </div>
                        <div className="checkbox-container">
                            <label htmlFor={`is-admin-${user.id}`}>Admin Access</label>
                            <input type="checkbox" name="" id={`is-admin-${user.id}`} checked={user.fields.isAdmin}/>
                        </div>
                        <div className="checkbox-container">
                            <label htmlFor={`delete-btn-${user.id}`}>Delete</label>
                            <input type="checkbox" name="" id={`delete-btn-${user.id}`} checked={false}/>
                        </div>
                        <p>created at:<span className="account-date">{getCreateAtDate(user.createdTime)}</span></p>
                    </div>
                ))}
            </form>
        </div>
    )
}
