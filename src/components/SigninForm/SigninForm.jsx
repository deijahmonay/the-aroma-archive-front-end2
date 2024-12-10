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
}