import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Api from '../services/api';

function Register() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);

            // ✅ Send all fields in JSON format (corrected)
            await Api.post("auth/register", {
                username,
                email,
                password,
            });

            alert("✅ User registered successfully!");
            navigate("/login");
        } catch (error) {
            console.error(error);
            alert("❌ Error registering user. Try again with a different username.");
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
                    <div className="logo">🗨️</div>
                    <div className="title">Register</div>
                </div>
                <div className="d-flex align-items-center gap-2">
                    <div className="form-check form-switch m-0">
                        <input className="form-check-input" type="checkbox" id="darkToggleRegister" checked={dark} onChange={() => setDark(v => !v)} />
                        <label className="form-check-label" htmlFor="darkToggleRegister">{dark ? 'Dark' : 'Light'}</label>
                    </div>
                </div>
            </div>

            <div className="container py-5">
                <div className="row justify-content-center">
                    <div className="col-12 col-md-8 col-lg-5">
                        <div className="card chat-card shadow-lg border-0 rounded-4">
                            <div className="card-body p-4 p-md-5">
                                <div className="text-center mb-4">
                                    <div className="display-6">✨</div>
                                    <h1 className="h4 fw-bold mt-2 mb-1">Create your account</h1>
                                    <p className="text-muted mb-0">Join us to start chatting instantly</p>
                                </div>

                                <form onSubmit={handleRegister}>
                                    <div className="mb-3">
                                        <label htmlFor="username" className="form-label">Username</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="username"
                                            placeholder="Enter a username"
                                            value={username}
                                            onChange={(e) => setUsername(e.target.value)}
                                            required
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="email" className="form-label">Email</label>
                                        <input
                                            type="email"
                                            className="form-control"
                                            id="email"
                                            placeholder="you@example.com"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
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
                                                placeholder="Create a password"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                minLength={6}
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
                                        <div className="form-text">Use at least 6 characters.</div>
                                    </div>

                                    <div className="d-grid mt-4">
                                        <button
                                            type="submit"
                                            className="btn btn-primary"
                                            disabled={loading}
                                        >
                                            {loading ? (
                                                <>
                                                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                                    Creating account...
                                                </>
                                            ) : (
                                                "Create account"
                                            )}
                                        </button>
                                    </div>

                                    <div className="text-center mt-4">
                                        <span className="text-muted">Already have an account? </span>
                                        <Link to="/login">Log in</Link>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <p className="text-center small text-muted mt-3 mb-0">
                            By signing up, you agree to our Terms of Service and Privacy Policy.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;
