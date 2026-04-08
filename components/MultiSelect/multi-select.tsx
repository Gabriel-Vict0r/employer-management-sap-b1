/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useState } from 'react'
import { Check, ChevronsUpDown } from 'lucide-react'
import { ControllerRenderProps } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '@/components/ui/command'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { Label } from '../ui/label'

type Option = {
  label: string
  value: string
}

type MultiSelectProps = {
  field: ControllerRenderProps<any, any>
  options: Option[]
  placeholder?: string
}

export function MultiSelect({
  field,
  options,
  placeholder = 'Selecione...',
}: MultiSelectProps) {
  const [open, setOpen] = useState(false)

  const selectedValues: string[] = field.value || []

  const toggleValue = (value: string) => {
    let newValue: string[] = []

    if (selectedValues.includes(value)) {
      newValue = selectedValues.filter((v) => v !== value)
    } else {
      newValue = [...selectedValues, value]
    }

    field.onChange(newValue)
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <div className='flex flex-col w-full gap-2'>
        <Label className="mb-1">Branches</Label>
      <PopoverTrigger className="flex w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 min-h-[40px] h-auto">
        
        <div className="flex flex-wrap gap-1">
          {selectedValues.length > 0 ? (
            selectedValues.map((value) => {
              const option = options.find((o) => o.value === value)
              return (
                <Badge key={value} variant="secondary">
                  {option?.label}
                </Badge>
              )
            })
          ) : (
            <span className="text-muted-foreground">{placeholder}</span>
          )}
        </div>

        <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />
      </PopoverTrigger>

      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder="Buscar..." />
          <CommandEmpty>Nenhum resultado encontrado.</CommandEmpty>

          <CommandGroup className="max-h-60 overflow-auto">
            {options.map((option) => (
              <CommandItem
                key={option.value}
                onSelect={() => toggleValue(option.value)}
              >
                <Check
                  className={cn(
                    'mr-2 h-4 w-4',
                    selectedValues.includes(option.value)
                      ? 'opacity-100'
                      : 'opacity-0'
                  )}
                />
                {option.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
      </div>
    </Popover>
  )
}