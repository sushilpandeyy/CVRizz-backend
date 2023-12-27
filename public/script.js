function createUser() {
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
  
    // Create a user object
    const user = { username, email, password };
  
    // Send the user data to the server using fetch
    fetch('http://localhost:3000/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    })
    .then(response => response.json())
    .then(data => {
      console.log('User created:', data);
      alert('User created successfully!');
    })
    .catch(error => {
      console.error('Error creating user:', error);
      alert('Error creating user. Please try again.');
    });
  }
  