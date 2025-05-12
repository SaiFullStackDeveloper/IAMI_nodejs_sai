import express, { type Request, type Response, type Router } from "express";
import { userSignupRedisRepository } from "@/common/models/redis/user";
import { env } from "@/common/config/env";
import { createUser } from "@/common/models/mongoDB/user";
import { UserSignupTypes } from "@/common/types/user";
import { emailHtml } from "@/common/config/email";
import { redis } from "@/common/config/redis";
import { ServiceResponse } from "@/common/models/serviceResponse";
import { StatusCodes } from "http-status-codes";

export const signupVerificationRouter: Router = express.Router();


signupVerificationRouter.get("/:token/:email", async (req: Request, res: Response) => {

    const { FRONTEND_DOMAIN } = env
    const { email, token } = req.params;
    const signupKey = `Signup:${email}`;
    const userExist = await redis.get(signupKey);
    
    if(userExist) {
        const isUserExist = JSON.parse(userExist); 

    if (isUserExist.email !== email || isUserExist.token !== token) {
        return res.redirect(`${FRONTEND_DOMAIN}/auth/login`);
    }

    await createUser({
        email: isUserExist.email,
        name: isUserExist.name,
        phone: isUserExist.phone,
        role: isUserExist.role,
        address: isUserExist.address,
        ABN: isUserExist.ABN,
        isEmailVerified: true,
        password: isUserExist.password,
        isUserVerified: isUserExist.role === 'Agent' ? false : true,
    })

    await userSignupRedisRepository.remove(email);
    await redis.del(`Stats:Users:${isUserExist.role}`);

    }
    else {
        return res.status(502).send("Please, try again signup, Token is expired"); // ✅ Return to avoid further execution

    }

    const data = emailHtml('auth/signup/verification-complete.hbs', {
        link: FRONTEND_DOMAIN
    })

    res.send(data)

});
