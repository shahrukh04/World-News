import React, { useState, FormEvent } from 'react';
import { loginUser } from '../../services/api';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/common/Button';
import { useAuthStore } from '../../stores/authStore';

const Login = () => {
  const { login } = useAuthStore();
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const data = await loginUser({ username, password });
      // Transform the API response to match the auth store format
      login({ 
        user: { 
          _id: data._id, 
          username: data.username,
          email: '', // Backend doesn't provide email yet
          firstName: data.username, // Use username as firstName for now
          lastName: '',
          role: 'admin', // Default role for admin users
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }, 
        token: data.token 
      });
      navigate('/admin');
    } catch {
      setError('Invalid username or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50">
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded p-8 w-96">
        <h2 className="text-2xl mb-6 font-semibold text-center">Admin Login</h2>

        {error && <div className="mb-4 text-red-600 text-center">{error}</div>}

        <div className="mb-4">
          <label className="block mb-1 font-semibold" htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
            className="w-full border px-3 py-2 rounded"
            autoFocus
          />
        </div>

        <div className="mb-6">
          <label className="block mb-1 font-semibold" htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <Button type="submit" disabled={loading} className="w-full">
          {loading ? 'Logging in...' : 'Login'}
        </Button>
      </form>
    </div>
  );
};

export default Login;
