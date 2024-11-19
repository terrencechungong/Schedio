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

export function CreateDraftDropdown() {
    // fix hover
  return (
    <Select>
      <SelectTrigger className="w-full shadow-none bg-gray-200 border-[0px]">
        <SelectValue placeholder="Create draft" />
      </SelectTrigger>
      <SelectContent className="shadow-none bg-gray-200">
        <SelectGroup>
          <SelectItem className="hover:bg-gray-300" value="apple">Apple</SelectItem>
          <SelectItem className="hover:bg-gray-300" value="banana">Banana</SelectItem>
          <SelectItem className="hover:bg-gray-300" value="blueberry">Blueberry</SelectItem>
          <SelectItem className="hover:bg-gray-300" value="grapes">Grapes</SelectItem>
          <SelectItem className="hover:bg-gray-300" value="pineapple">Pineapple</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
