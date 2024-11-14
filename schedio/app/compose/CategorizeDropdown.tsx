import * as React from "react"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function CategorizeDropdown() {
  return (
    <Select>
      <SelectTrigger className="w-full shadow-none bg-accent text-grey">
        <SelectValue placeholder="Select a fruit" />
      </SelectTrigger>
      <SelectContent className="shadow-none bg-accent text-grey">
        <SelectGroup>
          <SelectItem value="tip">Tip</SelectItem>
          <SelectItem value="promotion">promotion</SelectItem>
          <SelectItem value="thread">thread</SelectItem>
          <SelectItem value="motivation">Motivation</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
