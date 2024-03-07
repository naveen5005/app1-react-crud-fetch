import React, { useEffect, useState } from 'react'
import '../Styles/CommonStyles.css'
const FunctComp01 = () => {
    const [user, setUser] = useState({
        fname: "",
        gender: "",
        areasOfInterest: [],
        state: ""
    })
    const [users,setUsers] = useState([])
    const [index ,setIndex] = useState(null);
    const handleChange = (e) => {
        const newUser = { ...user };
        if (e.target.name === "areasOfInterest") {
            if (e.target.checked) {
                console.log(e)
                newUser.areasOfInterest.push(e.target.value);
            } else {
                console.log(e)
                var index = newUser.areasOfInterest.indexOf(e.target.value);
                if (index !== -1) {
                    newUser.areasOfInterest.splice(index, 1);
                }
            }
        } else if (e.target.name === "state") {
            e.target.childNodes.forEach((opt) => {
                if (opt.selected) {
                    newUser[e.target.name] = opt.value;
                }
            })
        }
        else {
            newUser[e.target.name] = e.target.value
        }
        setUser(newUser)
    }
    const addUser = () => {
        fetch("http://localhost:3000/users", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user)
        })
        clearForm();
        getDataFromServer();
    }
    useEffect(() => {
        getDataFromServer();
    }, [])
    const getDataFromServer = () =>{
        fetch("http://localhost:3000/users", {
            method: "GET",
            headers: { 'Content-Type': 'application/json' },
            body: null
        }).then((res) => {
            return res.json()
        }).then((data) => {
            setUsers(data)
        })
    }
    const deleteUser = (payload) =>{
        console.log(payload);
        fetch("http://localhost:3000/users/"+payload.id,{
            method:"DELETE"
        });
        getDataFromServer();
    }
    const editUser = (user) =>{
        setUser(user);
        setIndex(user.id);
    }
    const updateUser = () =>{
        console.log(user)
        fetch("http://localhost:3000/users/"+user.id,{
            method:"PUT",
            headers:{'Content-Type':'application/json'},
            body : JSON.stringify(user)
        })
        setIndex(null);
        clearForm();
        getDataFromServer();
    }
    const clearForm = () =>{
        setUser({
            fname: "",
            gender: "",
            areasOfInterest: [],
            state: ""
        })
    }
    return (
        <div className='mainContainer'>
            <div className="formDisplay">
                <form action="">
                    <label htmlFor="">Fullname : </label>
                    <input type="text" name="fname" value={user.fname} onChange={handleChange} /> <br />

                    <label htmlFor="">gender : </label>
                    <input type="radio" name="gender" checked={user.gender === "Male"} onChange={handleChange} value={"Male"} /> Male
                    <input type="radio" name="gender" checked={user.gender === "Female"} onChange={handleChange} value={"Female"} /> Female
                    <input type="radio" name="gender" checked={user.gender === "Other"} onChange={handleChange} value={"Other"} /> Other <br />

                    <label htmlFor="">Areas Of Interest : </label>
                    <input type="checkbox" checked={user.areasOfInterest.includes("HTML")} name="areasOfInterest" onChange={handleChange} value={"HTML"} /> HTML
                    <input type="checkbox" checked={user.areasOfInterest.includes("CSS")} name="areasOfInterest" onChange={handleChange} value={"CSS"} /> CSS
                    <input type="checkbox" checked={user.areasOfInterest.includes("JS")} name="areasOfInterest" onChange={handleChange} value={"JS"} /> JS
                    <input type="checkbox" checked={user.areasOfInterest.includes("REACTJS")} name="areasOfInterest" onChange={handleChange} value={"REACTJS"} /> REACTJS <br />

                    <label htmlFor="">state : </label>
                    <select name="state" value={user.state} onChange={handleChange}>
                        <option value=""></option>
                        <option value="AP">AP</option>
                        <option value="TN">TN</option>
                        <option value="TS">TS</option>
                        <option value="KA">KA</option>
                    </select> <br />

                    {index === null ? <button type="button" onClick={addUser}>Add User</button>
                    : <button type="button" onClick={updateUser}>update User</button>}

                </form>
            </div>
            <div className="tableDisplay">
                <table>
                    <thead>
                        <tr>
                            <th>fullname</th>
                            <th>gender</th>
                            <th>areas of interest</th>
                            <th>state</th>
                            <th>edit</th>
                            <th>delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((usr,i)=>{
                                return(
                                    <tr key={i}>
                                        <td>{usr.fname}</td>
                                        <td>{usr.gender}</td>
                                        <td>{usr.areasOfInterest.join(",")}</td>
                                        <td>{usr.state}</td>
                                        <td>
                                            <button type="button" onClick={()=>{editUser(usr)}}>edit</button>
                                        </td>
                                        <td>
                                            <button type="button" onClick={()=>{deleteUser(usr)}}>delete</button>
                                        </td>

                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default FunctComp01
