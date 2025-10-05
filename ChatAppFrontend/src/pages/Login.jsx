import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Api from '../services/api';

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      // ✅ Corrected endpoint and data format
      const response = await Api.post("/auth/login", { username, password });

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        alert("✅ Login successful!");
        navigate("/chat");
      }
    } catch (err) {
      console.error(err);
      alert("❌ Invalid credentials. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const [dark, setDark] = useState(() => localStorage.getItem('theme') === 'dark');

  useEffect(() => {
    localStorage.setItem('theme', dark ? 'dark' : 'light');
  }, [dark]);

  return (
    <div className={`chat-shell ${dark ? 'theme-dark' : 'theme-light'}`}>
      <div className="chat-header gradient">
        <div className="brand d-flex align-items-center gap-2">
          <div className="logo">🔐</div>
          <div className="title">Login</div>
        </div>
        <div className="d-flex align-items-center gap-2">
          <div className="form-check form-switch m-0">
            <input className="form-check-input" type="checkbox" id="darkToggleLogin" checked={dark} onChange={() => setDark(v => !v)} />
            <label className="form-check-label" htmlFor="darkToggleLogin">{dark ? 'Dark' : 'Light'}</label>
          </div>
        </div>
      </div>

      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-12 col-md-8 col-lg-5">
            <div className="card chat-card shadow-lg border-0 rounded-4">
              <div className="card-body p-4 p-md-5">
                <div className="text-center mb-4">
                  <div className="display-6">👋</div>
                  <h1 className="h4 fw-bold mt-2 mb-1">Welcome back</h1>
                  <p className="text-muted mb-0">Log in to continue</p>
                </div>

                <form onSubmit={handleLogin}>
                  <div className="mb-3">
                    <label htmlFor="username" className="form-label">Username</label>
                    <input
                      type="text"
                      className="form-control"
                      id="username"
                      placeholder="Your username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                    />
                  </div>

                  <div className="mb-2">
                    <label htmlFor="password" className="form-label">Password</label>
                    <div className="input-group">
                      <input
                        type={showPassword ? "text" : "password"}
                        className="form-control"
                        id="password"
                        placeholder="Your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                      <button
                        type="button"
                        className="btn btn-outline-secondary ms-2"
                        onClick={() => setShowPassword((s) => !s)}
                        aria-label="Toggle password visibility"
                      >
                        {showPassword ? "Hide" : "Show"}
                      </button>
                    </div>
                  </div>

                  <div className="d-flex justify-content-between align-items-center mt-2">
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" id="remember" />
                      <label className="form-check-label" htmlFor="remember">Remember me</label>
                    </div>
                    <a href="#" className="small">Forgot password?</a>
                  </div>

                  <div className="d-grid mt-4">
                    <button type="submit" className="btn btn-primary" disabled={loading}>
                      {loading ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                          Signing in...
                        </>
                      ) : (
                        "Sign in"
                      )}
                    </button>
                  </div>

                  <div className="text-center mt-4">
                    <span className="text-muted">New here? </span>
                    <Link to="/">Create an account</Link>
                  </div>
                </form>
              </div>
            </div>
            <p className="text-center small text-muted mt-3 mb-0">
              Secure login powered by best practices.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
 