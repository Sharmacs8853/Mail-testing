'use client';
import { useState } from 'react';

export default function Home() {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: '',
    email: '',
  });
  const [message, setMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage('Submitting...');

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (response.ok) {
        setMessage('✅ Success! Check your email for a copy of your response.');
        setFormData({ name: '', age: '', gender: '', email: '' });
      } else {
        setMessage(result.error || 'Something went wrong.');
      }
    } catch (error) {
      setMessage('⚠️ Network error. Please try again.');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-lg rounded-lg bg-white p-8 shadow-xl md:w-1/2">
        <h1 className="mb-6 text-center text-3xl font-bold text-gray-800">
          User Registration
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="mb-1 block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text" id="name" name="name" value={formData.name}
              onChange={handleChange} placeholder="Full Name" required
              className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm 
                         focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="age" className="mb-1 block text-sm font-medium text-gray-700">Age</label>
            <input
              type="number" id="age" name="age" value={formData.age}
              onChange={handleChange} placeholder="e.g., 25" required
              className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm 
                         focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="gender" className="mb-1 block text-sm font-medium text-gray-700">Gender</label>
            <select
              id="gender" name="gender" value={formData.gender}
              onChange={handleChange} required
              className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm 
                         focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="">Select Gender</option>
              <option>Male</option>
              <option>Female</option>
              <option>Non-binary</option>
              <option>Prefer not to say</option>
            </select>
          </div>

          <div>
            <label htmlFor="email" className="mb-1 block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email" id="email" name="email" value={formData.email}
              onChange={handleChange} placeholder="you@example.com" required
              className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm 
                         focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-md bg-blue-600 py-2 text-white transition duration-200 
                       hover:bg-blue-700 focus:outline-none focus:ring-2 
                       focus:ring-blue-500 focus:ring-offset-2"
          >
            Submit
          </button>
        </form>

        {message && <p className="mt-4 text-center text-sm">{message}</p>}
      </div>
    </div>
  );
}
