import {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Login({ login, setUser }) {

    const navigate = useNavigate()
    const [userCred, setUserCred] = useState({
        email: null,
        password: null
    })
    
    const getUser = async (e) => {
        e.preventDefault()
        const res = await login(userCred)
        setUser(res)
        navigate('/jamix-admin/accounts')
    }

    const handleChange = (e) => {
        const name = e.target.name
        const value = e.target.value
        setUserCred(prev => ({
            ...prev,
            [name]: value
        }))
    }

    return (
        <div className="login-screen">
            <form className="login-form" onSubmit={(e) => getUser(e)}>
                <input type="text" name="email" placeholder="Email" onChange={(e) => handleChange(e)}/>
                <input type="password" name="password" placeholder="Password" onChange={(e) => handleChange(e)}/>
                <input className="big-secure-btn" type="submit" value="Login" />
                <Link to="/jamix-admin/register">
                    Create Account
                </Link>
            </form>
        </div>
    )
}
