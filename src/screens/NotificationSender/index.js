import React, { useState } from "react";

export default function NotificationSender() {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [sent, setSent] = useState(false);

    async function sendNotification(event) {
        event.preventDefault();

        if(title.length && body.length) {
            console.log(title, body)
            const response = await fetch(`${process.env.REACT_APP_apiUrl}/`, {
                method: 'POST',
                headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
                body: JSON.stringify({ title, body })
            });
        }
    }

    return (
        <section>
            <h1>Enviar Notificação</h1>
            <form onSubmit={sendNotification}>
                <label>Título</label>
                <input type="text" id="email" value={title} onChange={event => setTitle(event.target.value)} />
                <label>Corpo</label>
                <input type="text" id="text" value={body} onChange={event => setBody(event.target.value)} />
                {
                    sent ? 
                    <p>Notificação enviada</p>
                    :
                    <input type="submit" value="Enviar" disabled={!(title.length && body.length)} />
                }
            </form>
        </section>
    )
}