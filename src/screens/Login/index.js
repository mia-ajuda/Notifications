import React, { useState } from "react";
import * as firebase from 'firebase/app';
import 'firebase/auth';

const config = {
    apiKey: process.env.REACT_APP_apiKey,
    authDomain: process.env.REACT_APP_authDomain,
    databaseURL: process.env.REACT_APP_databaseURL,
    projectId: process.env.REACT_APP_projectId,
    appID: process.env.REACT_APP_appID,
}
firebase.initializeApp(config)
const auth = firebase.auth;

export default function Login({ history }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    async function handleLogin(event) {
        event.preventDefault();
        try {
            await auth().signInWithEmailAndPassword(email, password);
            await getUser();
        } catch (error) {
            setError(error.message);
            console.error(error);
        }
    }

    async function getUser() {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                user.getIdToken().then(token => {
                    localStorage.setItem('accessToken', token);
                    localStorage.setItem('userEmail', user.email);
                    history.push('/send');
                })
            }
        })
    }

    return (
        <section className="card-section">
            <h1>Login</h1>
            <form className="login-form" onSubmit={handleLogin}>
                <label>Email</label>
                <input type="text" id="email" value={email} onChange={event => setEmail(event.target.value)} />
                <label>Senha</label>
                <input type="password" id="password" value={password} onChange={event => setPassword(event.target.value)} />
                <input type="submit" value="Login" />
                { error.length > 0 && <p className="error">{error}</p>}
            </form>
        </section>
    )
}