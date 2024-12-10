import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom'
import * as authService from '../../services/authService'

const SigninForm = () => {
  const navigate = useNavigate()
  const [message, setMessage] = useState([''])
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  })

  const updateMessage = (msg) => {
    setMessage(msg)
  }

  const handleChange = (e) => {
    updateMessage('')
    setFormData({...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try{
      const user = await authService.signin(formData)
      props.setUser(user)
      navigate('/')
    }catch(err) {
      updateMessage(err.message)
    }
  }

  return (
    <main>
      <h1>Sign In</h1>
      <p>{message}</p>
      <form autoComplete="off" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input 
          type="text"
          autoComplete="off"
          id="username"
          value={formData.username}
          name="username"
          onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input 
          type="text"
          autoComplete="off"
          id="email"
          value={formData.email}
          name="email"
          onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input 
          type="text"
          autoComplete="off"
          id="password"
          value={formData.password}
          name="password"
          onChange={handleChange}
          />
        </div>
        <div>
          <button>Sign In</button>
          <Link to='/'>
          <button>Cancel</button>
          </Link>
        </div>
      </form>
    </main>
  )
}

export default SigninForm