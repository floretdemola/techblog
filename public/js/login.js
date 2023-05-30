const loginFormHandler = async function(event) {
    event.preventDefault();

    const usernameEl = document.querySelector('#username-input');
    const passwordEl = document.querySelector('#password-input');

    console.log(usernameEl, passwordEl);

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

document.querySelector('.login-form').addEventListener('submit', loginFormHandler);