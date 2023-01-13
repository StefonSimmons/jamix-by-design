import {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Login({ login, setUser }) {

    const navigate = useNavigate()
    const [userCred, setUserCred] = useState({
        email: null,
        password: null
    })
    const [unauthorized, setUnauthorized] = useState(null)
    
    const getUser = async (e) => {
        e.preventDefault()
        const res = await login(userCred)
        if(res.email){
            setUnauthorized(null)
            setUser(res)
            if(res.isOwner){
                navigate('/jamix-admin/accounts')
            }else if (res.isAdmin){
                navigate('/jamix-admin/home')
            }else{
                navigate('/')
            }
        }else if (res.error){
            setUnauthorized(res.error.toLowerCase())
        }
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
                <input className={unauthorized} type="text" name="email" placeholder="Email" onChange={(e) => handleChange(e)}/>
                <input className={unauthorized} type="password" name="password" placeholder="Password" onChange={(e) => handleChange(e)}/>
                <input className="big-secure-btn" type="submit" value="Login" />
                <p className={unauthorized}>incorrect email and/or password</p>
                <Link to="/jamix-admin/register">
                    Create Account
                </Link>
            </form>
        </div>
    )
}
