import React, { useState, useEffect } from 'react';
import api from '../services/api';

export default function CreateSale() {
    const [events, setEvents] = useState([]);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [msg, setMsg] = useState({ type: '', text: '' });

    const [formData, setFormData] = useState({
        userId: '',
        eventId: '',
        saleStatus: 'PAGO'
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [eventsRes, usersRes] = await Promise.all([
                    api.get('/events'),
                    api.get('/users')
                ]);
                setEvents(eventsRes.data);
                setUsers(usersRes.data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchData();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMsg({ type: '', text: '' });
        try {
            await api.post('/sales', formData);
            setMsg({ type: 'success', text: 'Venda criada com sucesso!' });
            setFormData({
                userId: '',
                eventId: '',
                saleStatus: 'PAGO'
            });
        } catch (err) {
            setMsg({ type: 'error', text: err.response?.data?.message || 'Erro ao criar venda.' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h1 className="gradient-text">Nova Venda</h1>
            <p style={{ marginBottom: "32px" }}>Registre uma nova venda de ingresso manualmente.</p>

            {msg.text && (
                <div className={msg.type === 'error' ? 'error-msg' : 'success-msg'}>
                    {msg.text}
                </div>
            )}

            <div className="card" style={{ maxWidth: '600px' }}>
                <form onSubmit={handleSubmit}>
                    <div className="flex-column">
                        <div>
                            <label>Selecionar Usuário</label>
                            <select name="userId" value={formData.userId} onChange={handleChange} required>
                                <option value="">Selecione um usuário...</option>
                                {users.map(u => (
                                    <option key={u.id} value={u.id}>{u.name} ({u.email})</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label>Evento</label>
                            <select name="eventId" value={formData.eventId} onChange={handleChange} required>
                                <option value="">Selecione um evento...</option>
                                {events.map(ev => (
                                    <option key={ev.id} value={ev.id}>{ev.description} - R$ {ev.price.toFixed(2)}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label>Status da Venda</label>
                            <select name="saleStatus" value={formData.saleStatus} onChange={handleChange}>
                                <option value="EM_ABERTO">Em Aberto</option>
                                <option value="PAGO">Pago</option>
                                <option value="CANCELADO">Cancelado</option>
                                <option value="ESTORNADO">Estornado</option>
                            </select>
                        </div>

                        <button type="submit" disabled={loading} style={{ marginTop: '16px' }}>
                            {loading ? <span className="loader"></span> : 'Registrar Venda'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
