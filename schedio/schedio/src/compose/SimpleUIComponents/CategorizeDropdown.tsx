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
import { X } from "lucide-react"

export function CategorizeDropdown() {
  return (
    <Select>
     <SelectTrigger className="w-full h-auto shadow-none bg-accent text-gray-700 flex items-center">
    <div className="flex flex-row gap-1" style={{flexWrap:'wrap'}}>
      
      {/* First Selected Item */}
      <div className="flex items-center bg-[#1BC7B7] rounded px-1 py-1 gap-1">
        <p className="m-0" style={{color:'white', fontWeight:'600'}}>Thread</p>
        <X className="hover:bg-[#fefefe56]" color="white" size={13} strokeWidth={2.75}/>
      </div>

      {/* Second Selected Item */}
      <div className="flex items-center bg-red-400 rounded px-1 py-1 gap-1">
        <p className="m-0" style={{color:'white', fontWeight:'600'}}>Tip</p>
        <X className="hover:bg-[#fefefe56]" color="white" size={13} strokeWidth={2.75} />
      </div>
      
    </div>
  </SelectTrigger>
      <SelectContent className="shadow-none bg-accent text-grey">
        <SelectGroup>
          <SelectItem value="tip">
            <div className="bg-red-400 p-1 text-white" style={{ borderRadius: '4px', paddingLeft:'5px', paddingRight:'5px', cursor:'pointer' }}>
              Tip
            </div>
          </SelectItem>
          <SelectItem value="promotion">
            <div className="p-1 text-white" style={{ borderRadius: '4px', backgroundColor: '#FF91B3', paddingLeft:'5px', paddingRight:'5px', cursor:'pointer' }}>
              Promotion
            </div>
          </SelectItem>
          <SelectItem value="thread">
            <div className="p-1 text-white" style={{ borderRadius: '4px', backgroundColor: '#1BC7B7', paddingLeft:'5px', paddingRight:'5px', cursor:'pointer' }}>
              Thread
            </div>
          </SelectItem>
          <SelectItem value="motivation">
            <div className="p-1 text-black" style={{ borderRadius: '4px', backgroundColor: '#FFE13D', paddingLeft:'5px', paddingRight:'5px', cursor:'pointer' }}>
              Motivation
            </div>
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
