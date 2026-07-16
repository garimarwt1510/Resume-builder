// filename: frontend/src/pages/Login.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { validateLoginForm } from "../utils/validators";
import { notifySuccess, notifyError } from "../utils/toast";
import Input from "../components/common/Input";
import Button from "../components/common/Button";
import Card from "../components/common/Card";
import "./AuthPages.css";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateLoginForm(form);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length) return;

    setLoading(true);
    try {
      await login(form.email, form.password);
      notifySuccess("Welcome back!");
      navigate("/dashboard");
    } catch (err) {
      notifyError(err.response?.data?.message || "Login failed. Check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <Card className="auth-card">
        <h2>Log in</h2>
        <p className="auth-subtitle">Pick up right where you left off.</p>
        <form onSubmit={handleSubmit} noValidate>
          <Input
            label="Email"
            type="email"
            name="email"
            autoComplete="email"
            value={form.email}
            onChange={handleChange}
            error={errors.email}
          />
          <Input
            label="Password"
            type="password"
            name="password"
            autoComplete="current-password"
            value={form.password}
            onChange={handleChange}
            error={errors.password}
          />
          <Button type="submit" fullWidth loading={loading}>Log in</Button>
        </form>
        <p className="auth-switch">
          New here? <Link to="/register">Create an account</Link>
        </p>
      </Card>
    </div>
  );
};

export default Login;
