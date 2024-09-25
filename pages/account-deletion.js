import React, { useState } from 'react';

export default function AccountDeletion() {
  const [email, setEmail] = useState('');
  const [memberNo, setMemberNo] = useState('');
  const [reason, setReason] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/delete-account', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, memberNo, reason }),
      });

      if (response.ok) {
        setSubmitStatus('success');
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    }

    setIsSubmitting(false);
  };

  return (
    <div>
      <style jsx>{`
        .container {
          max-width: 500px;
          margin: 2rem auto;
          padding: 2rem;
          background-color: white;
          border-radius: 8px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .title {
          font-size: 1.75rem;
          font-weight: bold;
          margin-bottom: 1.5rem;
          color: #333;
        }

        .form {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .input-group {
          display: flex;
          flex-direction: column;
        }

        .label {
          font-size: 0.875rem;
          font-weight: 500;
          margin-bottom: 0.5rem;
          color: #555;
        }

        .input {
          padding: 0.75rem;
          border: 1px solid #ccc;
          border-radius: 6px;
          font-size: 1rem;
        }

        .textarea {
          padding: 0.75rem;
          border: 1px solid #ccc;
          border-radius: 6px;
          font-size: 1rem;
        }

        .button {
          padding: 0.75rem;
          border: none;
          border-radius: 6px;
          background-color: #4f46e5;
          color: white;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }

        .button:hover {
          background-color: #3730a3;
        }

        .button:disabled {
          background-color: #888;
          cursor: not-allowed;
        }

        .success-message,
        .error-message {
          padding: 1rem;
          border-radius: 6px;
          margin-top: 1rem;
          font-size: 0.875rem;
          font-weight: 500;
        }

        .success-message {
          background-color: #d1e7dd;
          color: #0f5132;
          border: 1px solid #badbcc;
        }

        .error-message {
          background-color: #f8d7da;
          color: #842029;
          border: 1px solid #f5c2c7;
        }
      `}</style>

      <div className="container">
        <h1 className="title">Account Deletion Request</h1>
        <form onSubmit={handleSubmit} className="form">
          <div className="input-group">
            <label htmlFor="email" className="label">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="input"
            />
          </div>
          <div className="input-group">
            <label htmlFor="memberNo" className="label">
              Member No
            </label>
            <input
              type="text"
              id="memberNo"
              value={memberNo}
              onChange={(e) => setMemberNo(e.target.value)}
              required
              className="input"
            />
          </div>
          <div className="input-group">
            <label htmlFor="reason" className="label">
              Reason for deletion
            </label>
            <textarea
              id="reason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              required
              className="textarea"
              rows="3"
            ></textarea>
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="button"
          >
            {isSubmitting ? 'Submitting...' : 'Submit Request'}
          </button>
        </form>
        {submitStatus === 'success' && (
          <div className="success-message">
            Your account deletion request has been submitted successfully.
          </div>
        )}
        {submitStatus === 'error' && (
          <div className="error-message">
            An error occurred while submitting your request. Please try again.
          </div>
        )}
      </div>
    </div>
  );
}
