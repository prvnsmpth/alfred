import React, { useEffect } from "react";
import "./Settings.scss";
import { Button, Checkbox, Text } from "@nextui-org/react";
import { SettingRule } from "../SettingRule/SettingRule";

export const Settings = () => {
  const [settingRules, setSettingRules] = React.useState<SettingRule[]>([]);
  const [containerLoaded, setContainerLoaded] = React.useState<boolean>(false);
  useEffect(() => {
    try {
      const settingRulesData = JSON.parse(
        localStorage.getItem("settingRules") || "[]"
      );
      setSettingRules(settingRulesData);
    } catch (error) {}
    setTimeout(() => {
      setContainerLoaded(true);
    }, 200);
  }, []);
  return (
    <div
      className={`settings-container ${
        containerLoaded ? "container-loaded" : ""
      }`}
    >
      <br />
      <Text h3 className="settings-title">
        Settings
      </Text>
      <br />
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
      <br />
      <Text h3 className="settings-title">
        <span>Rules</span>
        <Button
          color="success"
          className="save-button"
          size="xs"
          onClick={() => {
            localStorage.setItem("settingRules", JSON.stringify(settingRules));
            // setSettingRules([...settingRules, { topic: "", action: "" }]);
          }}
        >
          Save
        </Button>
      </Text>
      <br />
      <div className="settings-rules-list">
        <div>
          {settingRules.map((settingRule: SettingRule, index) => (
            <SettingRule
              {...settingRule}
              onChangeAction={(e) => {
                const newSettingRules = [...settingRules];
                newSettingRules[index].action = e.target.value;
                setSettingRules(newSettingRules);
              }}
              onChangeTopic={(e) => {
                const newSettingRules = [...settingRules];
                newSettingRules[index].topic = e.target.value;
                setSettingRules(newSettingRules);
              }}
            />
          ))}
          {/* <SettingRule topic="" action="" /> */}
        </div>
        <Button
          size="xs"
          onClick={() => {
            setSettingRules([...settingRules, { topic: "", action: "" }]);
          }}
        >
          Add +
        </Button>
      </div>
    </div>
  );
};
