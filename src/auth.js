export function getAuthForm() {
  return `
  <form class="mui-form" id="auth__form">

          <div class="mui-textfield mui-textfield--float-label">
            <input type="email" id="input__email">
            <label for="input__email">Email</label>
          </div>

          <div class="mui-textfield mui-textfield--float-label">
            <input type="password" id="input__password">
            <label for="input__password">Пароль</label>
          </div>

          <button type="submit" class="mui-btn mui-btn--raised mui-btn--primary">Войти</button>
        </form>
  `;
}
////////////////////////////////////////////////////////
export function authWithEmailAndPassword(email, password) {
  const apiKey = "AIzaSyDQEOQanauq_kIYxYFa38fN1IDjR9EH42Q";
  return fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`, {
    method: 'POST',
    body: JSON.stringify({
      email: email, 
      password: password,
      returnSecureToken: true
    }),
    headers: {
      'Content-Type': 'application/json'
    } 
  })
  .then(response => response.json())
  .then(data => data.idToken)
}