import Queue from "bull";
import { env } from "./env";
import { forgotEmail, signupEmail } from "./email";

const { REDIS_URI, BACKEND_DOMAIN, FRONTEND_DOMAIN } = env
export const emailQueue = new Queue(
    'email',
    {
        redis: REDIS_URI,
    }
)

emailQueue.process((job, done) => {

    const { type, email, name, token } = job.data

    if (type === 'Signup') {
        console.log("✅Quee calledd.. email quiue 😊😊");
        signupEmail(email, name, `${BACKEND_DOMAIN}/auth/verification/${token}/${email}`)
    }

    if (type === 'Forgot') {
        forgotEmail(email, name, `${FRONTEND_DOMAIN}/auth/forgot?code=${token}&email=${email}`)
    }

    done()
})