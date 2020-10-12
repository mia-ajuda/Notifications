import React, { useState } from "react";

export default function NotificationSender() {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [sent, setSent] = useState(null);

    async function sendNotification(event) {
        event.preventDefault();
        setSent(null);
        if(title.length && body.length) {
            const response = await fetch(`${process.env.REACT_APP_apiUrl}/api/notifications/send`, {
                method: 'POST',
                headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
                body: JSON.stringify({ title, body })
            });
            if (response.status === 200) {
                setSent(true);
            } else {
                setSent(false);
            }
        }
    }

    return (
        <section className="card-section">
            <h1>Enviar Notificação</h1>
            <form onSubmit={sendNotification}>
                <label>Título</label>
                <input autoComplete="off" type="text" id="email" value={title} onChange={event => setTitle(event.target.value)} />
                <label>Corpo</label>
                <input autoComplete="off" type="text" id="text" value={body} onChange={event => setBody(event.target.value)} />
                {
                    sent === true && <p className="success">Notificação enviada</p>
                }
                {
                    sent === false && <p className="error">Houve um erro ao enviar a notificação</p>
                }
                {
                    sent === null && <input className={!(title.length && body.length) ? 'disabled' : null} type="submit" value="Enviar" disabled={!(title.length && body.length)} />
                }
            </form>
        </section>
    )
}