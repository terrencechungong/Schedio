'use client'

import * as React from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ChevronUp, ChevronDown } from 'lucide-react'

export default function NumberInputHours() {
    const [value, setValue] = React.useState('1')

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value
        if (/^\d*$/.test(newValue)) {
            if (newValue === '' || parseInt(newValue) < 1) {
                setValue('1')
            } else {
                setValue(newValue)
            }
        }
    }

    const handleIncrement = () => {
        setValue(prev => (parseInt(prev) + 1).toString())
    }

    const handleDecrement = () => {
        const newValue = parseInt(value) - 1
        if (newValue >= 1) {
            setValue(newValue.toString())
        }
    }

    return (
        <div className="flex items-center">
            <div className="relative">
                <Input
                    type="text"
                    value={value}
                    onChange={handleChange}
                    className="w-20 pr-1 rounded-none focus:ring-0 focus:border-primary focus-visible:ring-0 focus-visible:ring-offset-0"
                    aria-label="Hours input"
                />
                <div className="absolute right-7 top-0 bottom-0 w-px bg-input"></div>
                <div className="absolute border-0 right-0 top-0 bottom-0 w-7 flex flex-col border-y border-r border-input">
                    <button
                        onClick={handleIncrement}
                        className="flex-1 flex items-center border-0 justify-center hover:bg-accent hover:text-accent-foreground"
                        aria-label="Increment hours"
                    >
                        <ChevronUp className="h-4 w-4" />
                    </button>
                    <div className="h-px w-full bg-input"></div>
                    <button
                        onClick={handleDecrement}
                        className="flex-1 flex items-center border-0 justify-center hover:bg-accent hover:text-accent-foreground"
                        aria-label="Decrement hours"
                        disabled={parseInt(value) <= 1}
                    >
                        <ChevronDown className="h-4 w-4" />
                    </button>
                </div>
            </div>
            <Label htmlFor="hours" className="text-sm border-[0.5px] border-lightgreys bg-accent" style={{padding:'7px', borderLeftWidth: '0px', fontWeight:400}}>
                Hours
            </Label>
        </div>
    )
}