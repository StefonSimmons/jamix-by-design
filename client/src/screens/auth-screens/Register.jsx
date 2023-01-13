import {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Register({ register, setUser }) {

    const [userCred, setUserCred] = useState({
        email: null,
        password: null,
    })

    // const [passwordConfirmed, setPasswordConfirmed] = useState(null)
    const navigate = useNavigate()
    const createUser = async (e) => {
        e.preventDefault()
        const res = await register(userCred)
        setUser(res)
        setUserCred({
            email: null,
            password: null,
        })
        navigate('/')
    }

    const handleChange = (e) => {
        const {name, value} = e.target
        setUserCred(prev => ({
            ...prev,
            [name]: value
        }))
    }

    return (
        <div className="register-screen">
            <form className="register-form" onSubmit={(e) => createUser(e)}>
                <input type="text" name="email" placeholder="Email" onChange={(e) => handleChange(e)}/>
                <input type="password" name="password" placeholder="Password" onChange={(e) => handleChange(e)}/>
                {/* <input type="password" name="passwordConfirmation" placeholder="Password Confirmation" onChange={(e) => handleChange(e)}/> */}
                <input className="big-secure-btn" type="submit" value="Create Account" />
                <Link to="/jamix-admin/login">
                    Login
                </Link>
            </form>
        </div>
    )
}
