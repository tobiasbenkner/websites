// https://payloadcms.com/docs/database/transactions

import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@/payload.config'

export async function POST(req: NextRequest) {
  const body = await req.json()

  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const transactionID = await payload.db.beginTransaction({})
  if (!transactionID) {
    return NextResponse.json({ error: 'cannot start transaction' }, { status: 400 })
  }

  try {
    const id = new Date().toISOString()
    const tenant = await payload.create({
      collection: 'tenants',
      data: {
        name: body.tenant,
        slug: 'neuer-tenant-' + id,
        allowPublicRead: true,
      },
      req: { transactionID },
    })

    const user = await payload.create({
      collection: 'users',
      data: {
        email: body.email,
        password: body.password,
        roles: ['user'],
        tenants: [
          {
            tenant: tenant.id,
            roles: ['tenant-admin'],
          },
        ],
      },
      req: { transactionID },
    })

    return NextResponse.json({ user, tenant })
  } catch (err: any) {
    console.error(err)
    await payload.db.rollbackTransaction(transactionID)
    return NextResponse.json({ error: err.message }, { status: 400 })
  }
}
