import { Link, useNavigate } from "react-router-dom";
import rigoImageUrl from "../assets/img/rigo-baby.jpg";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { useEffect, useState } from "react";
import contactAPI from "../services/contactAPI.js";

export const Home = () => {

	const { store, dispatch } = useGlobalReducer()
	const [contacts, setContacts] = useState([])

	const navigate = useNavigate()

	const handleNavigate = () => {
		navigate('/test')
	}

	useEffect(()=>{
		contactAPI.getUser().then(data=> setContacts(data.agendas))
	},[])

	const handleSelectAgenda = (slug) => {
		dispatch({
			type: 'selectAgenda',
			payload: {
				agenda: slug
			}
		})
	}

	useEffect(()=>{
		contactAPI.getAgenda(store.agenda).then(data=>dispatch({
			type: 'setContacts',
			payload: {
				contacts
			}
		}))
	}, [store.agenda])

console.log(contacts)

	return (
		<div className="text-center mt-5">
			<h1>Hello Rigo!!</h1>
			<p>
				<img src={rigoImageUrl} />

				<Link to='/test'>
					llevame a test
				</Link>

				<button onClick={handleNavigate}>
					Go to Test
				</button>
			</p>

			<ul>
				{store.agendas?.map(el => <li key={el.slug} onClick={()=> getAgenda}></li>)}
			</ul>
		</div>
	);
}; 