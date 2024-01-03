function login() {
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;
  
    // Create a user object
    const user = { username, password };
  
    // Send the user data to the server using fetch
    fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    })
    .then(response => response.json())
    .then(data => {
      console.log('User login', data);
      alert('User login successfully!');
    })
    .catch(error => {
      console.error('Error loggin user:', error);
      alert('Error login user. Please try again.');
    });
  }