import { FormEvent, useState } from "react";
import { TextField, PrimaryButton } from '@fluentui/react';

import {
  Image
} from "@fluentui/react-components";
import "./RealtimeUpdates.css";

export default function RealtimeUpdate() {

  const [childName, setChildName] = useState("Mel");
  const [timeOfDay, setTimeOfDay] = useState("10:00 am");
  const [updateType, setUpdateType] = useState("Nutrition");
  const [comments, setComments] = useState("Ate all fruits and vegetables");
  const [parentName, setParentName] = useState("Jimmy");

  const handleSendUpdate = () => {
    console.log("Sending update");
    // Perform REST API call to send the update with the form data
    const updateData = {
      childName,  
      timeOfDay,
      updateType,
      comments,
      parentName,
    };
    // Invoke the REST API endpoint with the updateData
    // Example code:
    fetch("http://localhost:3978/api/notify", {
      method: "POST",
      mode: 'no-cors', // Set mode to 'no-cors'
      body: JSON.stringify(updateData),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response from the API
        console.log(data);
      })
      .catch((error) => {
        // Handle any errors
        console.error(error);
      });
  };

  return (
    <div className="welcome page">
      <div className="narrow page-padding">
        <Image src="hello.png" />
        <h1 className="center">Hi there!</h1>

        <div className="tabList">
          <div>
              <div>
                <h2>Send Daycare Update</h2>
                <form>
                  <TextField
                    required
                    label="Child's Name"
                    style={{ marginTop: "6px" }}
                    value={childName}
                    onChange={(_event: FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?:string) => setChildName(newValue || "")}
                  />
                  
                  <TextField
                    required
                    label="Parent's Name"
                    value={parentName}
                    onChange={(_event: FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?:string) => setParentName(newValue || "")}
                  />
                  <TextField
                    required
                    label="Time of Day"
                    value={timeOfDay}
                    onChange={(_event: FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?:string) => setTimeOfDay(newValue || "")}
                  />

                  <TextField
                    required
                    label="Update Type"
                    value={updateType}
                    onChange={(_event: FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?:string) => setUpdateType(newValue || "")}
                  />
                  <TextField
                    required
                    label="Update"
                    value={comments}
                    onChange={(_event: FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?:string) => setComments(newValue || "")}
                  />

                  
                  
                  <PrimaryButton onClick={handleSendUpdate}
                    color="primary"
                    style={{ marginTop: "16px" }}>
                    Send Update
                  </PrimaryButton>
                </form>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
}
