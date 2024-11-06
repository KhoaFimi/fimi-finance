'use server'

import { formatInTimeZone } from 'date-fns-tz'
import { redirect } from 'next/navigation'

import { cardLink } from '@/constants/link.constant'
import { genOid } from '@/lib/server/gen-id'
import { getSheets } from '@/lib/server/google-sheets'
import { InfoSchema, infoSchema } from '@/schemas/info.schema'

export const addInfo = async (values: InfoSchema) => {
	const validatedData = infoSchema.safeParse(values)

	if (validatedData.error) {
		return {
			status: 'error',
			message: validatedData.error.message.toString()
		}
	}

	const sheets = await getSheets()

	const { publisherCode, productId, fullname, phone, email, city } =
		validatedData.data

	const oid = genOid()

	const timestamp = formatInTimeZone(new Date(), 'Asia/Ho_Chi_Minh', 'LLL d,y')

	await sheets.spreadsheets.values.append({
		spreadsheetId: process.env.SHEET_ID,
		range: process.env.SHEET_1,
		valueInputOption: 'USER_ENTERED',
		requestBody: {
			values: [
				[
					`'${oid}`,
					timestamp,
					publisherCode,
					productId,
					fullname,
					`'${phone}`,
					email,
					city
				]
			]
		}
	})

	redirect(cardLink(oid, productId))
}
