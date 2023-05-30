const loginFormHandler = async function(event) {
    event.preventDefault();

    const usernameEl = document.querySelector('#username-input');
    const passwordEl = document.querySelector('#password-input');

    try { 
      const response = await fetch('api/user/login', {
        method: 'POST',
        body: JSON.stringify({
            username: usernameEl.value.trim(),
            password: passwordEl.value.trim()
        }),
        headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        throw new Error(response.statusText);
    } 
    } catch (err){
      alert(err.message);
    }
};

const signupFormHandler = async (event) => {
    event.preventDefault();
  
    const name = document.querySelector('#username-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();
  
    if (name && email && password) {
      try {
        const response = await fetch('/api/users', {
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
  
  document.querySelector('.login-form').addEventListener('submit', loginFormHandler);
  
  document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);