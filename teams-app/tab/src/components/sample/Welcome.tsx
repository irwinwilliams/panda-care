import { useState } from "react";
import {
  Image,
  TabList,
  Tab,
  SelectTabEvent,
  SelectTabData,
  TabValue,
} from "@fluentui/react-components";
import "./Welcome.css";
import { EditCode } from "./EditCode";
import { Deploy } from "./Deploy";
import { Publish } from "./Publish";
import { AddSSO } from "./AddSSO";
import RealtimeUpdate  from "./RealtimeUpdate";
import Register  from "./Register";

export function Welcome() {
  
  const [selectedValue, setSelectedValue] = useState<TabValue>("publish");

  const onTabSelect = (event: SelectTabEvent, data: SelectTabData) => {
    setSelectedValue(data.value);
  };

  return (
    <div className="welcome page translucent">
      {/* <div className="narrow page-padding"> */}
        <div className="tabList">
          <TabList selectedValue={selectedValue} onTabSelect={onTabSelect}>
            {/* <Tab id="register" value="register">
              1. Register child
            </Tab> */}
            <Tab id="publish" value="publish">
              Publish updates
            </Tab>
            {/* <Tab id="realtimeUpdate" value="realtimeUpdates">
              3. View realtime updates
            </Tab> */}
          </TabList>
          <div>
            {selectedValue === "register" && (
              <div>
                <Register />
              </div>
            )}
            {selectedValue === "publish" && (
              <div>
                <RealtimeUpdate />
              </div>
            )}
            {selectedValue === "realtimeUpdates" && (
              <div>
                <Publish />
              </div>
            )}
          </div>
        </div>
      {/* </div> */}
    </div>
  );
}
