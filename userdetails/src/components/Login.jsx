import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Button, Alert } from "react-bootstrap";
import "../App.css";

function Login({ setIsAuthenticated }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [view, setView] = useState("login"); // 'login', 'forgot', 'signup'
    const navigate = useNavigate();

    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };

    const validatePassword = (password) => {
        // At least 8 chars, 1 uppercase, 1 special char
        const re = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{8,})/;
        return re.test(password);
    };

    const handleLogin = (e) => {
        e.preventDefault();
        setError("");

        // Validate email format
        if (!validateEmail(email)) {
            setError("Please enter a valid email address");
            return;
        }

        // Validate password strength (for signup)
        if (view === "signup" && !validatePassword(password)) {
            setError("Password must be at least 8 characters with 1 uppercase letter and 1 special character");
            return;
        }

        setIsLoading(true);

        // Simulate API call
        setTimeout(() => {
            setIsLoading(false);

            // For demo, accept any valid email format and password with min 8 chars
            if (email && password.length >= 8) {
                setIsAuthenticated(true);
                localStorage.setItem("isAuthenticated", "true");
                navigate("/");
            } else {
                setError("Invalid credentials");
            }
        }, 1000);
    };

    const handleForgotPassword = (e) => {
        e.preventDefault();
        if (!validateEmail(email)) {
            setError("Please enter a valid email address to reset your password");
            return;
        }

        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            alert(`Password reset instructions sent to ${email}`);
            setView("login");
        }, 1000);
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <div className="login-header">
                    <h3>User Directory</h3>
                    <p>
                        {view === "login" && "Sign in to access your account"}
                        {view === "forgot" && "Reset your password"}
                        {view === "signup" && "Create a new account"}
                    </p>
                </div>

                {error && (
                    <Alert variant="danger" className="mb-3">
                        {error}
                    </Alert>
                )}

                <form onSubmit={view === "forgot" ? handleForgotPassword : handleLogin}>
                    <div className="form-group">
                        <label htmlFor="email">Email Address</label>
                        <div className="input-with-icon">
                            <i className="fas fa-envelope"></i>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email"
                                required
                            />
                        </div>
                    </div>

                    {view !== "forgot" && (
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <div className="input-with-icon">
                                <i className="fas fa-lock"></i>
                                <input
                                    type="password"
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder={view === "signup" ? "Create a password (min 8 chars)" : "Enter your password"}
                                    required
                                    minLength={8}
                                />
                            </div>
                            {view === "signup" && (
                                <div className="password-requirements">
                                    <small>Must include: 8+ characters, 1 uppercase letter, 1 special character</small>
                                </div>
                            )}
                        </div>
                    )}

                    <button
                        type="submit"
                        className="login-btn"
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <>
                                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                {view === "forgot" ? "Sending..." : (view === "signup" ? "Creating..." : "Signing in...")}
                            </>
                        ) : view === "forgot" ? "Reset Password" : (view === "signup" ? "Create Account" : "Sign In")}
                    </button>
                </form>

                <div className="login-footer">
                    {view === "login" ? (
                        <>
                            <p>Don't have an account? <a  onClick={(e) => { e.preventDefault(); setView("signup"); }}>Sign up</a></p>
                            <p><a  onClick={(e) => { e.preventDefault(); setView("forgot"); }}>Forgot password?</a></p>
                        </>
                    ) : (
                        <p>Back to <a  onClick={(e) => { e.preventDefault(); setView("login"); }}>Login</a></p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Login;