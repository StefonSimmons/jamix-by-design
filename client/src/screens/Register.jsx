import {useState} from 'react'
import { Link } from 'react-router-dom'

export default function Register({ register, setUser }) {

    const [userCred, setUserCred] = useState({
        email: null,
        password: null,
        isOwner: false
    })

    // const [passwordConfirmed, setPasswordConfirmed] = useState(null)
    
    const createUser = async (e) => {
        e.preventDefault()
        const res = await register(userCred)
        setUser(res)
    }

    const handleChange = (e) => {
        const name = e.target.name
        const value = e.target.value

        setUserCred(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleCheck = () => {
        setUserCred(prev => ({
            ...prev,
            isOwner: !prev.isOwner
        }) )
    }

    return (
        <div className="register-screen">
            <form className="register-form" onSubmit={(e) => createUser(e)}>
                <input type="text" name="email" placeholder="Email" onChange={(e) => handleChange(e)}/>
                <input type="password" name="password" placeholder="Password" onChange={(e) => handleChange(e)}/>
                {/* <input type="password" name="passwordConfirmation" placeholder="Password Confirmation" onChange={(e) => handleChange(e)}/> */}
                <div className="is-owner-section">
                    <label htmlFor="isOwner">Owner?</label>
                    <input type="checkbox" name="isOwner" id="isOwner" checked={userCred.isOwner} onChange={handleCheck}/>
                </div>
                <input type="submit" value="Create Account" />
                <Link to="/jamix-admin-login">
                    Login
                </Link>
            </form>
        </div>
    )
}
