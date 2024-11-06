/* eslint-disable @typescript-eslint/no-explicit-any */
import { Check, ChevronsUpDown } from 'lucide-react'
import { FC, ReactNode, useState } from 'react'

import { Button } from '@/components/ui/button'
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList
} from '@/components/ui/command'
import {
	FormControl,
	FormField,
	FormItem,
	FormMessage
} from '@/components/ui/form'
import {
	Popover,
	PopoverContent,
	PopoverTrigger
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'

interface FormComboboxProps {
	items: {
		value: string
		label: string
	}[]
	name: string
	isMessage?: boolean
	isLoading?: boolean
	notFoundMessage?: string
	placeholder?: string
	initalData: string
	form: any
	label?: ReactNode
	control: any
}

const FormCombobox: FC<FormComboboxProps> = ({
	items,
	control,
	name,
	isMessage = true,
	isLoading = false,
	form,
	label,
	notFoundMessage = 'Not Found',
	placeholder = 'Tìm kiếm',
	initalData = 'Data'
}) => {
	const [open, setOpen] = useState<boolean>(false)

	return (
		<FormField
			control={control}
			name={name}
			render={({ field }) => (
				<FormItem className='flex flex-col'>
					{label ?? label}
					<Popover
						open={open}
						onOpenChange={setOpen}
					>
						<PopoverTrigger
							asChild
							disabled={isLoading}
						>
							<FormControl>
								<Button
									variant='outline'
									role='combobox'
									className={cn(
										`w-full justify-between border border-foreground/30 bg-background`,
										!field.value && 'text-muted-foreground'
									)}
								>
									{field.value
										? items.find(item => item.value === field.value)?.label
										: initalData}
									<ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
								</Button>
							</FormControl>
						</PopoverTrigger>
						<PopoverContent
							className='w-[366px] border border-foreground/30 p-0'
							side='bottom'
							align='start'
						>
							<Command>
								<CommandInput placeholder={placeholder} />
								<CommandList>
									<CommandEmpty>{notFoundMessage}</CommandEmpty>
									<CommandGroup className='max-h-[200px] overflow-auto'>
										{items.map(item => (
											<CommandItem
												value={item.label}
												key={item.value}
												onSelect={() => {
													form.setValue(name, item.value)
													setOpen(false)
												}}
												className='cursor-pointer'
											>
												<Check
													className={cn(
														'mr-2 h-4 w-4',
														item.value === field.value
															? 'opacity-100'
															: 'opacity-0'
													)}
												/>
												{item.label}
											</CommandItem>
										))}
									</CommandGroup>
								</CommandList>
							</Command>
						</PopoverContent>
					</Popover>
					{isMessage && <FormMessage />}
				</FormItem>
			)}
		/>
	)
}

export default FormCombobox
