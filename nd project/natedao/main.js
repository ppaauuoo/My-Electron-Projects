import './style.css';
import javascriptLogo from './javascript.svg';
import viteLogo from '/vite.svg';


document.querySelector('#app').innerHTML = `
    <div id="login">
      <h2>Login</h2>
      <form>
        <label for="email">Email:</label>
        <input type="email" id="email" name="email">
        <label for="password">Password:</label>
        <input type="password" id="password" name="password">
        <button type="submit" onclick="login()">Login</button>
      </form>
      <p>Don't have an account? <a href="#" onclick="showRegister()">Register here</a>.</p>
    </div>
    
    <div id="register" style="display: none">
      <h2>Register</h2>
      <form>
        <label for="newEmail">Email:</label>
        <input type="email" id="newEmail" name="newEmail">
        <label for="newPassword">Password:</label>
        <input type="password" id="newPassword" name="newPassword">
        <button type="submit" onclick="register()">Register</button>
      </form>
      <p>Already have an account? <a href="#" onclick="showLogin()">Login here</a>.</p>
    </div>
    
    <div id="hello" style="display: none">
      <h2>Hello!</h2>
      <p>Welcome to our website.</p>
      <button onclick=" firebase.auth().signOut()">Logout</button>
    </div>
`;

