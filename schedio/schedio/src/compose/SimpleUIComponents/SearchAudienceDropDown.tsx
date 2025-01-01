
import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

const audiences = [
    { value: "retail_shoppers", name: "Retail Shoppers" },
    { value: "marketers", name: "Marketers" },
    { value: "students", name: "Students" },
    { value: "saas_founders", name: "SaaS Founders" },
    { value: "small_business_owners", name: "Small Business Owners" },
    { value: "health_and_fitness_enthusiasts", name: "Health and Fitness Enthusiasts" },
    { value: "tech_enthusiasts", name: "Tech Enthusiasts" },
    { value: "entrepreneurs", name: "Entrepreneurs" },
    { value: "educators", name: "Educators" },
    { value: "real_estate_agents", name: "Real Estate Agents" },
    { value: "content_creators", name: "Content Creators" },
    { value: "startup_investors", name: "Startup Investors" },
    { value: "freelancers", name: "Freelancers" },
    { value: "non_profit_organizations", name: "Non-Profit Organizations" },
    { value: "travel_enthusiasts", name: "Travel Enthusiasts" }
  ];


 interface SearchAudienceDropDownInput {
    value: string;
    setValue: React.Dispatch<React.SetStateAction<string>>
 } 

export const SearchAudienceDropDown: React.FC<SearchAudienceDropDownInput> = ({value, setValue}) => {
    const [open, setOpen] = React.useState(false)
    const [typedValue, setTypedValue] = React.useState("");

    const handleValueChange = (value: string) => (setTypedValue(value))


    // the font weight here is bolder than the othre
    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild >
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    style={{ boxShadow: 'none' }}
                    className="w-[135px] justify-between hover:bg-transparent h-[30px] rounded-[0px] p-2 shadow-none border-t-0 border-l-0 border-r-0"
                >
                    {value
                        ? audiences.find((audience) => audience.value === value)?.name
                        : "Audience"}
                    <ChevronsUpDown className="opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent style={{ boxShadow: 'none' }} className="w-[190px] p-0 shadow-none">
                <Command>
                    <CommandInput placeholder="Search Audiencess" className="h-9" onValueChange={handleValueChange} />
                    <CommandList>
                        <CommandEmpty>{typedValue}</CommandEmpty>
                        <CommandGroup>
                            {audiences.map((audience) => (
                                <CommandItem
                                    key={audience.value}
                                    value={audience.value}
                                    onSelect={(currentValue) => {
                                        setValue(currentValue === value ? "" : currentValue)
                                        setOpen(false)
                                    }}
                                >
                                    {audience.name}
                                    <Check
                                        className={cn(
                                            "ml-auto",
                                            value === audience.value ? "opacity-100" : "opacity-0"
                                        )}
                                    />
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}