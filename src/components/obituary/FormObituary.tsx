import React, { useState } from "react";
import { Switch } from "../ui/switch";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";

interface ObituaryForm {
  title: string;
  subtitleButtonLabel?: string;
  onSubtitleClick?: () => void;
  show: boolean;
  setShow: (value: boolean) => void;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  minHeight?: string;
}

const FormObituary = ({
  title,
  subtitleButtonLabel,
  onSubtitleClick,
  show,
  setShow,
  name,
  value,
  onChange,
  placeholder,
  minHeight = "200px",
}: ObituaryForm) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h3 className="text-lg font-medium">{title}</h3>
          {subtitleButtonLabel && (
            <Button
              variant="outline"
              size="sm"
              className="text-xs"
              onClick={onSubtitleClick}
            >
              {subtitleButtonLabel}
            </Button>
          )}
        </div>
        <Switch checked={show} onCheckedChange={setShow} />
      </div>
      {show && (
        <Textarea
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`min-h-[${minHeight}] border-dashed`}
        />
      )}
    </div>
  );
};

export default FormObituary;
