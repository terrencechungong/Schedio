import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useState } from "react"
import { ChevronDown } from "lucide-react";

interface DropDownInput {
    setDimensions: React.Dispatch<React.SetStateAction<number>>;
    original: number | null;
}

export const DropdownMenuDemo: React.FC<DropDownInput> = ({ setDimensions, original }) => {
    const [selected, setSelected] = useState("Original");
    const aspectRatios = [
        { dimension: "Original", w: '40px', h: '10px', value: original },
        { dimension: "1:1", w: '17px', h: '17px', value: 1 },
        { dimension: "16:9", w: '28.8px', h: '16.2px', value: 16 / 9 },
        { dimension: "4:1", w: '32px', h: '8px', value: 4 / 1 },
        { dimension: "3:4", w: '24px', h: '19px', value: 3 / 4 },
        { dimension: "4:5", w: '32px', h: '19px', value: 4 / 5 }
    ];

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    style={{ backgroundColor: 'rgb(255,255,255,0.5)', border: 'none' }}
                    className="p-2"
                    variant="outline">{selected} <ChevronDown size={9} /></Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-45" align="start">
                {aspectRatios.map((ratio) => (
                    <DropdownMenuItem
                        style={{ cursor: 'pointer' }}
                        onClick={() => {
                            setSelected(ratio.dimension)
                            setDimensions(ratio.value)
                        }}
                        key={ratio.dimension}>
                        <div style={{ width: '190px', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                            <div>
                                {ratio.dimension}
                            </div>
                            {ratio.dimension != "Original" && <div style={{ backgroundColor: 'rgb(0,0,0,0)', height: ratio.h, width: ratio.w, borderRadius: '4px', border: '2px solid grey' }}>

                            </div>}
                        </div>
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
