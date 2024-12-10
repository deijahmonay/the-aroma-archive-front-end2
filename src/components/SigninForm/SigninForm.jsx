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

        </div>
        <div>
          <label htmlFor="email">Email:</label>
        </div>
        <div>
          <label htmlFor="password">Password:</label>
        </div>
      </form>
    </main>
  )
}