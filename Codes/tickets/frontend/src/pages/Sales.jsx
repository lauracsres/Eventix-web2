import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { Link } from 'react-router-dom';

export default function Sales() {
    const [sales, setSales] = useState([]);
    const [users, setUsers] = useState({});
    const [msg, setMsg] = useState({ type: '', text: '' });

    const fetchData = async () => {
        try {
            const [salesRes, usersRes] = await Promise.all([
                api.get('/sales'),
                api.get('/users')
            ]);

            // Map users to an object for fast lookup by ID
            const usersMap = {};
            usersRes.data.forEach(u => {
                usersMap[u.id] = u.name;
            });

            setSales(salesRes.data);
            setUsers(usersMap);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleStatusChange = async (saleId, newStatus) => {
        try {
            await api.put(`/sales/${saleId}/status`, { saleStatus: newStatus });
            setMsg({ type: 'success', text: 'Status atualizado com sucesso!' });
            fetchData();
        } catch (err) {
            setMsg({ type: 'error', text: 'Erro ao atualizar status.' });
        }
    };

    return (
        <div>
            <div className="flex-between" style={{ marginBottom: "32px" }}>
                <div>
                    <h1 className="gradient-text">Vendas Realizadas</h1>
                    <p>Gerencie o status dos ingressos vendidos</p>
                </div>
                <Link to="/sales/new">
                    <button>Nova Venda</button>
                </Link>
            </div>

            {msg.text && (
                <div className={msg.type === 'error' ? 'error-msg' : 'success-msg'}>
                    {msg.text}
                </div>
            )}

            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>ID Venda</th>
                            <th>Evento</th>
                            <th>Comprador</th>
                            <th>Data Venda</th>
                            <th>Status</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sales.map(s => (
                            <tr key={s.id}>
                                <td title={s.id}>{s.id.substring(0, 8)}...</td>
                                <td>{s.event.description}</td>
                                <td>
                                    <strong>{users[s.userId] || 'Carregando...'}</strong>
                                    <div style={{ fontSize: '0.8em', color: '#8b949e' }}>ID: {s.userId.substring(0, 5)}...</div>
                                </td>
                                <td>{new Date(s.saleDate).toLocaleString()}</td>
                                <td>
                                    <span className={`badge ${s.saleStatus.toLowerCase()}`}>
                                        {s.saleStatus}
                                    </span>
                                </td>
                                <td>
                                    <select
                                        value={s.saleStatus}
                                        onChange={(e) => handleStatusChange(s.id, e.target.value)}
                                        style={{ width: 'auto', margin: 0, padding: '6px 12px' }}
                                    >
                                        <option value="EM_ABERTO">Em Aberto</option>
                                        <option value="PAGO">Pago</option>
                                        <option value="CANCELADO">Cancelado</option>
                                        <option value="ESTORNADO">Estornado</option>
                                    </select>
                                </td>
                            </tr>
                        ))}
                        {sales.length === 0 && (
                            <tr><td colSpan="6">Nenhuma venda encontrada.</td></tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
