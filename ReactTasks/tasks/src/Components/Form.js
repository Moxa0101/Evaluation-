import React, { useState } from 'react';
import '../assets/Form.css';

function Main() {
  const [showForm, setShowForm] = useState(false);
  const [submissions, setSubmissions] = useState([]);

  const handleFormSubmit = (data) => {
    setSubmissions(prev => [...prev, data]);
    setShowForm(false);
  };

  const handleDelete = (index) => {
    const updated = submissions.filter((_, i) => i !== index);
    setSubmissions(updated);
  };

  return (
    <div>
      <div className='d-flex justify-content-center align-items-center'>
        <button className='start' onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Hide Form' : 'Show Form'}
        </button>
      </div>

      {showForm && (
        <Form
          onSubmit={handleFormSubmit}
          submissions={submissions}
          showForm={showForm}
        />
      )}

      <div className='ctn'>
        <h3>Submitted Entries:</h3>
        {submissions.map((user, index) => (
          <div key={index} className='card'>
            <p><strong>FirstName:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Age:</strong> {user.age}</p>
            <button className="btn btn-danger" onClick={() => handleDelete(index)} disabled={showForm}>
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function Form({ onSubmit, submissions }) {
  const [form, setForm] = useState({ name: '', email: '', age: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'age') {
      if (!/^\d*$/.test(value)) return;
      if (Number(value) > 120) return;
    }

    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name.trim() || !form.email.trim() || !form.age.trim()) {
      alert("Name and email and age are required!");
      return;
    }
     if (!/^[a-zA-Z\s]+$/.test(form.name.trim())) {
      alert("Name must contain only letters and spaces!");
      return;
    }
    const isDuplicate = submissions.some(
      entry => entry.email.trim().toLowerCase() === form.email.trim().toLowerCase()
    );
    if (isDuplicate) {
      alert("This email is already submitted!");
      return;
    }

    const ageNum = Number(form.age);
    if (ageNum < 0 || ageNum > 120) {
      alert("Age must be between 0 and 120.");
      return;
    }

    onSubmit(form);
    setForm({ name: '', email: '', age: '' });
  };

  const handleReset = () => {
    setForm({ name: '', email: '', age: '' });
  };

  return (
    <div className='container'>
      <form className="row g-3 needs-validation" noValidate onSubmit={handleSubmit}>
        <div className="col-md-4">
          <label htmlFor="validationCustom01" className="form-label">Name:</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder='Enter your Full Name'
            required
          />
        </div>

        <div className="col-md-6">
          <label htmlFor="validationCustom03" className="form-label">Email:</label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder='Enter your Email'
            required
          />
        </div>

        <div className="col-md-3">
          <label className="form-label">Age:</label>
          <input
            type="text"
            className="form-control"
            name="age"
            value={form.age}
            onChange={handleChange}
            placeholder='Enter your Age'
            required
          />
        </div>

        <div className="col-12">
          <button className="btn btn-primary" type="submit">Submit form</button>
          <button className="btn btn-primary" type="reset" onClick={handleReset}>Reset form</button>
        </div>
      </form>
    </div>
  );
}

export default Main;
