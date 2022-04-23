import "./App.css";
import { useState } from "react";
import axios from "axios";

function App() {
	const [name, setName] = useState("");
	const [age, setAge] = useState(0);
	const [country, setCountry] = useState("");
	const [position, setPosition] = useState("");
	const [wage, setWage] = useState(0);

	const [employeeList, setEmployeeList] = useState([]);

	const addEmployee = () => {
		axios
			.post("http://localhost:3001/create", {
				name: name,
				age: age,
				country: country,
				position: position,
				wage: wage,
			})
			.then(() => {
				console.log("Employee successfully added.");
				getEmployees();
			});
	};

	const getEmployees = async () => {
		const getResponse = await axios.get("http://localhost:3001/");
		setEmployeeList(getResponse.data);
	};

	return (
		<div className='App'>
			<h1>Employees Management</h1>
			<div className='information'>
				<label>Name:</label>
				<input type='text' onChange={(e) => setName(e.target.value)} />
				<label>Age:</label>
				<input type='number' onChange={(e) => setAge(e.target.value)} />
				<label>Country:</label>
				<input type='text' onChange={(e) => setCountry(e.target.value)} />
				<label>Position:</label>
				<input type='text' onChange={(e) => setPosition(e.target.value)} />
				<label>Wage in US$ (year):</label>
				<input type='number' onChange={(e) => setWage(e.target.value)} />
				<button type='button' class='btn btn-primary' onClick={addEmployee}>
					Add Employee
				</button>
			</div>
			<hr />
			<div className='information'>
				<button type='button' class='btn btn-danger' onClick={getEmployees}>
					Show Employees
				</button>
				<table class='table table-striped table-hover'>
					<thead>
						<th>Name</th>
						<th>Age</th>
						<th>Country</th>
						<th>Position</th>
						<th>Wage in US$ (year)</th>
					</thead>
					<tbody>
						{employeeList.map((item, index) => {
							return (
								<tr key={index}>
									<td>{item.name}</td>
									<td>{item.age}</td>
									<td>{item.country}</td>
									<td>{item.position}</td>
									<td>{item.wage.toFixed(2)}</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
		</div>
	);
}

export default App;
