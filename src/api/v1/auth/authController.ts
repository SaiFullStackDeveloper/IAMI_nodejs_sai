import { handleServiceResponse } from "@/common/utils/httpHandlers";
import type { Request, RequestHandler, Response } from "express";
import { AuthApproveAgentService, AuthForgotService, AuthGetAgentsService, AuthLoginRefreshService, AuthLoginService, AuthResetService, AuthSignUpService, AuthUpdateAdminProfileService, AuthUpdateAgentProfileService, AuthUpdateProfileService, AuthUpdateSuperAdminProfileService, GetAllUsersListService } from "./authService";
import { AuthRegisterEmployeeService } from "./authService";



class AuthController {
    public signUp: RequestHandler = async (req: Request, res: Response) => {
        const serviceResponse = await AuthSignUpService(req.body);
        return handleServiceResponse(serviceResponse, res);
    };
    public login: RequestHandler = async (req: Request, res: Response) => {
        const serviceResponse = await AuthLoginService(req.body);
        return handleServiceResponse(serviceResponse, res);
    };
    public loginRefresh: RequestHandler = async (req: Request, res: Response) => {
        const serviceResponse = await AuthLoginRefreshService(req.body);
        return handleServiceResponse(serviceResponse, res);
    }

    // Forgot password

    public forgot: RequestHandler = async (req: Request, res: Response) => {
        const serviceResponse = await AuthForgotService(req.body);
        return handleServiceResponse(serviceResponse, res);
    };

    public reset: RequestHandler = async (req: Request, res: Response) => {
        const serviceResponse = await AuthResetService(req.body);
        return handleServiceResponse(serviceResponse, res);
    };

    public registerEmployee: RequestHandler = async (req: Request, res: Response) => {
        const response = await AuthRegisterEmployeeService(req.body);
        return handleServiceResponse(response, res);
    };

    // New method to handle the Agent - Customer List API
    // public getAgentCustomerList: RequestHandler = async (req: Request, res: Response) => {
    //     const agentId = req.user.id; // Assuming user info is attached to request
    //     const serviceResponse = await GetAgentCustomerListService(agentId);
    //     return handleServiceResponse(serviceResponse, res);
    // };

    // New method to handle Super Admin - List All Users API
    // New method to handle Super Admin – List All Users API
    public getAllUsersList: RequestHandler = async (req: Request, res: Response) => {
        const { page = 1, limit = 10000 } = req.query;  // Extract page and limit from query params
        const serviceResponse = await GetAllUsersListService(Number(page), Number(limit));
        return handleServiceResponse(serviceResponse, res);
    };

    // Inside AuthController class:
    public getAgents: RequestHandler = async (req: Request, res: Response) => {
        const status = req.query.status as string;
        const response = await AuthGetAgentsService(status);
        return handleServiceResponse(response, res);
    };

    public AuthApproveAgentController: RequestHandler =  async (req: Request, res: Response) => {
        const { email, isUserVerified } = req.body;
    
        if (!email) {
            return res.status(400).json({
                success: false,
                statusCode: 400,
                message: 'Email and isUserVerified (true/false) are required',
                data: null
            });
        }
    
        const response = await AuthApproveAgentService(email, true);
        res.status(response.statusCode).json(response);
    };

    public updateProfile: RequestHandler = async (req, res) => {
        const serviceResponse = await AuthUpdateProfileService(req.body);
        return handleServiceResponse(serviceResponse, res);
    };

    public AuthUpdateAgentProfileController : RequestHandler = async (req: Request, res: Response) => {
        const user = (req as any).user;
        const updatePayload = req.body;
    
        const response = await AuthUpdateAgentProfileService({
            email: updatePayload.email || user.email,
            ...updatePayload
        });
    
        return res.status(response.statusCode).json(response);
    }
    
       // Update Admin Profile
       public updateAdminProfile: RequestHandler = async (req, res) => {
        try {
            const serviceResponse = await AuthUpdateAdminProfileService(req.body);
            return res.status(serviceResponse.statusCode).json(serviceResponse);
        } catch (error : any) {
            return res.status(500).json({ success: false, message: 'Failed to update admin profile', error: error.message });
        }
    };

    public updateSuperAdminProfile: RequestHandler = async (req: Request, res: Response) => {
        // You might want to use a middleware to verify super admin access before processing this request
        const serviceResponse = await AuthUpdateSuperAdminProfileService(req.body);
        return handleServiceResponse(serviceResponse, res);
    };
}




export const authController = new AuthController();

