import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'
import './styles.css';
import api from '../../services/api'

import logoImg from '../../assets/logo.svg'

export default function NewIncident() {
	const [title, setTitle] = useState('')
	const [description, setDescription] = useState('')
	const [value, setValue] = useState(0)
		
	const ongId = localStorage.getItem('ongId')
	const history = useHistory()

	async function handleNewIncidents(e) {
		e.preventDefault()

		const data = {
			title,
			description,
			value
		}
		console.log(title, description, value)
		try {
			await api.post('incidents', data, {
				headers: {
					Authorization: ongId
				}
			})
			history.push('/profile')
		} catch (error) {
			alert('Error cadaster case, try again.')
		}
	}
	
	return (
		<div className="new-incident-container">
			<div className="content">
				<section>
					<img src={logoImg} alt="Be the Hero" />
					<h1>Cadaster new case.</h1>
					<p>Write the detailed case to find a hero for solve it.</p>
					
					<Link className="back-link" to="/">
						<FiArrowLeft size={16} color="#E02041" />
						Go back home
					</Link>
				</section>

				<form onSubmit={handleNewIncidents}>
					<input      placeholder="Case title"  onChange={e => setTitle(e.target.value) } value={title}/>
					<textarea   placeholder="Description" onChange={e => setDescription(e.target.value) } value={description}/>
					<input      placeholder="Value in reais" onChange={e => setValue(e.target.value) } value={value}/>

					<button className="button" type="Submit">Cadaster</button>
				</form>
			</div>
		</div>
	)
}
