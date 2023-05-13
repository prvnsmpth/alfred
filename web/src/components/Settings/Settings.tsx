import React from "react";
import "./Settings.scss";
import { Checkbox, Spacer, Text } from "@nextui-org/react";

export const Settings = () => {
  return (
    <div className="settings-container">
      <br />
      <Text h3 className="settings-title">
        Settings
      </Text>
      <div className="settings-list">
        <Checkbox
          isRounded
          defaultSelected
          color="primary"
          className="setting-item"
          size="sm"
        >
          Auto-answer Spam Calls
        </Checkbox>
        <Checkbox
          isRounded
          defaultSelected
          color="primary"
          className="setting-item"
          size="sm"
        >
          Show notifications
        </Checkbox>
      </div>
    </div>
  );
};
