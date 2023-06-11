import React from "react";
import "./reg.css";
import "./base.css";
import "./image-upload.css";

const Register: React.FC = () => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Handle form submission logic here
  };

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>🧸 Register a child today! 🧸</h1>
      <form className="form" onSubmit={handleSubmit}>
        <div className="flex-column">
          <label>Email:</label>
        </div>
        <div className="inputForm">
          <input
            type="text"
            placeholder="Enter your Email"
            className="input"
            name="email"
            required
          />
        </div>

        <div className="flex-column">
          <label>Child's Name:</label>
        </div>
        <div className="inputForm">
          <input
            type="text"
            placeholder="Enter child's name"
            className="input"
            name="childName"
            required
          />
        </div>

        <div className="flex-column">
          <label>Date of Birth:</label>
        </div>
        <div className="inputForm">
          <input type="date" className="input" name="dateOfBirth" required />
        </div>

        <div className="flex-column">
          <label>Parent's Name:</label>
        </div>
        <div className="inputForm">
          <input
            type="text"
            placeholder="Enter parent's name"
            className="input"
            name="parentName"
            required
          />
        </div>

        <div className="flex-column">
          <label>Phone Number:</label>
        </div>
        <div className="inputForm">
          <input
            type="tel"
            placeholder="Enter phone number"
            className="input"
            name="phone"
            required
          />
        </div>

        <div className="flex-column">
          <label>Address:</label>
        </div>
        <div className="inputForm">
          <textarea
            className="input"
            placeholder="Enter address"
            name="address"
            required
          ></textarea>
        </div>

        <div className="flex-column">
          <label>Medical Conditions (if any):</label>
        </div>
        <div className="inputForm">
          <textarea
            className="input"
            placeholder="Enter medical conditions (if any)"
            name="medicalConditions"
          ></textarea>
        </div>

        <div className="flex-column">
          <label>Additional Information:</label>
        </div>
        <div className="inputForm">
          <textarea
            className="input"
            placeholder="Enter additional information"
            name="additionalInfo"
          ></textarea>
        </div>

        {/* Image upload content */}
        <div className="flex-column">
          <label>Upload an image of the child</label>
        </div>
        <label htmlFor="file-input" className="drop-container">
          <input
            type="file"
            accept="image/*"
            required
            id="file-input"
          />
        </label>

        <input type="submit" className="button-submit" value="Submit" />
      </form>
    </div>
  );
};

export default Register;
