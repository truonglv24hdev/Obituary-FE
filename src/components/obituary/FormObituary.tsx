import React from "react";
import { Switch } from "../ui/switch";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { UseFormReturn } from "react-hook-form";

interface ObituaryFormProps {
  title: string;
  subtitleButtonLabel?: string;
  onSubtitleClick?: () => void;
  show: boolean;
  setShow: (value: boolean) => void;
  name: string;
  form: UseFormReturn<any>; // Add form prop
  placeholder?: string;
}

const FormObituary = ({
  title,
  subtitleButtonLabel,
  onSubtitleClick,
  show,
  setShow,
  name,
  form,
  placeholder,
}: ObituaryFormProps) => {
  return (
    <div className="space-y-7 h-[328px]">
      <div className="flex items-center justify-between">
        <div className="h-10 flex items-center gap-8">
          <h3 className="text-[32px] font-medium">{title}</h3>
          {subtitleButtonLabel && (
            <Button
              variant="outline"
              size="sm"
              className="h-10 museo text-base"
              onClick={onSubtitleClick}
            >
              {subtitleButtonLabel}
            </Button>
          )}
        </div>
        <Switch checked={show} onCheckedChange={setShow} />
      </div>
      {show && (
        <FormField
          control={form.control}
          name={name}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder={placeholder}
                  className="border-dashed h-[260px]"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      )}
    </div>
  );
};

export default FormObituary;