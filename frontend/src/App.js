import react, { useEffect, useState } from "react"
import axios from "axios"
import logo from "./logo.svg"
import "./App.css"

function App() {
	const [lists, setLists] = useState([])
	const [value, setValue] = useState("")

	useEffect(() => {
		axios.get("/api/values").then((res) => {
			console.log(res.data)
			setLists(res.data)
		})
	}, [])

	const onSubmitHandler = (e) => {
		e.preventDefault()
		axios.post("/api/values", { value }).then((res) => {
			if (res.data.success) {
				setLists([...lists, res.data.value])
				setValue("")
				console.log(lists)
			} else {
				alert("데이터 입력 실패")
			}
		})
	}
	return (
		<div className="App">
			<header className="App-header">
				<img src={logo} className="App-logo" alt="logo" />
				{lists && lists.map((list, index) => <li key={index}>{list.value}</li>)}
				<br />

				<form onSubmit={onSubmitHandler}>
					<input
						type="text"
						placeholder="입력"
						value={value}
						onChange={(e) => setValue(e.target.value)}
					/>
					<button type="submit">입력</button>
				</form>
			</header>
		</div>
	)
}

export default App
