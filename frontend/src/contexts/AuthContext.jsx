import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

const API_BASE = 'http://localhost:5000';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Restore auth state from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('userID');
    if (savedUser) {
      setUser({ userID: savedUser });
    }
    setLoading(false);
  }, []);

  const login = async (userID, password) => {
    const res = await fetch(`${API_BASE}/api/auth/auth`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ userID, password }),
    });

    if (!res.ok) {
      throw new Error('Server error. Please try again.');
    }

    const data = await res.json();

    // Backend returns true/false for password match
    if (data === true) {
      localStorage.setItem('userID', userID);
      setUser({ userID });
      return true;
    } else {
      throw new Error('Invalid username or password.');
    }
  };

  const signup = async (userID, password) => {
    const res = await fetch(`${API_BASE}/api/auth/create`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ userID, password }),
    });

    if (!res.ok) {
      throw new Error('Server error. Please try again.');
    }

    const data = await res.text();

    // Backend sends 'User already in database' if user exists
    if (data === 'User already in database') {
      throw new Error('Username already taken.');
    }

    localStorage.setItem('userID', userID);
    setUser({ userID });
    return true;
  };

  const logout = () => {
    localStorage.removeItem('userID');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
