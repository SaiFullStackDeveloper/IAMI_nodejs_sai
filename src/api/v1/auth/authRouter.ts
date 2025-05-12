import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import express, { type Router } from "express";
import { createApiResponse } from "@/api-docs/openAPIResponseBuilders";
import { validateRequest } from "@/common/utils/httpHandlers";
import { authController } from "./authController";
import { LoginRefreshSchema, LoginSchema, SignUpSchema, ForgotSchema, ResetSchema } from "./authModel";


export const authRegistry = new OpenAPIRegistry();
export const authRouter: Router = express.Router();

import { EmployeeRegistrationSchema } from "./authModel";
import { AuthMiddleware, isAdminOrAgent, isAdminOrSuperAdmin, isAgent, isSuperAdmin } from "@/common/middleware/authHandler"; // you'll define this

// POST /v1/auth/signup

authRegistry.register("Signup", SignUpSchema.shape.body);

authRegistry.registerPath({
    method: "post",
    path: "/v1/auth/signup",
    tags: ["Auth"],
    responses: createApiResponse(SignUpSchema, "Success"),
    request: {
        body: {
            content: {
                "application/json": {
                    schema: SignUpSchema.shape.body,
                }
            }
        }
    }
});

authRouter.post('/signup', validateRequest(SignUpSchema), authController.signUp)


// POST /v1/auth/login

authRegistry.register("Login", LoginSchema.shape.body);

authRegistry.registerPath({
    method: "post",
    path: "/v1/auth/login",
    tags: ["Auth"],
    responses: createApiResponse(LoginSchema, "Success"),
    request: {
        body: {
            content: {
                "application/json": {
                    schema: LoginSchema.shape.body,
                }
            }
        }
    }
});

authRouter.post('/login', validateRequest(LoginSchema), authController.login)


// POST /v1/auth/login/refresh

authRegistry.register("Login Refresh", LoginRefreshSchema.shape.body);

authRegistry.registerPath({
    method: "post",
    path: "/v1/auth/login/refresh",
    tags: ["Auth"],
    responses: createApiResponse(LoginRefreshSchema, "Success"),
    request: {
        body: {
            content: {
                "application/json": {
                    schema: LoginRefreshSchema.shape.body,
                }
            }
        }
    }
});

authRouter.post('/login/refresh', validateRequest(LoginRefreshSchema), authController.loginRefresh)

// POST /v1/auth/forgot

authRouter.post('/forgot', validateRequest(ForgotSchema), authController.forgot)

// POST /v1/auth/forgot/verify

authRouter.post('/forgot/reset', validateRequest(ResetSchema), authController.reset)


authRouter.post("/register-employee", isSuperAdmin, authController.registerEmployee );

// GET: Agent – Customer List API
// authRouter.get("/v1/agent/customers", isAgent, authController.getAgentCustomerList);

authRouter.get("/superadmin/users", isSuperAdmin, authController.getAllUsersList);

// localhost:3000/api/v1/auth/agents/list-all-users?status=all
authRouter.get('/agents/list-all-agents', isSuperAdmin, authController.getAgents);



authRouter.put('/approve-agent', isSuperAdmin, authController.AuthApproveAgentController);

authRouter.put('/update-profile-users',  isAdminOrSuperAdmin, authController.updateProfile);

authRouter.put('/agent/update-agent-profile', isAdminOrAgent, authController.AuthUpdateAgentProfileController)

authRouter.put("/update-admin-profile", isAdminOrSuperAdmin, authController.updateAdminProfile);

authRouter.put('/superadmin/update-profile', isSuperAdmin, authController.updateSuperAdminProfile);


