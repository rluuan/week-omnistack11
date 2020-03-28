import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'
import './styles.css';

import api from '../../services/api'

import logoImg from '../../assets/logo.svg'

export default function Register() {
	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [whatsapp, setWhatsapp] = useState('')
	const [city, setCity] = useState('')
	const [uf, setUf] = useState('')

	const history = useHistory();


	async function handleRegister(e) {
		e.preventDefault()
		const data = {
			name, 
			email,
			whatsapp,
			city,
			uf
		}
		try {
			const response = await api.post('/ongs', data)
			alert(`Your id de acesso: ${response.data.id}`)
			history.push('/')
		} catch (error) {
			alert(`Error in your register, try again.`)
		}
		
	}
	return (
		<div className="register-container">
			<div className="content">
				<section>
					<img src={logoImg} alt="Be the Hero" />
					<h1>Sign up</h1>
					<p>Create an account, enter on platform and help peoples the find cases of your ONG</p>
					
					<Link className="back-link" to="/">
						<FiArrowLeft size={16} color="#E02041" />
						I dont have an account
					</Link>
				</section>

				<form onSubmit={handleRegister}>
					<input type="text" placeholder="Name ONG" 	onChange={e => setName(e.target.value)}/>
					<input type="email" placeholder="E-mail" 	onChange={e => setEmail(e.target.value)}/>
					<input type="text" placeholder="Whatsapp" 	onChange={e => setWhatsapp(e.target.value)}/>

					<div className="input-group">
						<input type="text" placeholder="City" 	onChange={e => setCity(e.target.value)}/>
						<input type="text" placeholder="UF" 	onChange={e => setUf(e.target.value)}style={{width: 80 }}/>
					</div>

					<button className="button" type="Submit">Cadaster</button>
				</form>
			</div>
		</div>
	)
}
