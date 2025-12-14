import { getPayload } from "payload";
import RegisterPage from "./register-page";
import config from '@/payload.config'
import { headers as getHeaders } from 'next/headers'
import { redirect } from "next/navigation";

export const dynamic = 'force-dynamic';

export default async function Page() {

    const payloadConfig = await config
    const payload = await getPayload({ config: payloadConfig })

    const headers = await getHeaders()
    const { user } = await payload.auth({ headers })

    if (user) {
        return redirect("/admin");
    }

    return <RegisterPage />
}