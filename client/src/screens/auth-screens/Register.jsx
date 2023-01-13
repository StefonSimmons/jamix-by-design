import {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Register({ register, setUser }) {

    const [userCred, setUserCred] = useState({
        email: null,
        password: null,
    })

    // const [passwordConfirmed, setPasswordConfirmed] = useState(null)
    const navigate = useNavigate()
    const [load, setLoad] = useState(false)

    const createUser = async (e) => {
        e.preventDefault()
        setLoad(true)
        const res = await register(userCred)
        if(res){
            setLoad(false)
            setUser(res)
            setUserCred({
                email: null,
                password: null,
            })
            navigate('/')
        }
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
                { !load ? 
                    <input className="big-secure-btn" type="submit" value="Create Account" />
                    :
                    <button className='big-secure-btn'><div className="loader"></div></button>
                }
                <Link to="/jamix-admin/login">
                    Login
                </Link>
            </form>
        </div>
    )
}
