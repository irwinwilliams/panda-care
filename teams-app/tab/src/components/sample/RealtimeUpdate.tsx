import { FormEvent, useState, useEffect } from "react";
import { TextField, PrimaryButton, IComboBox } from '@fluentui/react';
import { Dropdown, IDropdownOption } from "@fluentui/react";
import { initializeIcons } from '@fluentui/react/lib/Icons';
import { TimePicker, ITimePickerProps } from "@fluentui/react";

import {
  Image
} from "@fluentui/react-components";
import "./RealtimeUpdates.css";

export default function RealtimeUpdate() {

  const [childName, setChildName] = useState("Mel");
  //set time of day to current time
  var today = new Date();
  const [timeOfDay, setTimeOfDay] = useState(today);
  const [selectedTime, setSelectedTime] = useState<Date | undefined>(undefined);
  const [updateType, setUpdateType] = useState("Nutrition");
  const [comments, setComments] = useState("Ate all fruits and vegetables");
  const [parentName, setParentName] = useState("Jimmy");
  const [conversationReference, setConversationReference] = useState("");

  const [parentChildPairs, setParentChildPairs] = useState([]);

  initializeIcons(/* optional base url */);

  useEffect(() => {
    console.log("Fetching parent-child pairs");
    // Fetch parent-child name pairs with conversation IDs from the Azure function
    fetch("https://pandapandapanda.azurewebsites.net/api/PandaCareFamBam?code=u0uwuzjwQ9bSDoVdGlg9Z748y5A12qd7VLyag-2T--mhAzFuqIaqlw==",{
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        // Set the parent-child pairs in state
        setParentChildPairs(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleSendUpdate = () => {
    console.log("Sending update");
    //get conversation reference using parent and child name
    var refIntermediary = parentChildPairs.find((pair: any) => pair.ParentName === parentName && pair.ChildName[0] === childName);
    //extract conversation reference from intermediary
    //cast intermediary as any to avoid type errors
    var convRef = (refIntermediary as any).ConversationReference[0]; 
    console.log(convRef);
    setConversationReference(convRef);
    // Perform REST API call to send the update with the form data
    const updateData = {
      childName,  
      timeOfDay,
      updateType,
      comments,
      parentName,
      conversationReference
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
    <div>
              <div>
                <h2>Send Daycare Update</h2>
                <form>
                <Dropdown
                  required  
                  label="Childs's Name"
                  selectedKey={parentName}
                  options={parentChildPairs.map((pair: any) => ({
                    key: pair.ParentName,
                    text: pair.ChildName[0],
                    conv: pair.ConversationReference[0]
                  }))}
                  onChange={(_event: React.FormEvent<HTMLDivElement>, option?: IDropdownOption) =>
                    {
                    setParentName(option?.key as string || "");
                    setChildName(option?.text as string || "");
                    }
                  }
                />

                  <TimePicker
                    label="Time of Day"
                    value={selectedTime}
                    onChange={(event: FormEvent<IComboBox>, time: Date) =>{
                      setTimeOfDay(time || undefined);
                    }}
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
  );
}
