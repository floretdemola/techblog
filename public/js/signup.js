const signupFormHandler = async (event) => {
    event.preventDefault();
  
    const name = document.querySelector('#username-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();
  
    if (name && email && password) {
      try {
        const response = await fetch('/api/user', {
          method: 'POST',
          body: JSON.stringify({ name, email, password }),
          headers: { 'Content-Type': 'application/json' },
        });
    
        if (response.ok) {
          document.location.replace('/profile');
        } else {
          throw new Error(response.statusText);
        } 
      } catch (err){
        alert(err.message);
    }}
  };

  document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);