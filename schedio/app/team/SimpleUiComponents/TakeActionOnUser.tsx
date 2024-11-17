"use client"

import * as React from "react"

import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Ellipsis, UserMinus } from "lucide-react"


export function TakeActionOnUser() {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Ellipsis
                    style={{ cursor: 'pointer' }}
                />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-40">
                <DropdownMenuLabel>Quick Actions</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuCheckboxItem
                    className="w-full !p-0"
                >
                    <div 
                    className="hover:bg-red-100 text-red-500 hover:text-red-500"
                    style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width:'100%', padding:'2px', gap:'12px', borderRadius:'4px'}}>
                        <UserMinus />
                        Remove User
                    </div>
                </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
