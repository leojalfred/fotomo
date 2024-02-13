import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command'
import { useFormField } from '@/components/ui/form'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { Check, X, ChevronsUpDown } from 'lucide-react'
import * as React from 'react'

export type OptionType = {
  label: string
  value: string
}

interface MultiSelectProps {
  options: OptionType[]
  selected: string[]
  onChange: React.Dispatch<React.SetStateAction<string[]>>
  className?: string
  placeholder?: string
  onSearch?: React.FormEventHandler<HTMLDivElement>
  isUninitiated?: boolean
  label?: string
  ref?: React.Ref<HTMLButtonElement>
}

function MultiSelect({
  options,
  selected,
  onChange,
  className,
  placeholder,
  onSearch,
  isUninitiated,
  label,
  ...props
}: MultiSelectProps) {
  const [open, setOpen] = React.useState(false)
  const { formItemId } = useFormField()
  const handleUnselect = (item: string) => {
    onChange(selected.filter((i) => i !== item))
  }
  const commandGroupClasses = cn('max-h-64 overflow-auto', {
    hidden: isUninitiated,
  })

  return (
    <Popover open={open} onOpenChange={setOpen} {...props}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={`w-full justify-between px-3 active:translate-y-0 ${selected.length > 1 ? 'h-full' : 'h-10'}`}
          onClick={() => setOpen(!open)}
          id={formItemId}
          aria-label={label}
        >
          <div className="flex flex-wrap gap-1">
            {selected.length === 0 && placeholder && (
              <span className="font-normal text-muted-foreground">
                {placeholder}
              </span>
            )}
            {selected.map((item) => (
              <Badge
                variant="secondary"
                key={item}
                onClick={() => handleUnselect(item)}
              >
                {item}
                <a
                  className="ml-1 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleUnselect(item)
                    }
                  }}
                  onMouseDown={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                  }}
                  onClick={() => handleUnselect(item)}
                >
                  <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                </a>
              </Badge>
            ))}
          </div>
          <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0" onChange={onSearch}>
        <Command className={className} shouldFilter={!onSearch}>
          <CommandInput
            placeholder="Search ..."
            isUninitiated={isUninitiated}
          />
          <CommandEmpty>No item found.</CommandEmpty>
          <CommandGroup className={commandGroupClasses}>
            {options.map((option) => (
              <CommandItem
                key={option.value}
                onSelect={() => {
                  onChange(
                    selected.includes(option.value) ?
                      selected.filter((item) => item !== option.value)
                    : [...selected, option.value],
                  )
                  setOpen(true)
                }}
              >
                <Check
                  className={cn(
                    'mr-2 h-4 w-4',
                    selected.includes(option.value) ? 'opacity-100' : (
                      'opacity-0'
                    ),
                  )}
                />
                {option.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

export { MultiSelect }
