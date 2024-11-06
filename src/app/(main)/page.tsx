import LeadForm from '@/app/(main)/_components/lead-form'
import Policies from '@/app/(main)/_components/policies'

type SearchParams = Promise<{ product: string; code: string }>

const MainPage = async ({ searchParams }: { searchParams: SearchParams }) => {
	const { product, code } = await searchParams

	return (
		<>
			<div className='mt-14 px-2'>
				<LeadForm
					productId={product}
					publisherCode={code}
				/>
			</div>
			<Policies />
		</>
	)
}

export default MainPage
