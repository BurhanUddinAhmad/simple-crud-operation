import { useState } from "react";
import { Link, useLoaderData } from "react-router-dom";


const Users = () => {
    const loadedUsers = useLoaderData();
    const [users, setUsers] = useState(loadedUsers);

    const styles = {
        border: "2px solid blue",
        padding: "10px",
        margin: "5px"
    }

    const handleDelete = id => {
        console.log("Delete", id);
        fetch(`http://localhost:5000/users/${id}`, {
            method: 'DELETE'
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            if(data.deletedCount > 0) {
                alert('Deleted Successfully!');
                const remaining = users.filter(user => user._id !== id);
                setUsers(remaining);
            }
        })

    }
    return (
        <>
            <h2>Total Users: {users.length}</h2>
            {
                users.map(user => <div style={styles} key={user._id}>
                <p><strong>ID: </strong>{user._id}</p>
                <p><strong>Name: </strong>{user.name}</p>
                <p><strong>Email: </strong>{user.email}</p>
                <p>
                    <Link to={`/update/${user._id}`} > <button>Update</button> </Link>
                    <button onClick={() => handleDelete(user._id)}>X</button>
                </p>
                </div> )
            }
        </>
    );
};

export default Users;