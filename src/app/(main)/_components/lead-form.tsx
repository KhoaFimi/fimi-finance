'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { OctagonAlert } from 'lucide-react'
import Image from 'next/image'
import { FC, PropsWithChildren, useState } from 'react'
import { useForm } from 'react-hook-form'
import { LuBuilding2, LuLoader2, LuMail, LuPhone, LuUser } from 'react-icons/lu'

import { addInfo } from '@/app/(main)/_action/add-info'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from '@/components/ui/form'
import FormCombobox from '@/components/ui/form-combobox'
import { Input } from '@/components/ui/input'
import { cities } from '@/constants/cities.constant'
import { useSercurityPolicyStore } from '@/hooks/use-sercurity-policy-store copy'
import { useTermPolicyStore } from '@/hooks/use-term-policy-store'
import { useUserPolicyStore } from '@/hooks/use-user-policy-store'
import { cn } from '@/lib/utils'
import { InfoSchema, infoSchema } from '@/schemas/info.schema'

interface LeadFormProps {
	publisherCode: string
	productId: string
}

const LeadForm: FC<LeadFormProps> = ({ publisherCode, productId }) => {
	const [error, setError] = useState<undefined | string>(undefined)

	const { onOpen: onOpenSercutiryPolicy } = useSercurityPolicyStore()
	const { onOpen: onOpenTermPolicy } = useTermPolicyStore()
	const { onOpen: opOpenUserPolicy } = useUserPolicyStore()

	const form = useForm<InfoSchema>({
		resolver: zodResolver(infoSchema),
		defaultValues: {
			productId,
			publisherCode,
			fullname: '',
			email: '',
			phone: '',
			city: '',
			tnc: false
		}
	})

	const { mutate, isPending } = useMutation({
		mutationFn: async (values: InfoSchema) => {
			const res = await addInfo(values)

			return res
		},
		onSuccess: data => {
			if (data.status === 'error') {
				setError(error)

				return
			}

			form.reset()
		}
	})

	return (
		<div className='relative flex flex-col gap-4 pb-10 pt-6'>
			<Image
				src='/fill.png'
				alt='fill'
				width={6642}
				height={8802}
				className='absolute right-4 top-5 z-40 w-20'
			/>
			<h3 className='bg-gradient-to-r from-secondary to-accent bg-clip-text text-xl font-bold uppercase leading-none tracking-tight text-transparent'>
				Đăng ký mở thẻ ngay
			</h3>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(values => mutate(values))}
					className='space-y-4'
				>
					<div className='flex flex-col space-y-4 rounded-xl bg-gradient-to-tr from-primary from-30% to-secondary px-2 pb-3 pt-6 shadow-lg'>
						<FormField
							name='fullname'
							control={form.control}
							render={({ field }) => (
								<FormItem>
									<FormLabel className='flex items-end space-x-1 font-semibold tracking-tight text-white'>
										<LuUser
											className='size-5'
											strokeWidth={3}
										/>
										<p>Họ và tên</p>
									</FormLabel>
									<FormControl>
										<Input
											{...field}
											disabled={isPending}
											className='border border-primary bg-background caret-primary focus-visible:outline-none focus-visible:ring-0'
											placeholder='Nguyễn Văn A'
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							name='email'
							control={form.control}
							render={({ field }) => (
								<FormItem>
									<FormLabel className='flex items-end space-x-1 font-semibold tracking-tight text-white'>
										<LuMail
											className='size-5'
											strokeWidth={3}
										/>
										<p>Email</p>
									</FormLabel>
									<FormControl>
										<Input
											{...field}
											disabled={isPending}
											className='border border-primary bg-background caret-primary focus-visible:outline-none focus-visible:ring-0'
											placeholder='a.nguyenvan@gmail.com'
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							name='phone'
							control={form.control}
							render={({ field }) => (
								<FormItem>
									<FormLabel className='flex items-end space-x-1 font-semibold tracking-tight text-white'>
										<LuPhone
											className='size-5'
											strokeWidth={3}
										/>
										<p>Số điện thoại</p>
									</FormLabel>
									<FormControl>
										<Input
											{...field}
											disabled={isPending}
											className='border border-primary bg-background caret-primary focus-visible:outline-none focus-visible:ring-0'
											placeholder='091xxxx900'
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormCombobox
							name='city'
							control={form.control}
							isLoading={isPending}
							form={form}
							initalData='Thành phố'
							items={cities}
							isMessage
							notFoundMessage='Không tìm thấy kết quả'
							label={
								<FormLabel className='flex items-end space-x-1 font-semibold tracking-tight text-white'>
									<LuBuilding2
										className='size-5'
										strokeWidth={3}
									/>
									<p>Khu vực</p>
								</FormLabel>
							}
						/>
					</div>
					<FormField
						name='tnc'
						control={form.control}
						render={({ field }) => (
							<FormItem className='flex flex-row items-start space-x-3 space-y-0 rounded-lg border border-primary p-3 shadow-lg'>
								<FormControl>
									<Checkbox
										checked={field.value}
										disabled={isPending}
										onCheckedChange={field.onChange}
									/>
								</FormControl>
								<div className='space-y-1 leading-none'>
									<FormLabel className='text-xs font-semibold text-foreground/50'>
										Bằng việc chọn &#x201C;Mở thẻ ngay&#x201D;, bạn đã đồng ý
										với
									</FormLabel>
								</div>
							</FormItem>
						)}
					/>

					<div className='flex w-full flex-col items-start gap-1'>
						<PolicyButton onOpen={onOpenSercutiryPolicy}>
							-Thông báo bảo mật của chúng tôi
						</PolicyButton>
						<PolicyButton onOpen={onOpenTermPolicy}>
							-Chính sách bảo vệ dữ liệu cá nhân
						</PolicyButton>
						<PolicyButton onOpen={opOpenUserPolicy}>
							-Điều khoản sử dụng dịch vụ FIMI
						</PolicyButton>
					</div>

					<div
						className={cn(
							'flex w-full items-center gap-2 rounded-lg border border-destructive bg-destructive/15 p-2 text-sm font-semibold text-destructive',
							{
								['hidden']: !error
							}
						)}
					>
						<OctagonAlert className='size-5 text-destructive' />
						<p>{error}</p>
					</div>

					<Button
						type='submit'
						disabled={!form.getFieldState('tnc').isDirty || isPending}
						className='w-full items-center gap-4 bg-gradient-to-tr from-primary from-30% to-secondary font-bold'
					>
						{isPending && <LuLoader2 className='size-5 animate-spin' />}
						Mở thẻ ngay
					</Button>
				</form>
			</Form>
		</div>
	)
}

const PolicyButton: FC<
	PropsWithChildren<{
		onOpen: () => void
	}>
> = ({ children, onOpen }) => {
	return (
		<button
			onClick={e => {
				e.preventDefault()
				onOpen()
			}}
			className='text-xs font-semibold italic text-primary hover:underline'
		>
			{children}
		</button>
	)
}

export default LeadForm
