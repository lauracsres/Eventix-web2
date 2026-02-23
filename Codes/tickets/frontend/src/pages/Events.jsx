import React, { useState, useEffect } from 'react';
import { Plus, X } from 'lucide-react';
import api from '../services/api';

export default function Events() {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(false);
    const [msg, setMsg] = useState({ type: '', text: '' });
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        description: '',
        type: 1,
        date: '',
        startSales: '',
        endSales: '',
        price: ''
    });

    const fetchEvents = async () => {
        try {
            const res = await api.get('/events');
            setEvents(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchEvents();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const getEventTypeName = (type) => {
        const types = {
            1: 'Show',
            2: 'Teatro',
            3: 'Esporte',
            4: 'Palestra',
            5: 'Workshop',
            6: 'Congresso',
            7: 'Networking',
            8: 'Outros'
        };
        return types[type] || 'Outros';
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMsg({ type: '', text: '' });
        try {
            const payload = {
                ...formData,
                price: parseFloat(formData.price),
                type: parseInt(formData.type)
            };
            await api.post('/events', payload);
            setMsg({ type: 'success', text: 'Evento cadastrado com sucesso!' });
            setFormData({
                description: '', type: 1, date: '', startSales: '', endSales: '', price: ''
            });
            setShowForm(false);
            fetchEvents();
        } catch (err) {
            setMsg({ type: 'error', text: err.response?.data?.message || 'Erro ao cadastrar evento.' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <div className="flex-between" style={{ marginBottom: "32px" }}>
                <div>
                    <h1 className="gradient-text">Cadastro de Eventos</h1>
                    <p>Crie eventos incríveis para a sua plataforma.</p>
                </div>
                <button
                    onClick={() => setShowForm(!showForm)}
                    className={showForm ? "secondary" : ""}
                >
                    {showForm ? <><X size={18} /> Cancelar</> : <><Plus size={18} /> Novo Evento</>}
                </button>
            </div>

            {msg.text && (
                <div className={msg.type === 'error' ? 'error-msg' : 'success-msg'}>
                    {msg.text}
                </div>
            )}

            {showForm && (
                <div className="card" style={{ marginBottom: "40px", animation: "slideDown 0.3s ease" }}>
                    <h3>Novo Evento</h3>
                    <form onSubmit={handleSubmit} style={{ marginTop: "16px" }}>
                        <div className="grid-2">
                            <div>
                                <label>Descrição</label>
                                <input type="text" name="description" value={formData.description} onChange={handleChange} required />
                            </div>
                            <div>
                                <label>Tipo</label>
                                <select name="type" value={formData.type} onChange={handleChange}>
                                    <option value={1}>Show</option>
                                    <option value={2}>Teatro</option>
                                    <option value={3}>Esporte</option>
                                    <option value={4}>Palestra</option>
                                    <option value={5}>Workshop</option>
                                    <option value={6}>Congresso</option>
                                    <option value={7}>Networking</option>
                                    <option value={8}>Outros</option>
                                </select>
                            </div>
                            <div>
                                <label>Data do Evento</label>
                                <input type="datetime-local" name="date" value={formData.date} onChange={handleChange} required />
                            </div>
                            <div>
                                <label>Início das Vendas</label>
                                <input type="datetime-local" name="startSales" value={formData.startSales} onChange={handleChange} required />
                            </div>
                            <div>
                                <label>Fim das Vendas</label>
                                <input type="datetime-local" name="endSales" value={formData.endSales} onChange={handleChange} required />
                            </div>
                            <div>
                                <label>Preço</label>
                                <input type="number" step="0.01" name="price" value={formData.price} onChange={handleChange} required />
                            </div>
                        </div>
                        <button type="submit" disabled={loading}>
                            {loading ? <span className="loader"></span> : 'Cadastrar Evento'}
                        </button>
                    </form>
                </div>
            )}

            <div style={{ marginTop: "40px" }}>
                <h3>Eventos Cadastrados</h3>
                <div className="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>Descrição</th>
                                <th>Tipo</th>
                                <th>Data</th>
                                <th>Preço</th>
                            </tr>
                        </thead>
                        <tbody>
                            {events.map(ev => (
                                <tr key={ev.id}>
                                    <td>{ev.description}</td>
                                    <td>
                                        <span className="badge">{getEventTypeName(ev.type)}</span>
                                    </td>
                                    <td>{new Date(ev.date).toLocaleString()}</td>
                                    <td>R$ {ev.price.toFixed(2)}</td>
                                </tr>
                            ))}
                            {events.length === 0 && (
                                <tr><td colSpan="4">Nenhum evento encontrado.</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
