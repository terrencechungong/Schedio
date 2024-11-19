"use client"
import * as React from "react"
import { ChevronDown } from "lucide-react"

import { X } from "lucide-react"

interface CategoryItem {
  id: number;
  value: string;
  label: string;
  bgColor: string;
  textColor: string;
}

interface CategorizeInput {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export function CategorizeDropdown({isOpen, setIsOpen}: CategorizeInput) {
  const allItems: CategoryItem[] = [
    { id: 0, value: "tip", label: "Tip", bgColor: "#FF0000", textColor: "white" },
    { id: 1, value: "promotion", label: "Promotion", bgColor: "#FF91B3", textColor: "white" },
    { id: 2, value: "thread", label: "Thread", bgColor: "#1BC7B7", textColor: "white" },
    { id: 3, value: "motivation", label: "Motivation", bgColor: "#FFE13D", textColor: "black" },
  ]

  const [selectedItems, setSelectedItems] = React.useState<CategoryItem[]>([])

  const toggleItem = (item: CategoryItem) => {
    if (selectedItems.some((selected) => selected.id === item.id)) {
      setSelectedItems(selectedItems.filter((selected) => selected.id !== item.id))
    } else {
      setSelectedItems([...selectedItems, item])
    }
  }

  return (
    <div className="relative">
      <div className={`w-full cursor-pointer ${selectedItems.length > 1 ? "h-auto": "h-9"} bg-gray-200 border-[0px] shadow-none bg-accent text-gray-700 flex items-center p-2 border border-gray-300 rounded-md`} onClick={(e) => {
        e.stopPropagation()
        setIsOpen(!isOpen)
      }}>
        <div className="flex flex-row gap-1 flex-wrap text-sm text-black">
          {selectedItems.length > 0 ? selectedItems.map((object) => (
            <div
              key={object.id}
              onClick={(e) => {
                e.stopPropagation()
                toggleItem(object)
              }}
              className="flex items-center rounded gap-1"
              style={{ backgroundColor: object.bgColor, cursor: "pointer", padding: "4px" }}
            >
              <p className="m-0" style={{ color: object.textColor, fontWeight: "600",  fontSize: '13px'}}>
                {object.label}
              </p>
              <X
                className="hover:bg-[#fefefe56]"
                color={object.textColor}
                size={13}
                strokeWidth={2.75}
              />
            </div>
          )) : "Add labels"}
        </div>
        <div className="ml-auto">
          <span>{isOpen ? <ChevronDown className="h-4 w-4 text-black opacity-50" /> :<ChevronDown className="h-4 w-4 text-black opacity-50" />}</span>
        </div>
      </div>
      {isOpen && (
        <div className="absolute z-10 mt-1 w-full shadow-lg bg-gray-200 border-[0px] rounded">
          <div className="py-1 max-h-60 overflow-auto">
            {allItems.filter(item => !selectedItems.some(selected => selected.id === item.id)).map((item) => (
              <div
                key={item.id}
                onClick={(e) => {
                  e.stopPropagation()
                  toggleItem(item)
                }}
                className="flex items-center bg-gray-200 p-1 cursor-pointer hover:bg-gray-300"
               
              >
                <div
                  // className="w-full"
                  style={{
                    fontSize: '13px',
                    fontWeight: '600',
                    backgroundColor: item.bgColor,
                    color: item.textColor,
                    borderRadius: "4px",
                    padding: "4px",
                  }}
                >
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
