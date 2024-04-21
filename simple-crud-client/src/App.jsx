import './App.css'

function App() {
  const handleAddUser = e => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const user = { name, email };
    console.log(user);

    fetch('http://localhost:5000/users', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(user)
    })
    .then(res => res.json())
    .then(data => {
      console.log(data)
      if(data.insertedId) {
        alert('User added Successfully!');
        form.reset();
      }
    })
  }


  return (
    <>
      
      <h1>Simple CRUD</h1>

      <form onSubmit={handleAddUser}>
        <input type="text" name="name" id="name" /><br />
        <input type="email" name="email" id="email" /> <br />
        <button>Add User</button>
      </form>
      
    </>
  )
}

export default App
