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
import Reports  from "./Reports";
import Assistant from "./Assistant";

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
              Updates
            </Tab>
            {/* <Tab id="realtimeUpdate" value="realtimeUpdates">
              3. View realtime updates
            </Tab> */}
            <Tab id="reports" value="reports">
              Reports
            </Tab>
            <Tab id="assistant" value="assistant">
              Child Care Assistant
            </Tab>
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
            {selectedValue === "reports" && (
              <div>
                <Reports />
              </div>
            )}
            {selectedValue === "assistant" && (
              <div>
                <Assistant />
              </div>
            )}
          </div>
        </div>
      {/* </div> */}
    </div>
  );
}
