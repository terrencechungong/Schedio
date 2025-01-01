
import * as React from "react"
import { ChevronDown } from "lucide-react"

import { X } from "lucide-react"
import { PlatformColor, PlatformIcons, PlatformName } from "../layout";

export interface CategoryItem {
  id: number;
  value: string;
  label: string;
  bgColor: string;
  textColor: string;
}

export enum InputType {
  STATUS = "status",
  SOCIALS = "socials",
  LABELS = "labels"
}

interface CategorizeInput {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  FOR_TESTING_REMEMBER_TO_DEPRECATE?: boolean;
  itemType?: InputType;
  className?: string;
}
// refactor this

export function CategorizeDropdown({ isOpen, setIsOpen, FOR_TESTING_REMEMBER_TO_DEPRECATE, itemType, className }: CategorizeInput) {
  const labelsItems: CategoryItem[] = [
    { id: 0, value: "tip", label: "Tip", bgColor: "#FF0000", textColor: "white" },
    { id: 1, value: "promotion", label: "Promotion", bgColor: "#FF91B3", textColor: "white" },
    { id: 2, value: "thread", label: "Thread", bgColor: "#1BC7B7", textColor: "white" },
    { id: 3, value: "motivation", label: "Motivation", bgColor: "#FFE13D", textColor: "black" },
  ]

  const statusItems: CategoryItem[] = [
    { id: 0, value: "tip", label: "Scheduled", bgColor: "#E9D5FF", textColor: "#7C3AED" },
    { id: 1, value: "promotion", label: "Awaiting Approval", bgColor: "#ffeca2", textColor: "#c58f07" },
    { id: 2, value: "thread", label: "Draft", bgColor: "#D3D3D3", textColor: "#696969" },
  ]

  const socialItems: CategoryItem[] = [
    { id: 0, value: "FB account", label: "FB account", bgColor: "white", textColor: "black", platform: PlatformName.Facebook },
    { id: 1, value: "Terrencechungong", label: "Terrencechungong", bgColor: "white", textColor: "black", platform: PlatformName.TikTok },
    { id: 2, value: "terrence_chefor", label: "terrence_chefor", bgColor: "white", textColor: "black", platform: PlatformName.Instagram },
    { id: 3, value: "terrence.c1", label: "terrence.c1", bgColor: "white", textColor: "black", platform: PlatformName.Pinterest },

  ]

  const [selectedItems, setSelectedItems] = React.useState<CategoryItem[]>(FOR_TESTING_REMEMBER_TO_DEPRECATE ? (
    (!itemType || itemType == InputType.LABELS) ? labelsItems : (itemType == InputType.SOCIALS ? [socialItems[0]] : [statusItems[0]])
  ) : []);

  const toggleStatusItem = (item: CategoryItem) => {
    if (selectedItems.some((selected) => selected.id === item.id)) {
      return;
    } else {
      setSelectedItems([item])
    }
  }

  const toggleItem = (item: CategoryItem) => {
    if (selectedItems.some((selected) => selected.id === item.id)) {
      setSelectedItems(selectedItems.filter((selected) => selected.id !== item.id))
    } else {
      setSelectedItems([...selectedItems, item])
    }
  }


  const PlatformIcon = ({ platform }: { platform: PlatformName }) => {
    const Icon = PlatformIcons[platform];
    return <Icon color={PlatformColor[platform]} size={16} />;
  };

  // add w-full ???

  return (
    <div className={`relative ${className}`}>
      <div className={`w-full cursor-pointer ${selectedItems.length > 1 ? "h-auto" : "h-9"} bg-gray-200 border-[0px] shadow-none bg-accent text-gray-700 flex items-center p-2 border border-gray-300 rounded-md`} onClick={(e) => {
        e.stopPropagation()
        setIsOpen(!isOpen)
      }}>
        <div className="flex flex-row gap-1 flex-wrap text-sm text-black">
          {selectedItems.length > 0 ? selectedItems.map((object) => (
            <div
              key={object.id}
              onClick={(e) => {
                e.stopPropagation()
                if (itemType == InputType.STATUS) {
                  toggleStatusItem(object);
                  return
                }
                toggleItem(object)
              }}
              className={`flex items-center ${(itemType == InputType.STATUS) ? 'rounded-[14px]' : 'rounded'} gap-1`}
              style={{ backgroundColor: object.bgColor, cursor: "pointer", padding: (itemType == InputType.STATUS)? "4px 6px 4px" : "4px" }}
            >
              {(itemType == InputType.STATUS) && <div className="m-0"
                style={{ color: object.textColor, fontWeight: "600", fontSize: '13px', display: 'flex', flexDirection: 'row', gap: '6px', alignItems: 'center' }}>
                <div className={`rounded-full h-2 w-2`} style={{ backgroundColor: object.textColor }}></div>
                <span>{object.label}</span>
              </div>}
              {(itemType == InputType.SOCIALS) && <div className="m-0"
                style={{ color: object.textColor, fontWeight: "600", fontSize: '13px', display: 'flex', flexDirection: 'row', gap: '4px', alignItems: 'center' }}>
                <PlatformIcon platform={object.platform} />

                <span>{object.label}</span>
              </div>}
              {(!itemType || itemType == InputType.LABELS) && <p className="m-0" style={{ color: object.textColor, fontWeight: "600", fontSize: '13px' }}>
                {object.label}
              </p>}
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
          <span>{isOpen ? <ChevronDown className="h-4 w-4 text-black opacity-50" /> : <ChevronDown className="h-4 w-4 text-black opacity-50" />}</span>
        </div>
      </div>
      {isOpen && (
        <div className="absolute z-10 mt-1 w-full shadow-lg bg-gray-200 border-[0px] rounded">
          <div className="py-1 max-h-60 overflow-auto">

            {(itemType == InputType.STATUS) && statusItems.filter(item => !selectedItems.some(selected => selected.id === item.id)).map((item) => (
              <div
                key={item.id}
                onClick={(e) => {
                  e.stopPropagation()
                  toggleStatusItem(item)
                }}
                className="flex items-center bg-gray-200 p-1 cursor-pointer hover:bg-gray-300"

              >
                <div
                  style={{
                    fontSize: '13px',
                    fontWeight: '600',
                    backgroundColor: item.bgColor,
                    color: item.textColor,
                    borderRadius: "18px",
                    padding: "4px 6px 4px",
                    display: 'flex',
                    flexDirection: 'row',
                    gap: '6px',
                    alignItems: 'center'
                  }}
                >
                  <div className={`rounded-full h-2 w-2`} style={{backgroundColor:item.textColor}}></div>
                  <span>{item.label}</span>
                </div>
              </div>
            ))}


            {(itemType == InputType.SOCIALS) && socialItems.filter(item => !selectedItems.some(selected => selected.id === item.id)).map((item) => (
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
                    display: 'flex',
                    flexDirection: 'row',
                    gap: '4px',
                    alignItems: 'center'
                  }}
                >
                  <PlatformIcon platform={item.platform} />
                  <span>{item.label}</span>
                </div>
              </div>
            ))}

            {(!itemType || itemType == InputType.LABELS) && labelsItems.filter(item => !selectedItems.some(selected => selected.id === item.id)).map((item) => (
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
