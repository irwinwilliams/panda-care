import React, { useState } from "react";
import axios from "axios";

import "./reg.css";
import "./base.css";
import "./image-upload.css";

const Register: React.FC = () => {
  const [formData, setFormData] = useState({
    parentName: "Austin Giraffe",
    email: "austin@theking.com",
    phone: "186818281828",
    address: "Twin Towers, 1 Austin Avenue, Austin, TX 78701",
    childName: "Sam Giraffe",
    dateOfBirth: "2020-01-01",
    medicalConditions: "Good to go!",
    additionalInfo: "Love all",
  });


  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      // Prepare the payload
      const payload = {
        parentName: formData.parentName,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        childName: formData.childName,
        dateOfBirth: formData.dateOfBirth,
        medicalConditions: formData.medicalConditions,
        additionalInfo: formData.additionalInfo,
        conversationReference: "ABC123XYZ", // Replace with appropriate value
      };

      //don't send to db immediately, for one main reason
      //- you don't have a conversation reference.
      //the need to get such a reference changes the flow in a beneficial way
      //since you have to send the data back down to the parent to confirm and with that confirmation, 
      //you'll get the conversation reference.

      // Make a POST request using 'no-cors' to the Azure function endpoint and display the response
      var url = "http://localhost:7071/api/PandaSave";
      //use fetch instead of axios
      const response = await fetch(url, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      //parse the respons
      const data = await response.text();
      console.log(data);

    
      // Reset the form
      // setFormData({
      //   parentName: "",
      //   email: "",
      //   phone: "",
      //   address: "",
      //   childName: "",
      //   dateOfBirth: "",
      //   medicalConditions: "",
      //   additionalInfo: "",
      // });

      // Show a success message or perform any additional actions
      console.log("Form submitted successfully!");
    } catch (error) {
      // Handle any errors
      console.error("Error submitting form:", error);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
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
            value={formData.email}
            onChange={handleChange}
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
            value={formData.childName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="flex-column">
          <label>Date of Birth:</label>
        </div>
        <div className="inputForm">
          <input type="date" className="input" name="dateOfBirth" 
           value={formData.dateOfBirth}
           onChange={handleChange}
          required />
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
            value={formData.parentName}
            onChange={handleChange}
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
            value={formData.phone}
            onChange={handleChange}
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
            value={formData.address}
            onChange={handleChange}
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
            value={formData.medicalConditions}
            onChange={handleChange}
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
            value={formData.additionalInfo}
            onChange={handleChange}
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
            id="file-input"
          />
        </label>

        <input type="submit" className="button-submit" value="Submit" />
      </form>
    </div>
  );
};

export default Register;
