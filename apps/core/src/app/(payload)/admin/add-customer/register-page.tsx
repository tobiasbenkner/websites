'use client';
import { useState } from 'react';

export default function RegisterPage() {
    const [email, setEmail] = useState('');
    const [tenant, setTenant] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const res = await fetch('/admin/add-customer/action', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password, name, tenant }),
        });

        const data = await res.json();

        if (res.ok) {
            setSuccess(true);
            setError('');
        } else {
            setError(data.message || 'Registrierung fehlgeschlagen.');
        }
    };

    return (
        <div className="max-w-md mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4">Registrieren</h1>
            {success ? (
                <p className="text-green-600">Registrierung erfolgreich!</p>
            ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        placeholder="Tenant"
                        className="w-full p-2 border"
                        value={tenant}
                        onChange={(e) => setTenant(e.target.value)}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Name"
                        className="w-full p-2 border"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    <input
                        type="email"
                        placeholder="E-Mail"
                        className="w-full p-2 border"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Passwort"
                        className="w-full p-2 border"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button type="submit" className="bg-blue-500 text-white p-2 w-full">
                        Registrieren
                    </button>
                    {error && <p className="text-red-500">{error}</p>}
                </form>
            )}
        </div>
    );
}
