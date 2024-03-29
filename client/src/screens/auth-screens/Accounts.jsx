import {useEffect, useState} from 'react'
import {atAPI, config} from '../../services/apiConfig'

export default function Accounts({destroyUsers, updateUsers, user, restricted}) {
    const [updateUserIDs, setUpdateIDs] = useState([]) // to track updated records
    const [deletedUserIDs, setDeletedUserIDs] = useState([]) // to track deleted record

    const [usersData, setUsersData] = useState([]) // for updating user data and sending
    const [airtableUsers, setAirtableUsers] = useState([]) // for listing on pg only

    const [submitMsg, setSubmitMsg] = useState(null)
    const [refresh, setRefresh] = useState(false)

    useEffect(() => {
        const getAirtableUsers = async () => {
            const {data} = await atAPI.get("/users/?view=Gridview&fields%5B%5D=email&fields%5B%5D=isOwner&fields%5B%5D=isAdmin", config)
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
    }, [refresh])


    const getCreateAtDate = (createdAt) => {
        const datetime = new Date(createdAt)
        return new Intl.DateTimeFormat('en-US').format(datetime)
    }

    const handleUpdateChange = (e) => {
        const {name, dataset: {userId}} = e.target
        setUpdateIDs(prev => {
            if(prev.includes(userId)){
                return prev
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
                            isAdmin: false,
                            isOwner: false,
                            [name]: !u.fields[name],
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


    const handleSubmit = async (e) => {
        e.preventDefault()
        if(updateUserIDs.length){
            const status = await updateUsers(usersData)
            if(status === 200) {
                setSubmitMsg('Updated!')
                setUpdateIDs([])
                setTimeout(() => {
                    setSubmitMsg(null)
                }, 3000)
            }
        }
        if(deletedUserIDs.length){
            const status = await destroyUsers(deletedUserIDs)
            if(status === 204){
                setDeletedUserIDs([])
                setRefresh(prev => !prev)
            }
        }
    }


    if((!user?.isOwner)){
        return (
          <div className='no-access'>
              <h1>Sorry. You do not have access to this page.</h1>
          </div>
        )
    }
    return (
        <div className={`accounts-screen ${restricted && "restricted-screen"}`}>
            <h1>Accounts</h1>
            <form className="accounts-form" onSubmit={handleSubmit}>
                {airtableUsers.map((user, idx) => {
                    const userData = usersData.find(u => u?.id === user?.id)
                    return (
                        <div key={idx} className={`account ${deletedUserIDs.includes(user.id) ? "to-delete" : ""}`}>
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
                                    checked={deletedUserIDs.includes(user.id)}
                                    onChange={(e) => handleDeleteChange(e)}
                                />
                            </div>
                            <p>created on:<span className="account-date">{getCreateAtDate(user.createdTime)}</span></p>
                        </div>
                    )
                })}
                <input className={`big-secure-btn`} type="submit" value={`${submitMsg || 'Submit' }`} disabled={!updateUserIDs.length && !deletedUserIDs.length}/>
            </form>
        </div>
    )
}
