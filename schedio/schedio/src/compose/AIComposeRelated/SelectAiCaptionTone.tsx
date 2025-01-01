import * as React from "react"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} 
// @ts-ignore
from "@/components/ui/select";

interface SelectAiCaptionInterface {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}

export const SelectAiCaptionTone: React.FC<SelectAiCaptionInterface> = ({value, setValue}) => {
  return (
    <Select onValueChange={(value) => setValue(value)}>
      <SelectTrigger
        style={{ boxShadow: 'none' }}
        className="w-[133px] h-[30px] rounded-[0px] shadow-none border-t-0 border-l-0 border-r-0">
        <SelectValue placeholder="Tone" />
      </SelectTrigger>
      <SelectContent style={{ boxShadow: 'none' }} className="shadow-none max-h-[300px]">
        <SelectGroup>
          <SelectItem value="assertive">Assertive</SelectItem>
          <SelectItem value="catchy">Catchy</SelectItem>
          <SelectItem value="engaging">Engaging</SelectItem>
          <SelectItem value="humorous">Humorous</SelectItem>
          <SelectItem value="inspirational">Inspirational</SelectItem>
          <SelectItem value="professional">Professional</SelectItem>
          <SelectItem value="promotional">Promotional</SelectItem>
          <SelectItem value="shocking">Shocking</SelectItem>
          <SelectItem value="informative">Informative</SelectItem>
          <SelectItem value="casual">Casual</SelectItem>
          <SelectItem value="excited">Excited</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
