import { Input } from "@nextui-org/react";
import React from "react";
import "./SettingRule.scss";

export interface SettingRule {
  topic: string;
  action: string;
}

interface Props {
  topic: string;
  action: string;
  onChangeTopic: (e: any) => void;
  onChangeAction: (e: any) => void;
}

export const SettingRule: React.FC<Props> = ({
  topic,
  action,
  onChangeTopic,
  onChangeAction,
}) => {
  return (
    <div className="setting-rule-row">
      <div className="setting-rule-row-left">
        For calls regarding &nbsp;&nbsp;&nbsp;
      </div>
      <Input placeholder="type a category or topic" onChange={onChangeTopic} value={topic}/>
      <div className="setting-rule-row-right">
        &nbsp;&nbsp;&nbsp;do the following action&nbsp;&nbsp;&nbsp;
      </div>
      <Input
        placeholder="type how Alfred should respond"
        className="action-input"
        onChange={onChangeAction}
        value={action}
      />
    </div>
  );
};
