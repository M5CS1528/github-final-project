import React, { useState } from "react";

export default function Register() {
  const [form, setForm] = useState({
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage("");

    try {
      const response = await fetch("/djangoapp/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: form.username,
          first_name: form.firstName,
          last_name: form.lastName,
          email: form.email,
          password: form.password,
        }),
      });

      if (!response.ok) {
        const detail = await response.text();
        throw new Error(detail || "Registration failed. Check the server endpoint.");
      }

      setMessage("Registration request submitted successfully.");
    } catch (error) {
      setMessage(error.message || "Could not connect to the registration service.");
    }
  };

  return (
    <main className="container py-5" style={{ maxWidth: 560 }}>
      <h1 className="mb-2">Sign-up</h1>
      <p className="text-muted mb-4">Create an account to get started.</p>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label" htmlFor="username">Username</label>
          <input className="form-control" id="username" name="username"
            value={form.username} onChange={handleChange} autoComplete="username" required />
        </div>

        <div className="mb-3">
          <label className="form-label" htmlFor="firstName">First Name</label>
          <input className="form-control" id="firstName" name="firstName"
            value={form.firstName} onChange={handleChange} autoComplete="given-name" required />
        </div>

        <div className="mb-3">
          <label className="form-label" htmlFor="lastName">Last Name</label>
          <input className="form-control" id="lastName" name="lastName"
            value={form.lastName} onChange={handleChange} autoComplete="family-name" required />
        </div>

        <div className="mb-3">
          <label className="form-label" htmlFor="email">Email</label>
          <input className="form-control" type="email" id="email" name="email"
            value={form.email} onChange={handleChange} autoComplete="email" required />
        </div>

        <div className="mb-4">
          <label className="form-label" htmlFor="password">Password</label>
          <input className="form-control" type="password" id="password" name="password"
            value={form.password} onChange={handleChange} autoComplete="new-password" required />
        </div>

        <button className="btn btn-primary w-100" type="submit">Register</button>
        {message && <p className="mt-3" role="status">{message}</p>}
      </form>
    </main>
  );
}
