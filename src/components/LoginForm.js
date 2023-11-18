import { useState } from "react";
import FirebaseAuthService from "../config/firebaseAuthService";

function LoginForm ({ existingUser }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');


    async function handleSubmit(event){
        event.preventDefault();

        try{
            await FirebaseAuthService.loginUser(username, password);
            setUsername("");
            setPassword("");
        } catch (err) {
            alert(err.message);
        }
    }

    function handleLogout(){
        FirebaseAuthService.logoutUser();
    }

    return <div>
        {
            existingUser ? (<div>
                <h3>Welcome, {existingUser.email}</h3>
                <button type="button" className="btn btn-dark" onClick={handleLogout}>Logout</button>
            </div>
            ) : (
                <form onSubmit={handleSubmit}>
                    <label>
                        Correo Electrónico:
                        <input
                            type="email"
                            required
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="input-text"
                        >
                        </input>
                    </label>
                    <label>
                    Contraseña:
                        <input
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="input-text"
                        ></input>
                    </label>
                    <div className="button-box">
                        <button className="btn btn-primary">Login</button>
                    </div>
                </form>
            )
        }
    </div>
}

export default LoginForm;