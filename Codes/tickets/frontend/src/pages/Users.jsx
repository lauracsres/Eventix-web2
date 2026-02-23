import React, { useState, useEffect } from 'react';
import api from '../services/api';

export default function Users() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [msg, setMsg] = useState({ type: '', text: '' });
    const [formData, setFormData] = useState({
        name: '',
        email: ''
    });

    const fetchUsers = async () => {
        try {
            const res = await api.get('/users');
            setUsers(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMsg({ type: '', text: '' });
        try {
            await api.post('/users', formData);
            setMsg({ type: 'success', text: 'Usuário cadastrado com sucesso!' });
            setFormData({ name: '', email: '' });
            fetchUsers();
        } catch (err) {
            setMsg({ type: 'error', text: err.response?.data?.message || 'Erro ao cadastrar usuário.' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h1 className="gradient-text">Gerenciamento de Usuários</h1>
            <p style={{ marginBottom: "32px" }}>Cadastre e visualize os usuários do sistema.</p>

            {msg.text && (
                <div className={msg.type === 'error' ? 'error-msg' : 'success-msg'}>
                    {msg.text}
                </div>
            )}

            <div className="card">
                <h3>Novo Usuário</h3>
                <form onSubmit={handleSubmit} style={{ marginTop: "16px" }}>
                    <div className="grid-2">
                        <div>
                            <label>Nome</label>
                            <input type="text" name="name" value={formData.name} onChange={handleChange} required />
                        </div>
                        <div>
                            <label>Email</label>
                            <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                        </div>
                    </div>
                    <button type="submit" disabled={loading}>
                        {loading ? <span className="loader"></span> : 'Cadastrar Usuário'}
                    </button>
                </form>
            </div>

            <div style={{ marginTop: "40px" }}>
                <h3>Usuários Cadastrados</h3>
                <div className="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>Nome</th>
                                <th>Email</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(u => (
                                <tr key={u.id}>
                                    <td>{u.name}</td>
                                    <td>{u.email}</td>
                                </tr>
                            ))}
                            {users.length === 0 && (
                                <tr><td colSpan="2">Nenhum usuário encontrado.</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
