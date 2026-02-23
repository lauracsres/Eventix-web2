import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, ShoppingCart } from 'lucide-react';

export default function Dashboard() {
    return (
        <div>
            <h1 className="gradient-text">Olá! Que bom ter você aqui no Eventix</h1>
            <p>Gerencie seus eventos e acompanhe as vendas de ingressos de forma simples e intuitiva.</p>

            <div className="grid-2" style={{ marginTop: '32px' }}>
                <div className="card">
                    <div className="flex-between">
                        <h3>Eventos</h3>
                        <Calendar color="#58a6ff" />
                    </div>
                    <p>Cadastre novos eventos e visualize a programação.</p>
                    <Link to="/events"><button style={{ marginTop: '16px' }}>Ir para Eventos</button></Link>
                </div>

                <div className="card">
                    <div className="flex-between">
                        <h3>Vendas</h3>
                        <ShoppingCart color="#A371F7" />
                    </div>
                    <p>Acompanhe ingressos vendidos e altere status de pagamento.</p>
                    <Link to="/sales"><button style={{ marginTop: '16px' }}>Ver Vendas</button></Link>
                </div>
            </div>
        </div>
    );
}
