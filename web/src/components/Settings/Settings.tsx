import React from "react";
import "./Settings.scss";
import { Button, Checkbox, Text } from "@nextui-org/react";
import { SettingRule } from "../SettingRule/SettingRule";

export const Settings = () => {
  const [settingRules, setSettingRules] = React.useState<SettingRule[]>([]);
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
      <br />
      <Text h3 className="settings-title">
        Rules
      </Text>
      <div className="settings-rules-list">
        <div>
          <SettingRule />
        </div>
        <Button size="xs">Add +</Button>
      </div>
    </div>
  );
};
