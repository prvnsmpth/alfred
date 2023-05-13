import { Input } from "@nextui-org/react";
import React from "react";
import "./SettingRule.scss";

export interface SettingRule {
    topic: string;
    action: string;
}

export const SettingRule = () => {
  return (
    <div className="setting-rule-row">
      <div className="setting-rule-row-left">
        For calls in &nbsp;&nbsp;&nbsp;
      </div>
      <Input placeholder="type a category or topic" />
      <div className="setting-rule-row-right">
        &nbsp;&nbsp;&nbsp;do the following action&nbsp;&nbsp;&nbsp;
      </div>
      <Input placeholder="type how Alfred should respond" className="action-input"/>
    </div>
  );
};
