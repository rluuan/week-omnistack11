import React, {useState} from 'react';
import { Link, useHistory } from 'react-router-dom'
import { FiLogIn } from 'react-icons/fi'

import api from '../../services/api'

import './styles.css'

import heroesImg from '../../assets/heroes.png'
import logoImg from '../../assets/logo.svg'

export default function Logon() {
  const history = useHistory()
  const [id, setId] = useState('')

  async function handleLogin(e) {
    e.preventDefault()

    try {
      const response = await api.post('sessions', {id})
      
      localStorage.setItem('ongId', id)
      localStorage.setItem('ongName', response.data.name)
      history.push('/profile')
    
    } catch (error) {
      alert('Fail in login, try again.')
    }
  }
  return (
    <div className="logon-container">
      <section className="form">
        <img src={logoImg} alt="Be the hero"/>

        <form onSubmit={handleLogin}>
          <h1>Sign in</h1> 

          <input placeholder="Your Id" onChange={e => setId(e.target.value)}/>
          <button className="button" type="submit">Enter</button>

          <Link className="back-link" to="/register">
            <FiLogIn size={16} color="#E02041" />
            I don't have an account :v
            </Link>
        </form>
      </section>

      <img src={heroesImg} alt="Heroes"/>
    </div>
  );
}
