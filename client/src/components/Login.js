import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { axiosWithAuth } from '../util/axiosWithAuth';

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  })

  let history = useHistory();

  const handleChange = e => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    })
  }

  const login = e => {
    e.preventDefault();
    axiosWithAuth()
    .post('/api/login', credentials)
    .then(res => {
      console.log(res.data.payload)
      localStorage.setItem('token', JSON.stringify(res.data.payload));

      history.push('/protected');
    })
  }  

  return (
    <div>
      <form onSubmit={login}>
        <input type="text" name="username" value={credentials.username} onChange={handleChange}/>
        <input type="password" name="password" value={credentials.password} onChange={handleChange}/>
        <button>Log in</button>
      </form>
    </div>
  )
}

export default Login