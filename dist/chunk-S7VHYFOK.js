"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; } function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; } var _class; var _class2; var _class3; var _class4; var _class5; var _class6;













var _chunkJI2CNXVDjs = require('./chunk-JI2CNXVD.js');


var _chunkSZZ53PIMjs = require('./chunk-SZZ53PIM.js');








var _chunkL6X3WCB6js = require('./chunk-L6X3WCB6.js');


var _chunkMVSBMO72js = require('./chunk-MVSBMO72.js');



var _chunk2QMC77YJjs = require('./chunk-2QMC77YJ.js');


var _chunk3FHKKDEGjs = require('./chunk-3FHKKDEG.js');


var _chunkXRNJ7TQOjs = require('./chunk-XRNJ7TQO.js');





var _chunkH52BNYS6js = require('./chunk-H52BNYS6.js');


var _chunkDDBUW572js = require('./chunk-DDBUW572.js');


var _chunkRHY4WX2Ajs = require('./chunk-RHY4WX2A.js');


var _chunkPQNQEBHSjs = require('./chunk-PQNQEBHS.js');


var _chunkRKO6BLKOjs = require('./chunk-RKO6BLKO.js');





var _chunkCHP2GYIBjs = require('./chunk-CHP2GYIB.js');




var _chunkMMEWGB5Ajs = require('./chunk-MMEWGB5A.js');

















var _chunk4QGOQSDIjs = require('./chunk-4QGOQSDI.js');


var _chunkX5VRHMWCjs = require('./chunk-X5VRHMWC.js');


var _chunkNX24CH72js = require('./chunk-NX24CH72.js');











var _chunkXSUWL2FGjs = require('./chunk-XSUWL2FG.js');



var _chunkQIPQVNW5js = require('./chunk-QIPQVNW5.js');



var _chunkE5IYCE7Tjs = require('./chunk-E5IYCE7T.js');


var _chunkXP7MPBWLjs = require('./chunk-XP7MPBWL.js');


var _chunkGDC63SRXjs = require('./chunk-GDC63SRX.js');


var _chunkSBKGAB2Fjs = require('./chunk-SBKGAB2F.js');


var _chunkYCOP6BXVjs = require('./chunk-YCOP6BXV.js');









var _chunkJDA4FSDTjs = require('./chunk-JDA4FSDT.js');


var _chunkVXTEHXEPjs = require('./chunk-VXTEHXEP.js');


var _chunkU3Q25YHWjs = require('./chunk-U3Q25YHW.js');

// src/server.ts
var _cors = require('cors'); var _cors2 = _interopRequireDefault(_cors);
var _express = require('express'); var _express2 = _interopRequireDefault(_express);
var _helmet = require('helmet'); var _helmet2 = _interopRequireDefault(_helmet);
var _pino = require('pino');

// src/api-docs/openAPIRouter.ts

var _swaggeruiexpress = require('swagger-ui-express'); var _swaggeruiexpress2 = _interopRequireDefault(_swaggeruiexpress);

// src/api-docs/openAPIDocumentGenerator.ts
var _zodtoopenapi = require('@asteasolutions/zod-to-openapi');

// src/api/v1/v1Router.ts


// src/api/v1/auth/authRouter.ts



// src/api/v1/auth/authController.ts
var AuthController = (_class = class {constructor() { _class.prototype.__init.call(this);_class.prototype.__init2.call(this);_class.prototype.__init3.call(this);_class.prototype.__init4.call(this);_class.prototype.__init5.call(this);_class.prototype.__init6.call(this);_class.prototype.__init7.call(this);_class.prototype.__init8.call(this);_class.prototype.__init9.call(this);_class.prototype.__init10.call(this);_class.prototype.__init11.call(this);_class.prototype.__init12.call(this);_class.prototype.__init13.call(this); }
  __init() {this.signUp = async (req, res) => {
    const serviceResponse = await AuthSignUpService(req.body);
    return _chunkE5IYCE7Tjs.handleServiceResponse.call(void 0, serviceResponse, res);
  }}
  __init2() {this.login = async (req, res) => {
    const serviceResponse = await AuthLoginService(req.body);
    return _chunkE5IYCE7Tjs.handleServiceResponse.call(void 0, serviceResponse, res);
  }}
  __init3() {this.loginRefresh = async (req, res) => {
    const serviceResponse = await AuthLoginRefreshService(req.body);
    return _chunkE5IYCE7Tjs.handleServiceResponse.call(void 0, serviceResponse, res);
  }}
  // Forgot password
  __init4() {this.forgot = async (req, res) => {
    const serviceResponse = await AuthForgotService(req.body);
    return _chunkE5IYCE7Tjs.handleServiceResponse.call(void 0, serviceResponse, res);
  }}
  __init5() {this.reset = async (req, res) => {
    const serviceResponse = await AuthResetService(req.body);
    return _chunkE5IYCE7Tjs.handleServiceResponse.call(void 0, serviceResponse, res);
  }}
  __init6() {this.registerEmployee = async (req, res) => {
    const response = await AuthRegisterEmployeeService(req.body);
    return _chunkE5IYCE7Tjs.handleServiceResponse.call(void 0, response, res);
  }}
  // New method to handle the Agent - Customer List API
  // public getAgentCustomerList: RequestHandler = async (req: Request, res: Response) => {
  //     const agentId = req.user.id; // Assuming user info is attached to request
  //     const serviceResponse = await GetAgentCustomerListService(agentId);
  //     return handleServiceResponse(serviceResponse, res);
  // };
  // New method to handle Super Admin - List All Users API
  // New method to handle Super Admin – List All Users API
  __init7() {this.getAllUsersList = async (req, res) => {
    const { page = 1, limit = 1e4 } = req.query;
    const serviceResponse = await GetAllUsersListService(Number(page), Number(limit));
    return _chunkE5IYCE7Tjs.handleServiceResponse.call(void 0, serviceResponse, res);
  }}
  // Inside AuthController class:
  __init8() {this.getAgents = async (req, res) => {
    const status = req.query.status;
    const response = await AuthGetAgentsService(status);
    return _chunkE5IYCE7Tjs.handleServiceResponse.call(void 0, response, res);
  }}
  __init9() {this.AuthApproveAgentController = async (req, res) => {
    const { email, isUserVerified } = req.body;
    if (!email) {
      return res.status(400).json({
        success: false,
        statusCode: 400,
        message: "Email and isUserVerified (true/false) are required",
        data: null
      });
    }
    const response = await AuthApproveAgentService(email, true);
    res.status(response.statusCode).json(response);
  }}
  __init10() {this.updateProfile = async (req, res) => {
    const serviceResponse = await AuthUpdateProfileService(req.body);
    return _chunkE5IYCE7Tjs.handleServiceResponse.call(void 0, serviceResponse, res);
  }}
  __init11() {this.AuthUpdateAgentProfileController = async (req, res) => {
    const user = req.user;
    const updatePayload = req.body;
    const response = await AuthUpdateAgentProfileService({
      email: updatePayload.email || user.email,
      ...updatePayload
    });
    return res.status(response.statusCode).json(response);
  }}
  // Update Admin Profile
  __init12() {this.updateAdminProfile = async (req, res) => {
    try {
      const serviceResponse = await AuthUpdateAdminProfileService(req.body);
      return res.status(serviceResponse.statusCode).json(serviceResponse);
    } catch (error) {
      return res.status(500).json({ success: false, message: "Failed to update admin profile", error: error.message });
    }
  }}
  __init13() {this.updateSuperAdminProfile = async (req, res) => {
    const serviceResponse = await AuthUpdateSuperAdminProfileService(req.body);
    return _chunkE5IYCE7Tjs.handleServiceResponse.call(void 0, serviceResponse, res);
  }}
}, _class);
var authController = new AuthController();

// src/api/v1/auth/authRouter.ts
var authRegistry = new (0, _zodtoopenapi.OpenAPIRegistry)();
var authRouter = _express2.default.Router();
authRegistry.register("Signup", _chunkXSUWL2FGjs.SignUpSchema.shape.body);
authRegistry.registerPath({
  method: "post",
  path: "/v1/auth/signup",
  tags: ["Auth"],
  responses: _chunkXP7MPBWLjs.createApiResponse.call(void 0, _chunkXSUWL2FGjs.SignUpSchema, "Success"),
  request: {
    body: {
      content: {
        "application/json": {
          schema: _chunkXSUWL2FGjs.SignUpSchema.shape.body
        }
      }
    }
  }
});
authRouter.post("/signup", _chunkE5IYCE7Tjs.validateRequest.call(void 0, _chunkXSUWL2FGjs.SignUpSchema), authController.signUp);
authRegistry.register("Login", _chunkXSUWL2FGjs.LoginSchema.shape.body);
authRegistry.registerPath({
  method: "post",
  path: "/v1/auth/login",
  tags: ["Auth"],
  responses: _chunkXP7MPBWLjs.createApiResponse.call(void 0, _chunkXSUWL2FGjs.LoginSchema, "Success"),
  request: {
    body: {
      content: {
        "application/json": {
          schema: _chunkXSUWL2FGjs.LoginSchema.shape.body
        }
      }
    }
  }
});
authRouter.post("/login", _chunkE5IYCE7Tjs.validateRequest.call(void 0, _chunkXSUWL2FGjs.LoginSchema), authController.login);
authRegistry.register("Login Refresh", _chunkXSUWL2FGjs.LoginRefreshSchema.shape.body);
authRegistry.registerPath({
  method: "post",
  path: "/v1/auth/login/refresh",
  tags: ["Auth"],
  responses: _chunkXP7MPBWLjs.createApiResponse.call(void 0, _chunkXSUWL2FGjs.LoginRefreshSchema, "Success"),
  request: {
    body: {
      content: {
        "application/json": {
          schema: _chunkXSUWL2FGjs.LoginRefreshSchema.shape.body
        }
      }
    }
  }
});
authRouter.post("/login/refresh", _chunkE5IYCE7Tjs.validateRequest.call(void 0, _chunkXSUWL2FGjs.LoginRefreshSchema), authController.loginRefresh);
authRouter.post("/forgot", _chunkE5IYCE7Tjs.validateRequest.call(void 0, _chunkXSUWL2FGjs.ForgotSchema), authController.forgot);
authRouter.post("/forgot/reset", _chunkE5IYCE7Tjs.validateRequest.call(void 0, _chunkXSUWL2FGjs.ResetSchema), authController.reset);
authRouter.post("/register-employee", _chunkH52BNYS6js.isSuperAdmin, authController.registerEmployee);
authRouter.get("/superadmin/users", _chunkH52BNYS6js.isSuperAdmin, authController.getAllUsersList);
authRouter.get("/agents/list-all-agents", _chunkH52BNYS6js.isSuperAdmin, authController.getAgents);
authRouter.put("/approve-agent", _chunkH52BNYS6js.isSuperAdmin, authController.AuthApproveAgentController);
authRouter.put("/update-profile-users", _chunkH52BNYS6js.isAdminOrSuperAdmin, authController.updateProfile);
authRouter.put("/agent/update-agent-profile", _chunkH52BNYS6js.isAdminOrAgent, authController.AuthUpdateAgentProfileController);
authRouter.put("/update-admin-profile", _chunkH52BNYS6js.isAdminOrSuperAdmin, authController.updateAdminProfile);
authRouter.put("/superadmin/update-profile", _chunkH52BNYS6js.isSuperAdmin, authController.updateSuperAdminProfile);

// src/api/v1/forms/formsRouter.ts


// src/api/v1/forms/insurance/insuranceRouter.ts



// src/api/v1/forms/insurance/insuranceService.ts
var _httpstatuscodes = require('http-status-codes');

// src/common/api/chainhat.ts
var _axios = require('axios'); var _axios2 = _interopRequireDefault(_axios);
var {
  AUSTRALIA_EAST_CHAINTHAT,
  AUSTRALIA_EAST_CHAINTHAT_CLIENT_ID,
  AUSTRALIA_EAST_CHAINTHAT_CLIENT_SECRET,
  AUSTRALIA_EAST_CHAINTHAT_EBAO_TENANT_ID,
  AUSTRALIA_EAST_CHAINTHAT_EBAO_TENANT_CODE
} = _chunkU3Q25YHWjs.env;
async function GetChainHatToken() {
  try {
    const res = await _axios2.default.call(void 0, {
      method: "POST",
      url: `${AUSTRALIA_EAST_CHAINTHAT}/auth/realms/onepatch/protocol/openid-connect/token`,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "X-ebao-tenant-Id": AUSTRALIA_EAST_CHAINTHAT_EBAO_TENANT_ID,
        "X-ebao-tenant-code": AUSTRALIA_EAST_CHAINTHAT_EBAO_TENANT_CODE
      },
      data: new URLSearchParams({
        "grant_type": "client_credentials",
        "client_id": AUSTRALIA_EAST_CHAINTHAT_CLIENT_ID,
        "client_secret": AUSTRALIA_EAST_CHAINTHAT_CLIENT_SECRET
      })
    });
    return [res.data, null];
  } catch (error) {
    const errorMessage = `GetChainHatToken: $${error.message}`;
    logger.error(errorMessage);
    return [null, error.message];
  }
}
async function GetAddressDetails(token, id) {
  try {
    const res = await _axios2.default.call(void 0, {
      method: "POST",
      url: `${AUSTRALIA_EAST_CHAINTHAT}/connector-api/route/addressSearch/v1/address`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        "X-ebao-tenant-Id": AUSTRALIA_EAST_CHAINTHAT_EBAO_TENANT_ID,
        "X-ebao-tenant-code": AUSTRALIA_EAST_CHAINTHAT_EBAO_TENANT_CODE
      },
      data: JSON.stringify({
        "address": {
          "gnafPid": id
        },
        "typeOfRequest": "GNF_TOKEN"
      })
    });
    return [res.data, null];
  } catch (error) {
    const errorMessage = `GetAddressDetails: $${error.message}`;
    logger.error(errorMessage);
    return [null, error.message];
  }
}

// src/common/api/quote.ts

var {
  INSUREMO_API,
  INSUREMO_USERNAME,
  INSUREMO_PASSWORD,
  INSUREMO_CLIENT_ID,
  INSUREMO_TENANT_ID,
  INSUREMO_TENANT_CODE,
  INSUREMO_SOURCE_ID,
  INSUREMO_SERVER
} = _chunkU3Q25YHWjs.env;
async function GETQuoteToken() {
  try {
    const res = await _axios2.default.call(void 0, {
      method: "POST",
      url: `${INSUREMO_API}/cas/ebao/v2/json/tickets`,
      headers: {
        "Content-Type": "application/json",
        "x-ebao-tenant-code": INSUREMO_TENANT_CODE,
        "x-mo-user-source-id": INSUREMO_SOURCE_ID,
        "x-mo-client-id": INSUREMO_CLIENT_ID,
        "x-mo-tenant-id": INSUREMO_TENANT_ID
      },
      data: {
        "username": INSUREMO_USERNAME,
        "password": INSUREMO_PASSWORD
      }
    });
    return [res.data, null];
  } catch (error) {
    const errorMessage = `GETQuoteToken: $${error.message}`;
    logger.error(errorMessage);
    return [null, error.message];
  }
}
async function SubmitCreateQuote(token, data) {
  try {
    const res = await _axios2.default.call(void 0, {
      method: "POST",
      url: `${INSUREMO_SERVER}/sureinsureau/v1/appframework-bff-app/createQuote`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        "X-ebao-tenant-Id": INSUREMO_TENANT_ID,
        "X-ebao-tenant-code": INSUREMO_TENANT_CODE
      },
      data: JSON.stringify(data)
    });
    return [res.data, null];
  } catch (error) {
    const errorMessage = `SubmitCreateQuote: $${error.message}`;
    logger.error(errorMessage);
    return [null, error.message];
  }
}
async function SubmitFullQuote(token, data) {
  try {
    const res = await _axios2.default.call(void 0, {
      method: "POST",
      url: `${INSUREMO_SERVER}/sureinsureau/v1/appframework-bff-app/fullQuote`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        "X-ebao-tenant-Id": INSUREMO_TENANT_ID,
        "X-ebao-tenant-code": INSUREMO_TENANT_CODE
      },
      data: JSON.stringify(data)
    });
    return [res.data, null];
  } catch (error) {
    const errorMessage = `SubmitFullQuote: $${error.message}`;
    logger.error(errorMessage);
    return [null, error.message];
  }
}
async function SubmitBlockQuote(token, data) {
  try {
    const res = await _axios2.default.call(void 0, {
      method: "POST",
      url: `${INSUREMO_SERVER}/sureinsureau/v1/appframework-bff-app/blockQuote`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        "X-ebao-tenant-Id": INSUREMO_TENANT_ID,
        "X-ebao-tenant-code": INSUREMO_TENANT_CODE
      },
      data: {
        "ProposalNo": data
      }
    });
    return [res.data, null];
  } catch (error) {
    const errorMessage = `SubmitBlockQuote: $${error.message}`;
    logger.error(errorMessage);
    return [null, error.message];
  }
}
async function SubmitIssueQuote(token, data) {
  try {
    const res = await _axios2.default.call(void 0, {
      method: "POST",
      url: `${INSUREMO_SERVER}/sureinsureau/v1/appframework-bff-app/issueQuote`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        "X-ebao-tenant-Id": INSUREMO_TENANT_ID,
        "X-ebao-tenant-code": INSUREMO_TENANT_CODE
      },
      data: {
        "ProposalNo": data.ProposalNo,
        "PolicyPaymentInfoList": [
          {
            "ReferenceNo": data.RefNo,
            "PaidTime": _chunk2QMC77YJjs.convertDateFormat.call(void 0, /* @__PURE__ */ new Date()),
            "PayeeName": data.Name,
            "PaidAmount": data.Amount
          }
        ]
      }
    });
    return [res.data, null];
  } catch (error) {
    const errorMessage = `SubmitIssueQuote: $${error.message}`;
    logger.error(errorMessage);
    return [null, error.message];
  }
}

// src/api/v1/forms/insurance/insuranceRepository.ts
var MetaData = async (type, user, id) => {
  const isExist = id ? await _chunkVXTEHXEPjs.redis.get(`InsuranceForm:${id}:${user.email}`) : await _chunkVXTEHXEPjs.redis.get(`InsuranceForm:${user.email}`);
  if (!isExist) {
    return {};
  }
  const data = JSON.parse(isExist);
  const { streetAddress, BusinessDescription, AnnualTurnover, NumberOfEmployees, EffectiveDate, Coverages: Coverages2, ANZSICCode } = data["coverage-selection"];
  if (type === "property-details") {
    return {
      address: streetAddress,
      occupation: BusinessDescription
    };
  }
  if (type === "business-liability-coverage") {
    return {
      turnover: AnnualTurnover,
      employees: NumberOfEmployees
    };
  }
  if (type === "business-interruption-coverage") {
    return {
      turnover: AnnualTurnover
    };
  }
  if (type === "further-and-endorsements-questions") {
    const coverage = Coverages2;
    const currentDate = /* @__PURE__ */ new Date();
    currentDate.setHours(0, 0, 0, 0);
    const effectiveDate = new Date(EffectiveDate);
    effectiveDate.setHours(0, 0, 0, 0);
    return {
      effectiveDate: currentDate > effectiveDate,
      BusinessAndContents: coverage.includes("Business Building and Contents"),
      TheftMoneyAndGlass: coverage.includes("Theft, Money and Glass"),
      BusinessLiabilityCoverage: coverage.includes("Business Liability"),
      ANZSICCode: Number(ANZSICCode)
    };
  }
  if (type === "premium-summary") {
    const quote = data["create-quote"];
    const fullQuote = JSON.parse(isExist)["block-quote"] || {};
    if (!quote) {
      return {};
    }
    return {
      AgentFee: quote.AgentFees,
      AgentFeeGST: quote.GSTAgentFee,
      BrokerFee: fullQuote.BrokerFee ? fullQuote.BrokerFee : quote.BrokerFee,
      BrokerFeeGST: fullQuote.GSTBrokerFee ? fullQuote.GSTBrokerFee : quote.GSTBrokerFee,
      BrokerCommission: fullQuote.BrokerCommission ? fullQuote.BrokerCommission : quote.BrokerCommission,
      GSTBrokerCommission: fullQuote.GSTBrokerCommission ? fullQuote.GSTBrokerCommission : quote.GSTBrokerCommission,
      isFullQuote: false,
      isLiability: [
        "Business Liability",
        "Business Interruption",
        "Portable Business Content"
      ].some((item) => Coverages2.includes(item)),
      isProperty: [
        "Business Building and Contents",
        "Equipment Breakdown",
        "Theft, Money and Glass"
      ].some((item) => Coverages2.includes(item)),
      DuePremium: fullQuote.DuePremium ? fullQuote.DuePremium : quote.DuePremium,
      BrokerFees: user.role === "User" ? "10" : "0",
      Liability: user.role === "User" ? "20" : "20",
      Property: user.role === "User" ? "20" : "20",
      quote: [
        ...quote.PolicyLobList[0].PolicyRiskList[0].PolicyCoverageList.map((item) => {
          return {
            title: _chunk4QGOQSDIjs.FORMTYPES_WITH_VALUE[item.ProductElementCode],
            premium: item.StandardNetPremium,
            gst: item.GST,
            emergencyServiceLevy: item.EmergencyServiceLevy,
            stampDuty: item.StampDuty
          };
        }),
        {
          title: "Subtotal",
          premium: quote.PolicyLobList[0].PolicyRiskList[0].PolicyCoverageList.reduce((acc, item) => acc + item.StandardNetPremium, 0),
          gst: quote.PolicyLobList[0].PolicyRiskList[0].PolicyCoverageList.reduce((acc, item) => acc + item.GST, 0),
          emergencyServiceLevy: quote.PolicyLobList[0].PolicyRiskList[0].PolicyCoverageList.reduce((acc, item) => acc + item.EmergencyServiceLevy, 0),
          stampDuty: quote.PolicyLobList[0].PolicyRiskList[0].PolicyCoverageList.reduce((acc, item) => acc + item.StampDuty, 0)
        }
      ]
    };
  }
  if (type === "quote-summary") {
    const blockQuote = JSON.parse(isExist)["block-quote"];
    if (!blockQuote) {
      return {};
    }
    return {
      Address: blockQuote.PolicyLobList[0].PolicyRiskList[0].FullAddress,
      status: blockQuote.CarrierPolicyStatus,
      effectiveDate: blockQuote.EffectiveDate,
      expiryDate: blockQuote.ExpiryDate,
      AgentFee: blockQuote.AgentFees,
      AgentFeeGST: blockQuote.GSTAgentFee,
      BrokerFee: blockQuote.BrokerFee,
      BrokerFeeGST: blockQuote.GSTBrokerFee,
      InsuredName: blockQuote.BusinessName,
      TransitionType: blockQuote.IsRenewable === "Y" ? "Renewal" : "New Business",
      quoteNo: blockQuote.CarrierQuoteNumber,
      BrokerCommission: blockQuote.BrokerCommission,
      GSTBrokerCommission: blockQuote.GSTBrokerCommission,
      ProposalNo: blockQuote.ProposalNo,
      DuePremium: blockQuote.DuePremium,
      quote: [
        ...blockQuote.PolicyLobList[0].PolicyRiskList[0].PolicyCoverageList.map((item) => {
          return {
            title: _chunk4QGOQSDIjs.FORMTYPES_WITH_VALUE[item.ProductElementCode],
            premium: item.StandardNetPremium,
            gst: item.GST,
            emergencyServiceLevy: item.EmergencyServiceLevy,
            stampDuty: item.StampDuty
          };
        }),
        {
          title: "Subtotal",
          premium: blockQuote.PolicyLobList[0].PolicyRiskList[0].PolicyCoverageList.reduce((acc, item) => acc + item.StandardNetPremium, 0),
          gst: blockQuote.PolicyLobList[0].PolicyRiskList[0].PolicyCoverageList.reduce((acc, item) => acc + item.GST, 0),
          emergencyServiceLevy: blockQuote.PolicyLobList[0].PolicyRiskList[0].PolicyCoverageList.reduce((acc, item) => acc + item.EmergencyServiceLevy, 0),
          stampDuty: blockQuote.PolicyLobList[0].PolicyRiskList[0].PolicyCoverageList.reduce((acc, item) => acc + item.StampDuty, 0)
        }
      ]
    };
  }
  return {};
};
var GetOptions = (field) => {
  return _chunk4QGOQSDIjs.PREMIUM_QUESTION[field].map((q) => ({
    id: q.id,
    question: q.question
  }));
};
var InsuranceFormStatusDefault = [
  {
    title: "Coverage Selection",
    status: "in-progress",
    query: "coverage-selection",
    disabled: false
  },
  {
    title: "Business Details",
    status: "pending",
    query: "business-details",
    disabled: true
  },
  {
    title: "Premium Summary",
    status: "pending",
    query: "premium-summary",
    disabled: true
  },
  {
    title: "Quote Summary",
    status: "pending",
    query: "quote-summary",
    disabled: true
  }
];
var DATE = new Date((/* @__PURE__ */ new Date()).setHours(0, 0, 0, 0));
var CoverageSelectionDefault = {
  ABN: "",
  EffectiveDate: DATE,
  ExpiryDate: new Date(DATE).setFullYear(DATE.getFullYear() + 1),
  BusinessName: "",
  BusinessDescription: "",
  ANZSICCode: "",
  streetAddress: "",
  AnnualTurnover: "",
  NumberOfEmployees: "",
  YearStarted: "",
  LocationType: "",
  TypeOfBusiness: "Business Operations Only",
  Coverages: []
};
var PropertyDetailsDefault = {
  YearBuilt: "",
  EPS: "",
  NumberOfStories: "",
  HeritageListing: "no",
  InterestedParty: ""
};
var BusinessAndContentsDefault = {
  BuildingLimitAndExcess_Insured: "",
  BuildingLimitAndExcess_Excess: "250",
  ContentsLimitAndExcess_Insured: "",
  ContentsLimitAndExcess_Excess: "1000",
  StockLimitAndExcess_Insured: "",
  StockLimitAndExcess_Excess: "1000"
};
var EquipmentBreakdownDefault = {
  DeteriorationOfStock: "",
  NumberOfMachines: "",
  IncreasedCostOfWorking: "",
  OtherElectronicEquipment: "",
  Computers: "",
  PortableElectronicEquipment: ""
};
var BusinessLiabilityCoverageDefault = {
  LimitsOfLiability: "20000000",
  AnnualWages: "",
  Property: "",
  InterestedParty: "",
  Contractor: "",
  TaxAudit: "0",
  Excess: "500"
};
var PortableBusinessContentsCoverageDefault = {
  BlanketCoverContent: "",
  BlanketCoverStock: "",
  PortableSpecifiedItems: [{
    description: ""
  }]
};
var InsuranceFormDefaultValues = {
  "coverage-selection": CoverageSelectionDefault,
  "property-details": PropertyDetailsDefault,
  "business-and-contents": BusinessAndContentsDefault,
  "equipment-breakdown": EquipmentBreakdownDefault,
  "theft-money-and-glass": {},
  "business-liability-coverage": BusinessLiabilityCoverageDefault,
  "business-interruption-coverage": {
    AnnualGrossProfit: ""
  },
  "portable-business-contents-coverage": PortableBusinessContentsCoverageDefault,
  "further-and-endorsements-questions": {
    DisclaimerAgreedTag: false
  },
  "premium-summary": {
    DeclarationQuestions: GetOptions("Declaration Questions"),
    Exemption: GetOptions("Exemption")
    // BrokerFees: "0",
    // Liability: "20",
    // Property: "20",
  },
  "quote-summary": {},
  "create-quote": ""
};
var Coverages = {
  "Business Building and Contents": "Business and Contents",
  "Equipment Breakdown": "Equipment Breakdown",
  "Theft, Money and Glass": "Theft, Money and Glass",
  "Business Liability": "Business Liability Coverage",
  "Business Interruption": "Business Interruption Coverage",
  "Portable Business Content": "Portable Business Contents Coverage"
};
var CoveragesFormName = {
  "coverage-selection": "Coverage Selection",
  "property-details": "Property Details",
  "business-and-contents": "Business Building and Contents",
  "equipment-breakdown": "Equipment Breakdown",
  "theft-money-and-glass": "Theft, Money and Glass",
  "business-liability-coverage": "Business Liability",
  "business-interruption-coverage": "Business Interruption",
  "portable-business-contents-coverage": "Portable Business Contents Coverage",
  "further-and-endorsements-questions": "Further and Endorsements Questions",
  "premium-summary": "Premium Summary",
  "quote-summary": "Quote Summary"
};
var ArrangeCoverages = (coverages) => {
  const desiredOrder = [
    "Business Building and Contents",
    "Equipment Breakdown",
    "Theft, Money and Glass",
    "Business Liability",
    "Business Interruption",
    "Portable Business Content"
  ];
  return desiredOrder.filter((coverage) => coverages.includes(coverage));
};
var InsuranceFormStatus = (coverages) => {
  const status = [
    {
      title: "Property Covers",
      status: "pending",
      query: "property-covers",
      disabled: true,
      children: []
    },
    {
      title: "Policy Covers",
      status: "pending",
      query: "policy-covers",
      disabled: true,
      children: []
    }
  ];
  const propertyCovers = ["Business Building and Contents", "Equipment Breakdown", "Theft, Money and Glass"];
  const policyCovers = ["Business Liability", "Business Interruption", "Portable Business Content"];
  coverages.forEach((value) => {
    const title = Coverages[value];
    if (value === "Business Building and Contents" || value === "Equipment Breakdown" && policyCovers.includes("Business Liability") || value === "Theft, Money and Glass" && policyCovers.includes("Business Liability")) {
      _optionalChain([status, 'access', _ => _[0], 'access', _2 => _2.children, 'optionalAccess', _3 => _3.push, 'call', _4 => _4(
        {
          title: "Property Details",
          status: "pending",
          query: "property-details",
          disabled: false
        }
      )]);
    }
    if (propertyCovers.includes(value)) {
      _optionalChain([status, 'access', _5 => _5[0], 'access', _6 => _6.children, 'optionalAccess', _7 => _7.push, 'call', _8 => _8({
        title,
        status: "pending",
        query: title.toLowerCase().replace(/[\s,]+/g, "-"),
        disabled: false
      })]);
    }
    if (policyCovers.includes(value)) {
      _optionalChain([status, 'access', _9 => _9[1], 'access', _10 => _10.children, 'optionalAccess', _11 => _11.push, 'call', _12 => _12({
        title,
        status: "pending",
        query: title.toLowerCase().replace(/[\s,]+/g, "-"),
        disabled: false
      })]);
    }
  });
  const filteredStatus = status.filter((item) => item.children && item.children.length > 0);
  const uniqueFilteredStatus = filteredStatus.map((item) => {
    item.children = _optionalChain([item, 'access', _13 => _13.children, 'optionalAccess', _14 => _14.filter, 'call', _15 => _15(
      (child, index, self) => index === self.findIndex((t) => t.title === child.title)
    )]);
    return item;
  });
  return [
    ...uniqueFilteredStatus,
    {
      title: "Further And Endorsements Questions",
      status: "pending",
      query: "further-and-endorsements-questions",
      disabled: false,
      children: []
    }
  ];
};
var updateInsuranceStatus = (items, query, status) => {
  let value = items;
  for (const item of items) {
    if (item.query === query) {
      item.status = status;
    }
    if (item.children) {
      updateInsuranceStatus(item.children, query, status);
      if (item.children.length > 0) {
        const allChildrenComplete = item.children.every((child) => child.status === "completed");
        if (allChildrenComplete) {
          item.status = "completed";
        }
      }
    }
  }
  return value;
};
var GiveN_OR_Y = (value) => {
  return value === "no" ? "N" : "Y";
};
var SubmitCreateQuoteForm = async (data, user) => {
  try {
    const [token, issue] = await GetChainHatToken();
    if (!token && issue) {
      throw new Error(issue);
    }
    const {
      streetAddress,
      EffectiveDate,
      ExpiryDate,
      ABN,
      AnnualTurnover,
      BusinessName,
      NumberOfEmployees,
      ANZSICCode,
      BusinessDescription,
      YearStarted,
      TypeOfBusiness,
      LocationType,
      Coverages: Coverages2,
      isManual,
      ...remaining
    } = data["coverage-selection"];
    const PROPERTY_DETAILS = data["property-details"];
    const BUSINESS_AND_CONTENTS = data["business-and-contents"];
    const EQUIPMENT_BREAKDOWN = data["equipment-breakdown"];
    const { DisclaimerAgreedTag, ...FURTHER_QUESTIONS_AND_ENDORSEMENTS } = data["further-and-endorsements-questions"];
    const THEFT_MONEY_AND_GLASS = data["theft-money-and-glass"];
    const BUSINESS_LIABILITY_COVERAGE = data["business-liability-coverage"];
    const BUSINESS_INTERRUPTION_COVERAGE = data["business-interruption-coverage"];
    const { PortableSpecifiedItems, ...PORTABLE_BUSINESS_CONTENTS_COVERAGE } = data["portable-business-contents-coverage"] || {
      PortableSpecifiedItems: []
    };
    const [address, error] = await GetAddressDetails(_optionalChain([token, 'optionalAccess', _16 => _16.access_token]), streetAddress);
    if (!address && error) {
      throw new Error(error);
    }
    const ALL_QUESTIONS = [
      ...FURTHER_QUESTIONS_AND_ENDORSEMENTS["BusinessAndContents"] || [],
      ...FURTHER_QUESTIONS_AND_ENDORSEMENTS["BusinessLiabilityCoverage"] || [],
      ...FURTHER_QUESTIONS_AND_ENDORSEMENTS["TheftMoneyAndGlass"] || []
    ];
    const ALL_QUESTIONS_WITH_CLAIMS = [
      ...ALL_QUESTIONS || [],
      ...BUSINESS_AND_CONTENTS ? [{
        id: 43,
        question: "Claims In Last Five Years?",
        answer: BUSINESS_AND_CONTENTS.BuildingAndContentClaimHistory
      }] : [],
      ...EQUIPMENT_BREAKDOWN ? [{
        id: 45,
        question: "Claims In Last Five Years?",
        answer: EQUIPMENT_BREAKDOWN.EquipmentBreakdownClaimHistory
      }] : [],
      ...THEFT_MONEY_AND_GLASS ? [{
        id: 44,
        question: "Claims In Last Five Years?",
        answer: THEFT_MONEY_AND_GLASS.TheftMoneyAndGlassClaimHistory
      }] : [],
      ...BUSINESS_LIABILITY_COVERAGE ? [{
        id: 40,
        question: "Claims In Last Five Years?",
        answer: BUSINESS_LIABILITY_COVERAGE.BuildingLiabilityClaimHistory
      }] : [],
      ...PORTABLE_BUSINESS_CONTENTS_COVERAGE && PORTABLE_BUSINESS_CONTENTS_COVERAGE.PortableBusinessClaimHistory ? [{
        id: 42,
        question: "Claims In Last Five Years?",
        answer: PORTABLE_BUSINESS_CONTENTS_COVERAGE.PortableBusinessClaimHistory
      }] : []
    ];
    const findQuestionDetailsWithClaims = (id) => {
      return _optionalChain([ALL_QUESTIONS_WITH_CLAIMS, 'access', _17 => _17.find, 'call', _18 => _18((item) => item.id === id), 'optionalAccess', _19 => _19.answer]) || "no";
    };
    const ALLFORMQUESTIONS = ALL_QUESTIONS_WITH_CLAIMS.map((i) => {
      return {
        "ProductElementCode": "OCCUPATIONCLAUSEQA",
        "QuestionId": String(i.id),
        "AnswerCode": GiveN_OR_Y(findQuestionDetailsWithClaims(i.id))
      };
    });
    const ClaimList = (value, code, type = "ALL") => {
      return value.map((item) => {
        return {
          "ProductElementCode": "CLAIMS",
          "ProductCoverageId": code,
          "ClaimType": type === "ALL" ? _chunk4QGOQSDIjs.CLAIM_TYPES[item.ClaimType] : _chunk4QGOQSDIjs.FIVE_YEAR_LIABILITY[item.ClaimType],
          "ClaimType_Name": item.ClaimType,
          "DateOfLoss": item.YearOfLoss,
          "LossAmount": item.Value
        };
      });
    };
    const currentYear = (/* @__PURE__ */ new Date()).getFullYear();
    const findQuestionDetails = (id) => {
      return _optionalChain([ALL_QUESTIONS, 'access', _20 => _20.find, 'call', _21 => _21((item) => item.id === id), 'optionalAccess', _22 => _22.answer]) || "no";
    };
    const isQuestionExist = (id) => {
      return ALL_QUESTIONS.find((item) => item.id === id);
    };
    let BUSINESS_AND_CONTENTS_VALUES;
    let EQUIPMENT_BREAKDOWN_VALUES;
    let THEFT_MONEY_AND_GLASS_VALUES;
    let BUSINESS_LIABILITY_COVERAGE_VALUES;
    let BUSINESS_INTERRUPTION_COVERAGE_VALUES;
    let PORTABLE_BUSINESS_CONTENTS_COVERAGE_VALUES;
    let PROPERTY_DETAILS_VALUES;
    const findElementValue = (field) => {
      return address ? _optionalChain([address, 'access', _23 => _23.providerResponse, 'access', _24 => _24.Elements, 'access', _25 => _25.find, 'call', _26 => _26((item) => item.Field === field), 'optionalAccess', _27 => _27.Value]) || "" : "";
    };
    const ADDRESS = {
      "IsPrimaryAddress": "false",
      "AddressTypeCode": "mailing",
      // "IsManualAddress": String(isManual) || "false", // TODO : Need to check
      "IsManualAddress": "false",
      "AddressLine1": _optionalChain([address, 'optionalAccess', _28 => _28.addressInfo, 'access', _29 => _29[0], 'access', _30 => _30.addressLine1]),
      "AddressLine2": _optionalChain([address, 'optionalAccess', _31 => _31.addressInfo, 'access', _32 => _32[0], 'access', _33 => _33.addressLine2]),
      "City": _optionalChain([address, 'optionalAccess', _34 => _34.addressInfo, 'access', _35 => _35[0], 'access', _36 => _36.city]),
      "PostalCode": _optionalChain([address, 'optionalAccess', _37 => _37.addressInfo, 'access', _38 => _38[0], 'access', _39 => _39.postalCode]),
      "CountryCode": _optionalChain([address, 'optionalAccess', _40 => _40.addressInfo, 'access', _41 => _41[0], 'access', _42 => _42.countryCode]),
      "Territory": `AU-${_optionalChain([address, 'optionalAccess', _43 => _43.addressInfo, 'access', _44 => _44[0], 'access', _45 => _45.province])}`,
      "Latitude": _optionalChain([address, 'optionalAccess', _46 => _46.addressInfo, 'access', _47 => _47[0], 'access', _48 => _48.latitude]),
      "Longitude": _optionalChain([address, 'optionalAccess', _49 => _49.addressInfo, 'access', _50 => _50[0], 'access', _51 => _51.longitude]),
      "GnafPID": _optionalChain([address, 'optionalAccess', _52 => _52.providerResponse, 'access', _53 => _53.GNAF_PID]),
      "FullAddress": _optionalChain([address, 'optionalAccess', _54 => _54.addressInfo, 'access', _55 => _55[0], 'access', _56 => _56.freeFormAddress]),
      "StateOrProvinceCode": _optionalChain([address, 'optionalAccess', _57 => _57.addressInfo, 'access', _58 => _58[0], 'access', _59 => _59.province])
    };
    if (PROPERTY_DETAILS) {
      PROPERTY_DETAILS_VALUES = {
        "RoofMaterial": "",
        "YearBuilt": `${PROPERTY_DETAILS.YearBuilt}-01-01`,
        "FloorConstruction": _chunk4QGOQSDIjs.FLOOR_CONSTRUCTION[PROPERTY_DETAILS.FloorConstruction],
        "RoofConstruction": _chunk4QGOQSDIjs.ROOF_CONSTRUCTION[PROPERTY_DETAILS.RoofConstruction],
        "WallConstruction": _chunk4QGOQSDIjs.WALL_CONSTRUCTION[PROPERTY_DETAILS.WallContruction],
        "SandwichPanelorEPS": PROPERTY_DETAILS.EPS,
        "NumberOfStoriesInTheBuilding": PROPERTY_DETAILS.NumberOfStories,
        "AreAnyOfTheBuildingsHeritageListed": PROPERTY_DETAILS.HeritageListing,
        "LocatedFloor": _chunk4QGOQSDIjs.FLOOR[PROPERTY_DETAILS.LowestFloorYouOccupy],
        "RiskInterestedParty": PROPERTY_DETAILS.InterestedParty,
        "FloorConstruction_Name": PROPERTY_DETAILS.FloorConstruction,
        "WallConstruction_Name": PROPERTY_DETAILS.WallContruction,
        "LowestFloorYouOccupy_Name": PROPERTY_DETAILS.LowestFloorYouOccupy,
        "RoofConstruction_Name": PROPERTY_DETAILS.RoofConstruction
      };
    }
    if (BUSINESS_AND_CONTENTS) {
      BUSINESS_AND_CONTENTS_VALUES = {
        "ProductElementCode": "C0001788",
        "LineOfBusinessCode": "PRP",
        // // Need To Replace
        // "BNCFurtherQuestion1": "",
        // "BNCFurtherQuestion2": "",
        // "BNCFurtherQuestion3": "",
        // "BNCFurtherQuestion4": "",
        // 
        ...isQuestionExist(27) && { "CommercialCookingClauseQuestion": GiveN_OR_Y(findQuestionDetails(27)) },
        ...isQuestionExist(26) && { "FloodCoverQuestion": GiveN_OR_Y(findQuestionDetails(26)) },
        "ClaimsInLastFiveYears": GiveN_OR_Y(BUSINESS_AND_CONTENTS.BuildingAndContentClaimHistory),
        PolicyBenefitList: [
          {
            "ProductElementCode": "B00868",
            "SumInsured": BUSINESS_AND_CONTENTS.BuildingLimitAndExcess_Insured,
            "Excess": BUSINESS_AND_CONTENTS.BuildingLimitAndExcess_Excess
          },
          {
            "ProductElementCode": "B00869",
            "SumInsured": BUSINESS_AND_CONTENTS.ContentsLimitAndExcess_Insured,
            "Excess": BUSINESS_AND_CONTENTS.ContentsLimitAndExcess_Excess
          },
          {
            "ProductElementCode": "B00870",
            "SumInsured": BUSINESS_AND_CONTENTS.StockLimitAndExcess_Insured,
            "Excess": BUSINESS_AND_CONTENTS.StockLimitAndExcess_Excess
          }
        ]
      };
    }
    if (EQUIPMENT_BREAKDOWN) {
      EQUIPMENT_BREAKDOWN_VALUES = {
        "ProductElementCode": "C0001790",
        "LineOfBusinessCode": "PRP",
        "ClaimsInLastFiveYears": GiveN_OR_Y(EQUIPMENT_BREAKDOWN.EquipmentBreakdownClaimHistory),
        "PolicyBenefitList": [
          {
            "ProductElementCode": "B00874",
            "BlanketCover": EQUIPMENT_BREAKDOWN.BlanketCover,
            "Excess": EQUIPMENT_BREAKDOWN.MachineryBreakdownExcess,
            "DeteriorationOfStock": EQUIPMENT_BREAKDOWN.DeteriorationOfStock,
            "ICOWIncreasedCostofWorking": EQUIPMENT_BREAKDOWN.IncreasedCostOfWorking,
            "NumberofMachines": EQUIPMENT_BREAKDOWN.NumberOfMachines
          },
          {
            "ProductElementCode": "B00875",
            "Excess": EQUIPMENT_BREAKDOWN.ElectronicEquipmentExcess,
            "ComputerLimit": EQUIPMENT_BREAKDOWN.Computers,
            "PortableElectronicEquipment": EQUIPMENT_BREAKDOWN.PortableElectronicEquipment,
            "OtherElectronicEquipment": EQUIPMENT_BREAKDOWN.OtherElectronicEquipment
          }
        ]
      };
    }
    if (THEFT_MONEY_AND_GLASS) {
      THEFT_MONEY_AND_GLASS_VALUES = {
        "ProductElementCode": "C0001789",
        "LineOfBusinessCode": "PRP",
        // Need To Replace
        // "TMGFurtherQuestion1": "",
        // 
        "ClaimsInLastFiveYears": GiveN_OR_Y(THEFT_MONEY_AND_GLASS.TheftMoneyAndGlassClaimHistory),
        "PolicyBenefitList": [
          {
            "ProductElementCode": "B00871",
            "TheftExcludingTobacco": _optionalChain([THEFT_MONEY_AND_GLASS, 'access', _60 => _60.Theft, 'optionalAccess', _61 => _61.TheftTobaccoExcluding]),
            "TheftTobacco": _optionalChain([THEFT_MONEY_AND_GLASS, 'access', _62 => _62.Theft, 'optionalAccess', _63 => _63.TheftTobacco]),
            "Excess": _optionalChain([THEFT_MONEY_AND_GLASS, 'access', _64 => _64.Theft, 'optionalAccess', _65 => _65.TheftExcess]),
            "SecurityAlarm": _chunk4QGOQSDIjs.THEFT_SECURITY[_optionalChain([THEFT_MONEY_AND_GLASS, 'access', _66 => _66.Theft, 'optionalAccess', _67 => _67.TheftSecurity])],
            "DeadlocksonallExternalDoors": String(_optionalChain([THEFT_MONEY_AND_GLASS, 'access', _68 => _68.Theft, 'optionalAccess', _69 => _69.TheftSecurityExtra, 'optionalAccess', _70 => _70.includes, 'call', _71 => _71("Deadlocks on all External Doors")])),
            "KeyOpredLocksonallExterWins": String(_optionalChain([THEFT_MONEY_AND_GLASS, 'access', _72 => _72.Theft, 'optionalAccess', _73 => _73.TheftSecurityExtra, 'optionalAccess', _74 => _74.includes, 'call', _75 => _75("Key Operated Locks on all External Windows")])),
            "Barsecurscreensonallexternwins": String(_optionalChain([THEFT_MONEY_AND_GLASS, 'access', _76 => _76.Theft, 'optionalAccess', _77 => _77.TheftSecurityExtra, 'optionalAccess', _78 => _78.includes, 'call', _79 => _79("Bars/security screens on all external windows?")]))
          },
          {
            "ProductElementCode": "B00872",
            "MoneyInPremisesDuringBuSInessSI": _optionalChain([THEFT_MONEY_AND_GLASS, 'access', _80 => _80.Money, 'optionalAccess', _81 => _81.MoneyOnPremisesDuringBusinessHours]),
            "Moneyonpremoutsidebusinesshrs": _optionalChain([THEFT_MONEY_AND_GLASS, 'access', _82 => _82.Money, 'optionalAccess', _83 => _83.MoneyOnPremisesOutsideBusinessHours]),
            "Moneyonpremlockedsafe": _optionalChain([THEFT_MONEY_AND_GLASS, 'access', _84 => _84.Money, 'optionalAccess', _85 => _85.MoneyOnPremisesInALockedSafe]),
            "MoneyInTranSItSI": _optionalChain([THEFT_MONEY_AND_GLASS, 'access', _86 => _86.Money, 'optionalAccess', _87 => _87.MoneyInTransit]),
            "Moneyinapvtresidence": _optionalChain([THEFT_MONEY_AND_GLASS, 'access', _88 => _88.Money, 'optionalAccess', _89 => _89.MoneyInAPrivateResidence]),
            "Excess": _optionalChain([THEFT_MONEY_AND_GLASS, 'access', _90 => _90.Money, 'optionalAccess', _91 => _91.MoneyExcess])
          },
          {
            "ProductElementCode": "B00873",
            "GlassSumInsured": "Replacement Value",
            "SumInsured": _optionalChain([THEFT_MONEY_AND_GLASS, 'access', _92 => _92.Glass, 'optionalAccess', _93 => _93.IlluminatedSignsSumInsured]),
            "TypeofGlass": _chunk4QGOQSDIjs.TYPE_OF_GLASS[_optionalChain([THEFT_MONEY_AND_GLASS, 'access', _94 => _94.Glass, 'optionalAccess', _95 => _95.TypeOfGlass])],
            "PercentageGlassAbvGrndFlr": _optionalChain([THEFT_MONEY_AND_GLASS, 'access', _96 => _96.Glass, 'optionalAccess', _97 => _97.Percentage]),
            "PlateTypeGlass": _chunk4QGOQSDIjs.TYPE_OF_PLATE[_optionalChain([THEFT_MONEY_AND_GLASS, 'access', _98 => _98.Glass, 'optionalAccess', _99 => _99.TypeOfPlate])],
            "Excess": _optionalChain([THEFT_MONEY_AND_GLASS, 'access', _100 => _100.Glass, 'optionalAccess', _101 => _101.MoneyExcess]),
            "GlassInterestedParty": THEFT_MONEY_AND_GLASS.InterestedParty
          }
        ]
      };
    }
    if (BUSINESS_LIABILITY_COVERAGE) {
      BUSINESS_LIABILITY_COVERAGE_VALUES = {
        "ProductElementCode": "C0001785",
        "LineOfBusinessCode": "GELI",
        "DirectorHistory": "DH3",
        "CreditScore": "CS1",
        "Import": "N",
        // Need To Replace
        // "BLCovFurtherQuestion1": "N",
        // "BLCovFurtherQuestion2": "N",
        // "BLCovFurtherQuestion3": "N",
        // "BLCovFurtherQuestion4": "N",
        // 
        "BLInterestedParty": BUSINESS_LIABILITY_COVERAGE.InterestedParty,
        "AnnualWages": BUSINESS_LIABILITY_COVERAGE.AnnualWages,
        "Turnover": AnnualTurnover,
        "NumberofEmployees": Number(NumberOfEmployees),
        "PropertyUnderYourCareorCustody": BUSINESS_LIABILITY_COVERAGE.Property,
        "ConctororLabourHirePaynts": BUSINESS_LIABILITY_COVERAGE.Contractor,
        "ClaimsInLastFiveYears": GiveN_OR_Y(BUSINESS_LIABILITY_COVERAGE.BuildingLiabilityClaimHistory),
        "PolicyBenefitList": [
          {
            "ProductElementCode": "B00863",
            "LimitOfLiability": BUSINESS_LIABILITY_COVERAGE.LimitsOfLiability,
            "TaxAuditSI": BUSINESS_LIABILITY_COVERAGE.TaxAudit,
            "Excess": BUSINESS_LIABILITY_COVERAGE.Excess
          }
        ]
      };
    }
    if (BUSINESS_INTERRUPTION_COVERAGE) {
      BUSINESS_INTERRUPTION_COVERAGE_VALUES = {
        "ProductElementCode": "C0001786",
        "LineOfBusinessCode": "PRP",
        "IndemnityPeriod": _chunk4QGOQSDIjs.INDEMNITY_PERIOD[BUSINESS_INTERRUPTION_COVERAGE.IndemnityPeriod],
        "IndemnityPeriod_Name": BUSINESS_INTERRUPTION_COVERAGE.IndemnityPeriod,
        "GrossProfit": BUSINESS_INTERRUPTION_COVERAGE.AnnualGrossProfit,
        "AdditionIncreaseCostOfWorking": BUSINESS_INTERRUPTION_COVERAGE.AdditionalIncreaseCostOfWork,
        "ClaimPreparationCost": BUSINESS_INTERRUPTION_COVERAGE.ClaimPreparationCost,
        "BIInterestedParty": BUSINESS_INTERRUPTION_COVERAGE.InterestedParty,
        "ClaimsInLastFiveYears": GiveN_OR_Y(BUSINESS_INTERRUPTION_COVERAGE.BusinessInterruptionClaimHistory),
        "PolicyBenefitList": [
          {
            "ProductElementCode": "B00864",
            "Excess": BUSINESS_INTERRUPTION_COVERAGE.Excess,
            "Turnover": AnnualTurnover
          }
        ]
      };
    }
    if (PORTABLE_BUSINESS_CONTENTS_COVERAGE && PortableSpecifiedItems) {
      PORTABLE_BUSINESS_CONTENTS_COVERAGE_VALUES = {
        "ProductElementCode": "C0001787",
        "LineOfBusinessCode": "PRP",
        "PBCInterestedParty": PORTABLE_BUSINESS_CONTENTS_COVERAGE.InterestedParty,
        "ClaimsInLastFiveYears": GiveN_OR_Y(PORTABLE_BUSINESS_CONTENTS_COVERAGE.PortableBusinessClaimHistory),
        "PolicyBenefitList": [
          {
            "ProductElementCode": "B00865",
            "BlanketCoverContent": PORTABLE_BUSINESS_CONTENTS_COVERAGE.BlanketCoverContent
          },
          {
            "ProductElementCode": "B00866",
            "BlanketCoverStock": PORTABLE_BUSINESS_CONTENTS_COVERAGE.BlanketCoverStock,
            "Excess": PORTABLE_BUSINESS_CONTENTS_COVERAGE.Excess
          },
          {
            "ProductElementCode": "B00867",
            "ReplacementValueOfTotalContents": PortableSpecifiedItems && PortableSpecifiedItems.length !== 0 && typeof PortableSpecifiedItems[0].category !== "undefined" && typeof PortableSpecifiedItems[0].description !== "undefined" ? String(PortableSpecifiedItems.reduce((total, item) => total + Number(item.value), 0)) : "0",
            "Excess": PORTABLE_BUSINESS_CONTENTS_COVERAGE.Excess
          }
        ],
        "PolicyEntityList": PortableSpecifiedItems && PortableSpecifiedItems.length !== 0 && typeof PortableSpecifiedItems[0].category !== "undefined" && typeof PortableSpecifiedItems[0].description !== "undefined" ? PortableSpecifiedItems.map((value) => {
          return {
            "ProductElementCode": "PROPERTYBUSINESSCONTENTSPECIFIEDITEMS",
            "Category": _chunk4QGOQSDIjs.CATEGORY_OPTIONS[value.category],
            "Category_Name": value.category,
            "ItemsDescription": value.description,
            "ReplacementValue": value.value
          };
        }) : []
      };
    }
    const response = {
      "ProductCode": "BPIP01",
      "ProductVersion": "1.0",
      "CarrierReferenceNumber": "",
      "CarrierQuoteNumber": "",
      "CarrierPolicyNo": "",
      "AgencyCode": "",
      "PolicyStage": "",
      "CarrierPolicyStatus": "",
      "TrackingNumber": "",
      "LineOfBusinessCode": "VAR",
      "CarrierProductCode": "OBP1",
      "PolicyTerm": "365",
      // Coverage Selection
      "EffectiveDate": _chunk2QMC77YJjs.convertDateFormat.call(void 0, EffectiveDate),
      "ExpiryDate": _chunk2QMC77YJjs.convertDateFormat.call(void 0, ExpiryDate),
      DisclaimerAgreedTag: String(DisclaimerAgreedTag),
      "ABN": ABN,
      "Turnover": AnnualTurnover,
      "BusinessName": BusinessName,
      "NumberofEmployees": Number(NumberOfEmployees),
      "JobDescription": BusinessDescription,
      "YearBusinessStarted": YearStarted,
      "ANZSICCode": ANZSICCode,
      "YearsInBusiness": currentYear - Number(YearStarted),
      PolicyCustomerList: [
        {
          // Coverage Selection
          "CustomerName": BusinessName,
          "JobDescription": BusinessDescription,
          "ANZSICCode": ANZSICCode,
          // Address
          "CustomerType": "organization",
          "StreetName": _optionalChain([address, 'optionalAccess', _102 => _102.addressInfo, 'access', _103 => _103[0], 'access', _104 => _104.street]),
          ...ADDRESS
        }
      ],
      PolicyLobList: [
        {
          "ProductCode": "BPIP01",
          "PolicyRiskList": [
            {
              "ProductElementCode": "R00005",
              "Flood_FL_rate_SME_Cts": findElementValue("Flood_FL_rate_SME_Cts"),
              "Flood_FL_rate_SME_Bld": findElementValue("Flood_FL_rate_SME_Bld"),
              "Bushfire_risk_score": findElementValue("bushfire_risk_score"),
              "Cyclone_risk_score": findElementValue("cyclone_risk_score"),
              "Storm_risk_score_SME_Bld": findElementValue("storm_risk_score_SME_Bld"),
              "Storm_risk_score_SME_Cts": findElementValue("storm_risk_score_SME_Cts"),
              "Bld_elevation": findElementValue("bld_elevation"),
              "Flood_FL_ARI_GL": findElementValue("flood_FL_ARI_GL"),
              "SecurityFeatures": "",
              "RuralMetro": "",
              "TerrorLevyTier": "B",
              "NoOfLevel": "2",
              // TODO : Need to check
              // Coverages
              "TypeOfBusiness_Name": TypeOfBusiness,
              "LocationType_Name": LocationType,
              "JobDescription": BusinessDescription,
              "LocationType": _chunk4QGOQSDIjs.LOCATION_TYPE_WITH_VALUE[LocationType],
              "TypeOfBusiness": _chunk4QGOQSDIjs.TYPE_OF_BUSINESS_WITH_VALUE[TypeOfBusiness],
              // Address
              ...ADDRESS,
              // Property Details
              ...PROPERTY_DETAILS && PROPERTY_DETAILS_VALUES,
              // Theft, Money and Glass
              "IsTheftCoverage": String(THEFT_MONEY_AND_GLASS ? THEFT_MONEY_AND_GLASS.Sections.includes("Theft") : false),
              "IsMoneyCoverage": String(THEFT_MONEY_AND_GLASS ? THEFT_MONEY_AND_GLASS.Sections.includes("Money") : false),
              "IsGlassCoverage": String(THEFT_MONEY_AND_GLASS ? THEFT_MONEY_AND_GLASS.Sections.includes("Glass") : false),
              "PolicyCoverageList": [
                ...Coverages2.includes("Business Building and Contents") ? [BUSINESS_AND_CONTENTS_VALUES] : [],
                ...Coverages2.includes("Equipment Breakdown") ? [EQUIPMENT_BREAKDOWN_VALUES] : [],
                ...Coverages2.includes("Theft, Money and Glass") ? [THEFT_MONEY_AND_GLASS_VALUES] : [],
                ...Coverages2.includes("Business Liability") ? [BUSINESS_LIABILITY_COVERAGE_VALUES] : [],
                ...Coverages2.includes("Business Interruption") ? [BUSINESS_INTERRUPTION_COVERAGE_VALUES] : [],
                ...Coverages2.includes("Portable Business Content") ? [PORTABLE_BUSINESS_CONTENTS_COVERAGE_VALUES] : []
              ],
              PolicyEntityList: [
                ...isQuestionExist(27) ? [{
                  "ProductElementCode": "BLENDORSEMENT",
                  "EndorsementType": "PreBind",
                  "EndorsementNo": "ENDO_012",
                  "EndorsementName": "Commercial Cooking Clause",
                  "ProductCoverageId": "C0001788",
                  "ValueType": "amount",
                  "IsMandatory": "",
                  "GrossPremium": "",
                  "SequenceNumber": "1",
                  "PolicyRiskId": "R00005",
                  "PolicyEntityList": [
                    {
                      "ProductElementCode": "BLQUESTIONANSWER",
                      "QuestionCode": "ENDO_012_Q1",
                      "QuestionAnswer": "Does the business employ a professional cleaner to clean the exhaust or extraction system ducting annually?",
                      "AnswerCode": findQuestionDetails(27)
                    }
                  ]
                }] : [],
                ...isQuestionExist(26) ? [{
                  "ProductElementCode": "BLENDORSEMENT",
                  "EndorsementType": "PreBind",
                  "EndorsementNo": "ENDO_008",
                  "EndorsementName": "Flood Cover",
                  "ProductCoverageId": "C0001788",
                  "IsMandatory": "",
                  "GrossPremium": "",
                  "ValueType": "amount",
                  "SequenceNumber": "2",
                  "PolicyRiskId": "R00005",
                  "PolicyEntityList": [
                    {
                      "ProductElementCode": "BLQUESTIONANSWER",
                      "QuestionCode": "ENDO_008_Q1",
                      "QuestionAnswer": "Do you require flood cover?",
                      "AnswerCode": findQuestionDetails(26)
                    }
                  ]
                }] : [],
                // ...ALLFORMQUESTIONS.filter(q => {
                //     return q.QuestionId !== String(41) || (ALLFORMQUESTIONS.find(question => question.QuestionId === '39') && ALLFORMQUESTIONS.find(question => question.QuestionId === '39')?.AnswerCode === 'N')
                // })
                ...ALLFORMQUESTIONS.filter((q) => q.QuestionId !== "41" || _optionalChain([ALLFORMQUESTIONS, 'access', _105 => _105.find, 'call', _106 => _106((question) => question.QuestionId === "39"), 'optionalAccess', _107 => _107.AnswerCode]) === "Y")
              ]
            }
          ],
          PolicyEntityList: [
            ...Coverages2.includes("Business Building and Contents") ? ClaimList(BUSINESS_AND_CONTENTS.Claims, "C0001788") : [],
            ...Coverages2.includes("Equipment Breakdown") ? ClaimList(EQUIPMENT_BREAKDOWN.Claims, "C0001790") : [],
            ...Coverages2.includes("Theft, Money and Glass") ? ClaimList(THEFT_MONEY_AND_GLASS.Claims, "C0001789") : [],
            ...Coverages2.includes("Business Liability") ? ClaimList(BUSINESS_LIABILITY_COVERAGE.Claims, "C0001785", "LI") : [],
            ...Coverages2.includes("Business Interruption") ? ClaimList(BUSINESS_INTERRUPTION_COVERAGE.Claims, "C0001786") : [],
            ...Coverages2.includes("Portable Business Content") ? ClaimList(PORTABLE_BUSINESS_CONTENTS_COVERAGE.Claims, "C0001787") : []
          ]
        }
      ],
      "PolicyPaymentInfoList": [
        {
          "BillingType": "ABI",
          "PaymentPlan": "PPC001",
          "IsInstallment": "N"
        }
      ]
    };
    const [access] = await GETQuoteToken();
    const responseValue = await SubmitCreateQuote(_optionalChain([access, 'optionalAccess', _108 => _108.access_token]), response);
    await _chunkJI2CNXVDjs.createQuoteResponseDebugModelQuote.call(void 0, {
      meta: {
        email: user.email,
        role: user.role,
        createdAt: /* @__PURE__ */ new Date()
      },
      ...response
    });
    if (responseValue[0].CloverErrorResponse) {
      await _chunkJI2CNXVDjs.createQuoteDebug.call(void 0, {
        meta: {
          email: user.email,
          role: user.role,
          createdAt: /* @__PURE__ */ new Date(),
          errorResponse: responseValue[0]
        },
        ...response
      });
    }
    return responseValue;
  } catch (error) {
    return [null, error.message];
  }
};
var SubmitFullQuoteForm = async (data, createQuote) => {
  try {
    const {
      DeclarationQuestions,
      Exemption,
      Liability,
      Property,
      BrokerFees
    } = data;
    const { BrokerFee, ...rest } = createQuote;
    const response = {
      "LibCommission": Liability || 0,
      "PropCommission": Property || 0,
      "Hadanyinsurdeclinedorcancelled": GiveN_OR_Y(DeclarationQuestions[0].answer),
      "ConvictedCriminalOffence": GiveN_OR_Y(DeclarationQuestions[1].answer),
      "BankruptorInsolvencyBusiness": GiveN_OR_Y(DeclarationQuestions[2].answer),
      "Sufferedlossordamagecovbyinspol": GiveN_OR_Y(DeclarationQuestions[3].answer),
      "NSWstampDutyExemption": GiveN_OR_Y(Exemption[0].answer),
      "BrokerFee": BrokerFees,
      ...rest
    };
    const [access] = await GETQuoteToken();
    const responseValue = await SubmitFullQuote(_optionalChain([access, 'optionalAccess', _109 => _109.access_token]), response);
    return responseValue;
  } catch (error) {
    return [null, error.message];
  }
};

// src/api/v1/forms/insurance/insuranceService.ts
var EX = 30 * 24 * 60 * 60;
var InsuranceStatusService = async (user, query) => {
  try {
    let isStatusExist;
    isStatusExist = query.id ? await _chunkVXTEHXEPjs.redis.get(`InsuranceFormStatus:${query.id}:${user.email}`) : await _chunkVXTEHXEPjs.redis.get(`InsuranceFormStatus:${user.email}`);
    if (query.id && !isStatusExist) {
      const data = await _chunkJI2CNXVDjs.policiesGet.call(void 0, query.id, user.email);
      if (!data) {
        return _chunkGDC63SRXjs.ServiceResponse.failure(
          "No Data Found",
          null,
          _httpstatuscodes.StatusCodes.NOT_FOUND
        );
      }
      if (data) {
        isStatusExist = data.status;
        await _chunkVXTEHXEPjs.redis.set(`InsuranceFormStatus:${query.id}:${user.email}`, JSON.stringify(isStatusExist), {
          EX
        });
        await _chunkVXTEHXEPjs.redis.set(`InsuranceForm:${query.id}:${user.email}`, JSON.stringify(data.data), {
          EX
        });
      }
    }
    const status = isStatusExist ? typeof isStatusExist === "string" ? JSON.parse(isStatusExist) : isStatusExist : InsuranceFormStatusDefault;
    const routes = (data) => {
      return data.reduce((queries, item) => {
        if (!item.disabled || item.title === "Premium Summary" || item.title === "Quote Summary") {
          queries.push(item.query);
        }
        if (item.children) {
          queries.push(...routes(item.children));
        }
        return queries;
      }, []);
    };
    return _chunkGDC63SRXjs.ServiceResponse.success("Insurance Status", {
      status,
      routes: routes(status)
    }, _httpstatuscodes.StatusCodes.OK);
  } catch (error) {
    const errorMessage = `InsuranceStatusService: $${error.message}`;
    logger.error(errorMessage);
    return _chunkGDC63SRXjs.ServiceResponse.failure(
      "An error occurred while Fetching Insurance Form Status",
      null,
      _httpstatuscodes.StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
};
var InsuranceFormGetService = async (user, query) => {
  try {
    const formType = query.FormType;
    const isExist = query.id ? await _chunkVXTEHXEPjs.redis.get(`InsuranceForm:${query.id}:${user.email}`) : await _chunkVXTEHXEPjs.redis.get(`InsuranceForm:${user.email}`);
    const meta = await MetaData(formType, user, query.id);
    const data = isExist && JSON.parse(isExist)[formType] ? JSON.parse(isExist)[formType] : InsuranceFormDefaultValues[formType];
    return _chunkGDC63SRXjs.ServiceResponse.success("Insurance Status", { ...data, meta }, _httpstatuscodes.StatusCodes.OK);
  } catch (error) {
    const errorMessage = `InsuranceFormGetService: $${error.message}`;
    logger.error(errorMessage);
    return _chunkGDC63SRXjs.ServiceResponse.failure(
      `An error occurred while fetching Form Data`,
      null,
      _httpstatuscodes.StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
};
var InsuranceFormSaveService = async (user, body, query) => {
  try {
    const isExist = await _chunkVXTEHXEPjs.redis.get(`InsuranceForm:${user.email}`);
    const formStatus = await _chunkVXTEHXEPjs.redis.get(`InsuranceFormStatus:${user.email}`);
    const formType = query.FormType;
    const data = body;
    let currentData = isExist ? JSON.parse(isExist) : {};
    let status = formStatus ? JSON.parse(formStatus) : structuredClone(InsuranceFormStatusDefault);
    if (!isExist && formType !== "coverage-selection") {
      return _chunkGDC63SRXjs.ServiceResponse.failure(
        "Complete the coverage selection form first",
        null,
        _httpstatuscodes.StatusCodes.BAD_REQUEST
      );
    }
    if (formType === "coverage-selection") {
      const coverage = data.Coverages;
      const statusUpdate = InsuranceFormStatus(ArrangeCoverages(coverage));
      status[1].children = statusUpdate;
      if (currentData) {
        const allFields = coverage.map((item) => {
          return _chunk4QGOQSDIjs.COVERAGESROUTES[item];
        });
        if (currentData["premium-summary"] || status[2]) {
          status[2].disabled = true;
          status[2].status = "pending";
          delete currentData["premium-summary"];
        }
        if (currentData["quote-summary"] || status[3]) {
          status[3].disabled = true;
          status[3].status = "pending";
          delete currentData["quote-summary"];
        }
        Object.keys(currentData).forEach((key) => {
          if (key === "property-details" && !allFields.includes("business-and-contents")) {
            delete currentData["property-details"];
          }
          if (!allFields.includes(key) && key !== "coverage-selection" && key !== "property-details" && key !== "form-id") {
            delete currentData[key];
          } else {
            updateInsuranceStatus(status, key, "completed");
          }
        });
      }
    }
    if (Object.values(_chunk4QGOQSDIjs.COVERAGESROUTES).includes(formType)) {
      if (currentData["further-and-endorsements-questions"]) {
        status[1].children = status[1].children.map((item) => {
          if (item.query === "further-and-endorsements-questions") {
            item.status = "pending";
          }
          return item;
        });
        delete currentData["further-and-endorsements-questions"];
      }
      if (currentData["premium-summary"]) {
        status[2].disabled = true;
        status[2].status = "pending";
        delete currentData["premium-summary"];
      }
      if (currentData["quote-summary"]) {
        status[3].disabled = true;
        status[3].status = "pending";
        delete currentData["quote-summary"];
      }
    }
    const value = structuredClone(updateInsuranceStatus(status, formType, "completed"));
    await _chunkVXTEHXEPjs.redis.set(`InsuranceFormStatus:${user.email}`, JSON.stringify(value), {
      EX
    });
    currentData[formType] = data;
    await _chunkVXTEHXEPjs.redis.set(`InsuranceForm:${user.email}`, JSON.stringify(currentData), {
      EX
    });
    return _chunkGDC63SRXjs.ServiceResponse.success(`${CoveragesFormName[formType]} Saved Successfully`, null, _httpstatuscodes.StatusCodes.OK);
  } catch (error) {
    const errorMessage = `InsuranceFormSaveService: $${error.message}`;
    logger.error(errorMessage);
    return _chunkGDC63SRXjs.ServiceResponse.failure(
      `An error occurred while adding ${CoveragesFormName[query.FormType]} Data`,
      null,
      _httpstatuscodes.StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
};
var InsuranceFormResetService = async (user) => {
  try {
    await _chunkVXTEHXEPjs.redis.del(`InsuranceForm:${user.email}`);
    await _chunkVXTEHXEPjs.redis.del(`InsuranceFormStatus:${user.email}`);
    return _chunkGDC63SRXjs.ServiceResponse.success("Insurance Form Reset Successfully", null, _httpstatuscodes.StatusCodes.OK);
  } catch (error) {
    const errorMessage = `InsuranceFormSave: $${error.message}`;
    logger.error(errorMessage);
    return _chunkGDC63SRXjs.ServiceResponse.failure(
      `An error occurred while reseting the form Data`,
      null,
      _httpstatuscodes.StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
};
var InsuranceFormCreateQuoteService = async (user, body, query) => {
  try {
    const isExist = await _chunkVXTEHXEPjs.redis.get(`InsuranceForm:${user.email}`);
    const formStatus = await _chunkVXTEHXEPjs.redis.get(`InsuranceFormStatus:${user.email}`);
    const formType = query.FormType;
    const data = body;
    let currentData = isExist ? JSON.parse(isExist) : {};
    let status = formStatus ? JSON.parse(formStatus) : structuredClone(InsuranceFormStatusDefault);
    if (!isExist) {
      return _chunkGDC63SRXjs.ServiceResponse.failure(
        "Complete the coverage selection form first",
        null,
        _httpstatuscodes.StatusCodes.BAD_REQUEST
      );
    }
    currentData[formType] = data;
    await _chunkVXTEHXEPjs.redis.set(`InsuranceForm:${user.email}`, JSON.stringify(currentData), {
      EX
    });
    const [isSubmit, error] = await SubmitCreateQuoteForm(currentData, user);
    if (error) {
      return _chunkGDC63SRXjs.ServiceResponse.failure(
        error,
        null,
        _httpstatuscodes.StatusCodes.BAD_REQUEST
      );
    }
    if (isSubmit.CloverErrorResponse) {
      return _chunkGDC63SRXjs.ServiceResponse.failure(
        isSubmit.ErrorMessage || "An error occurred while creating quote. Please recheck the form",
        { issue: isSubmit.CloverErrorResponse.reasons || [] },
        _httpstatuscodes.StatusCodes.BAD_REQUEST
      );
    }
    await _chunkJI2CNXVDjs.createQuoteDebug.call(void 0, {
      meta: {
        email: user.email,
        createdAt: /* @__PURE__ */ new Date(),
        role: user.role
      },
      ...isSubmit
    });
    currentData["create-quote"] = isSubmit;
    delete currentData["premium-summary"];
    delete currentData["block-quote"];
    let value = structuredClone(updateInsuranceStatus(status, formType, "completed"));
    value[2].status = "pending";
    value[2].disabled = false;
    value[3].disabled = true;
    await _chunkVXTEHXEPjs.redis.set(`InsuranceFormStatus:${user.email}`, JSON.stringify(value), {
      EX
    });
    if (currentData["form-id"]) {
      await _chunkJI2CNXVDjs.policiesUpdateCreateQuote.call(void 0, currentData["form-id"], {
        data: currentData,
        status: value
      });
    } else {
      const id = await _chunkJI2CNXVDjs.policies.call(void 0, {
        meta: {
          email: user.email,
          name: user.name,
          role: user.role,
          createdAt: /* @__PURE__ */ new Date()
        },
        data: currentData,
        status: value
      });
      currentData["form-id"] = id;
    }
    await _chunkVXTEHXEPjs.redis.set(`InsuranceForm:${user.email}`, JSON.stringify(currentData), {
      EX
    });
    await _chunkVXTEHXEPjs.redis.del(`Quotes:${user.email}`);
    await _chunkVXTEHXEPjs.redis.del("Quotes:All");
    return _chunkGDC63SRXjs.ServiceResponse.success(`Further And Endorsements Questions Saved Successfully`, null, _httpstatuscodes.StatusCodes.OK);
  } catch (error) {
    const errorMessage = `InsuranceFormCreateQuoteService: $${error.message}`;
    logger.error(errorMessage);
    return _chunkGDC63SRXjs.ServiceResponse.failure(
      `An error occurred while adding Further And Endorsements Questions Data`,
      null,
      _httpstatuscodes.StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
};
var InsuranceFormBlockQuoteService = async (user, body, query) => {
  try {
    const isExist = await _chunkVXTEHXEPjs.redis.get(`InsuranceForm:${user.email}`);
    const formStatus = await _chunkVXTEHXEPjs.redis.get(`InsuranceFormStatus:${user.email}`);
    const formType = query.FormType;
    const data = body;
    let currentData = isExist ? JSON.parse(isExist) : {};
    let status = formStatus ? JSON.parse(formStatus) : structuredClone(InsuranceFormStatusDefault);
    if (!isExist) {
      return _chunkGDC63SRXjs.ServiceResponse.failure(
        "Complete the coverage selection form first",
        null,
        _httpstatuscodes.StatusCodes.BAD_REQUEST
      );
    }
    currentData[formType] = data;
    await _chunkVXTEHXEPjs.redis.set(`InsuranceForm:${user.email}`, JSON.stringify(currentData), {
      EX
    });
    const [access] = await GETQuoteToken();
    const [isSubmit, error] = await SubmitBlockQuote(_optionalChain([access, 'optionalAccess', _110 => _110.access_token]), currentData["create-quote"].ProposalNo);
    console.log("block", isSubmit, error);
    if (error) {
      return _chunkGDC63SRXjs.ServiceResponse.failure(
        error,
        null,
        _httpstatuscodes.StatusCodes.BAD_REQUEST
      );
    }
    if (isSubmit.CloverErrorResponse) {
      return _chunkGDC63SRXjs.ServiceResponse.failure(
        isSubmit.ErrorMessage || "An error occurred while creating quote. Please recheck the form",
        { issue: isSubmit.CloverErrorResponse.reasons || [] },
        _httpstatuscodes.StatusCodes.BAD_REQUEST
      );
    }
    currentData["block-quote"] = isSubmit;
    await _chunkVXTEHXEPjs.redis.set(`InsuranceForm:${user.email}`, JSON.stringify(currentData), {
      EX
    });
    let value = structuredClone(updateInsuranceStatus(status, formType, "completed"));
    value[3].disabled = false;
    value[2].disabled = true;
    await _chunkVXTEHXEPjs.redis.set(`InsuranceFormStatus:${user.email}`, JSON.stringify(value), {
      EX
    });
    value[2].disabled = false;
    await _chunkJI2CNXVDjs.policiesUpdateBlockQuote.call(void 0, currentData["form-id"], currentData["premium-summary"], isSubmit, value);
    await _chunkVXTEHXEPjs.redis.del(`InsuranceForm:${currentData["form-id"]}:${user.email}`);
    await _chunkVXTEHXEPjs.redis.del(`InsuranceFormStatus:${currentData["form-id"]}:${user.email}`);
    await _chunkVXTEHXEPjs.redis.del(`Quotes:${user.email}`);
    await _chunkVXTEHXEPjs.redis.del(`Quotes:All`);
    await _chunkVXTEHXEPjs.redis.del(`Block-Quotes:${user.email}`);
    await _chunkVXTEHXEPjs.redis.del("Block-Quotes:All");
    return _chunkGDC63SRXjs.ServiceResponse.success(`Premium Summary Saved Successfully`, null, _httpstatuscodes.StatusCodes.OK);
  } catch (error) {
    const errorMessage = `InsuranceFormBlockQuoteService: $${error.message}`;
    logger.error(errorMessage);
    return _chunkGDC63SRXjs.ServiceResponse.failure(
      `An error occurred while fetching Block Quote Data`,
      null,
      _httpstatuscodes.StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
};
var InsuranceFormFullQuoteService = async (user, body) => {
  try {
    const isExist = await _chunkVXTEHXEPjs.redis.get(`InsuranceForm:${user.email}`);
    const data = body;
    let currentData = isExist ? JSON.parse(isExist) : {};
    if (!isExist) {
      return _chunkGDC63SRXjs.ServiceResponse.failure(
        "Complete the coverage selection form first",
        null,
        _httpstatuscodes.StatusCodes.BAD_REQUEST
      );
    }
    const [isSubmit, error] = await SubmitFullQuoteForm(data, currentData["create-quote"]);
    console.log("isSubmit", isSubmit, error);
    if (error) {
      return _chunkGDC63SRXjs.ServiceResponse.failure(
        error,
        null,
        _httpstatuscodes.StatusCodes.BAD_REQUEST
      );
    }
    if (isSubmit.CloverErrorResponse) {
      return _chunkGDC63SRXjs.ServiceResponse.failure(
        isSubmit.ErrorMessage || "An error occurred while creating quote. Please recheck the form",
        { issue: isSubmit.CloverErrorResponse.reasons || [] },
        _httpstatuscodes.StatusCodes.BAD_REQUEST
      );
    }
    const quote = isSubmit;
    const { Coverages: Coverages2 } = currentData["coverage-selection"];
    let result = {};
    if (!quote) {
      result = {};
    }
    result = {
      AgentFee: quote.AgentFees,
      AgentFeeGST: quote.GSTAgentFee,
      BrokerFee: quote.BrokerFee,
      BrokerFeeGST: quote.GSTBrokerFee,
      isFullQuote: true,
      BrokerCommission: quote.BrokerCommission,
      GSTBrokerCommission: quote.GSTBrokerCommission,
      isLiability: [
        "Business Liability",
        "Business Interruption",
        "Portable Business Content"
      ].some((item) => Coverages2.includes(item)),
      isProperty: [
        "Business Building and Contents",
        "Equipment Breakdown",
        "Theft, Money and Glass"
      ].some((item) => Coverages2.includes(item)),
      DuePremium: quote.DuePremium,
      quote: [
        ...quote.PolicyLobList[0].PolicyRiskList[0].PolicyCoverageList.map((item) => {
          return {
            title: _chunk4QGOQSDIjs.FORMTYPES_WITH_VALUE[item.ProductElementCode],
            premium: item.StandardNetPremium,
            gst: item.GST,
            emergencyServiceLevy: item.EmergencyServiceLevy,
            stampDuty: item.StampDuty
          };
        }),
        {
          title: "Subtotal",
          premium: quote.PolicyLobList[0].PolicyRiskList[0].PolicyCoverageList.reduce((acc, item) => acc + item.StandardNetPremium, 0),
          gst: quote.PolicyLobList[0].PolicyRiskList[0].PolicyCoverageList.reduce((acc, item) => acc + item.GST, 0),
          emergencyServiceLevy: quote.PolicyLobList[0].PolicyRiskList[0].PolicyCoverageList.reduce((acc, item) => acc + item.EmergencyServiceLevy, 0),
          stampDuty: quote.PolicyLobList[0].PolicyRiskList[0].PolicyCoverageList.reduce((acc, item) => acc + item.StampDuty, 0)
        }
      ]
    };
    return _chunkGDC63SRXjs.ServiceResponse.success(`Full Quote Generated Successfully`, result, _httpstatuscodes.StatusCodes.OK);
  } catch (error) {
    const errorMessage = `InsuranceFormFullQuoteService: $${error.message}`;
    logger.error(errorMessage);
    return _chunkGDC63SRXjs.ServiceResponse.failure(
      `An error occurred while fetching Full Quote Data`,
      null,
      _httpstatuscodes.StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
};
var InsuranceFormClone = async (user, query) => {
  try {
    const id = query.id;
    const data = await _chunkJI2CNXVDjs.policiesGet.call(void 0, id, user.email);
    if (!data) {
      return _chunkGDC63SRXjs.ServiceResponse.failure(
        "No Data Found",
        null,
        _httpstatuscodes.StatusCodes.NOT_FOUND
      );
    }
    await _chunkVXTEHXEPjs.redis.set(`InsuranceForm:${user.email}`, JSON.stringify(data.data), {
      EX
    });
    await _chunkVXTEHXEPjs.redis.set(`InsuranceFormStatus:${user.email}`, JSON.stringify(data.status), {
      EX
    });
    return _chunkGDC63SRXjs.ServiceResponse.success("Insurance Form Cloned Successfully", null, _httpstatuscodes.StatusCodes.CREATED);
  } catch (error) {
    const errorMessage = `InsuranceFormClone: $${error.message}`;
    logger.error(errorMessage);
    return _chunkGDC63SRXjs.ServiceResponse.failure(
      `An error occurred while fetching Form Data`,
      null,
      _httpstatuscodes.StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
};
var InsuranceFormDiscard = async (user, query) => {
  try {
    const id = query.id;
    await _chunkJI2CNXVDjs.policiesDelete.call(void 0, id, user.email);
    await _chunkVXTEHXEPjs.redis.del(`Quotes:${user.email}`);
    await _chunkVXTEHXEPjs.redis.del(`Quotes:All`);
    await _chunkVXTEHXEPjs.redis.del(`InsuranceForm:${id}:${user.email}`);
    await _chunkVXTEHXEPjs.redis.del(`InsuranceFormStatus:${id}:${user.email}`);
    return _chunkGDC63SRXjs.ServiceResponse.success("Insurance Form Discard Successfully", null, _httpstatuscodes.StatusCodes.OK);
  } catch (error) {
    const errorMessage = `InsuranceFormClone: $${error.message}`;
    logger.error(errorMessage);
    return _chunkGDC63SRXjs.ServiceResponse.failure(
      `An error occurred while fetching Form Data`,
      null,
      _httpstatuscodes.StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
};

// src/api/v1/forms/insurance/insuranceController.ts
var InsuranceController = (_class2 = class {constructor() { _class2.prototype.__init14.call(this);_class2.prototype.__init15.call(this);_class2.prototype.__init16.call(this);_class2.prototype.__init17.call(this);_class2.prototype.__init18.call(this);_class2.prototype.__init19.call(this);_class2.prototype.__init20.call(this);_class2.prototype.__init21.call(this); }
  __init14() {this.status = async (req, res) => {
    const serviceResponse = await InsuranceStatusService(JSON.parse(req.headers["x-requested-user"]), req.query);
    return _chunkE5IYCE7Tjs.handleServiceResponse.call(void 0, serviceResponse, res);
  }}
  __init15() {this.insuranceForm = async (req, res) => {
    let serviceResponse;
    if (req.method === "GET") {
      serviceResponse = await InsuranceFormGetService(JSON.parse(req.headers["x-requested-user"]), req.query);
    } else {
      serviceResponse = await InsuranceFormSaveService(JSON.parse(req.headers["x-requested-user"]), req.body, req.query);
    }
    return _chunkE5IYCE7Tjs.handleServiceResponse.call(void 0, serviceResponse, res);
  }}
  __init16() {this.createQuote = async (req, res) => {
    const serviceResponse = await InsuranceFormCreateQuoteService(JSON.parse(req.headers["x-requested-user"]), req.body, req.query);
    return _chunkE5IYCE7Tjs.handleServiceResponse.call(void 0, serviceResponse, res);
  }}
  __init17() {this.resetForm = async (req, res) => {
    const serviceResponse = await InsuranceFormResetService(JSON.parse(req.headers["x-requested-user"]));
    return _chunkE5IYCE7Tjs.handleServiceResponse.call(void 0, serviceResponse, res);
  }}
  __init18() {this.fullQuote = async (req, res) => {
    const serviceResponse = await InsuranceFormFullQuoteService(JSON.parse(req.headers["x-requested-user"]), req.body);
    return _chunkE5IYCE7Tjs.handleServiceResponse.call(void 0, serviceResponse, res);
  }}
  __init19() {this.blockQuote = async (req, res) => {
    const serviceResponse = await InsuranceFormBlockQuoteService(JSON.parse(req.headers["x-requested-user"]), req.body, req.query);
    return _chunkE5IYCE7Tjs.handleServiceResponse.call(void 0, serviceResponse, res);
  }}
  __init20() {this.clone = async (req, res) => {
    const serviceResponse = await InsuranceFormClone(JSON.parse(req.headers["x-requested-user"]), req.query);
    return _chunkE5IYCE7Tjs.handleServiceResponse.call(void 0, serviceResponse, res);
  }}
  __init21() {this.discard = async (req, res) => {
    const serviceResponse = await InsuranceFormDiscard(JSON.parse(req.headers["x-requested-user"]), req.query);
    return _chunkE5IYCE7Tjs.handleServiceResponse.call(void 0, serviceResponse, res);
  }}
}, _class2);
var insuranceController = new InsuranceController();

// src/api/v1/forms/insurance/insuranceRouter.ts
var insuranceRegistry = new (0, _zodtoopenapi.OpenAPIRegistry)();
var insuranceRouter = _express2.default.Router();
insuranceRouter.get("/status", _chunkE5IYCE7Tjs.validateRequest.call(void 0, _chunkL6X3WCB6js.InsuranceFormStatusSchema), insuranceController.status);
insuranceRouter.post("/save", _chunkE5IYCE7Tjs.validateRequest.call(void 0, _chunkL6X3WCB6js.InsuranceFormPostSchema), insuranceController.insuranceForm);
insuranceRouter.get("/get", _chunkE5IYCE7Tjs.validateRequest.call(void 0, _chunkL6X3WCB6js.InsuranceFormGetSchema), insuranceController.insuranceForm);
insuranceRouter.get("/reset", insuranceController.resetForm);
insuranceRouter.post("/createquote", _chunkE5IYCE7Tjs.validateRequest.call(void 0, _chunkL6X3WCB6js.InsuranceFormCreateQuote), insuranceController.createQuote);
insuranceRouter.post("/fullquote", _chunkE5IYCE7Tjs.validateRequest.call(void 0, _chunkL6X3WCB6js.InsuranceFormFullQuote), insuranceController.fullQuote);
insuranceRouter.post("/blockquote", _chunkE5IYCE7Tjs.validateRequest.call(void 0, _chunkL6X3WCB6js.InsuranceFormFullQuote), insuranceController.blockQuote);
insuranceRouter.get("/clone", _chunkE5IYCE7Tjs.validateRequest.call(void 0, _chunkL6X3WCB6js.InsuranceFormCloneModel), insuranceController.clone);
insuranceRouter.delete("/discard", _chunkE5IYCE7Tjs.validateRequest.call(void 0, _chunkL6X3WCB6js.InsuranceFormDiscardModel), insuranceController.discard);

// src/api/v1/forms/formsRouter.ts
var formsRouter = _express2.default.Router();
var formsRegistry = [
  insuranceRegistry
];
formsRouter.use("/insurance", insuranceRouter);

// src/api/v1/internal/internalRouter.ts


// src/api/v1/internal/settings/settingsRouter.ts



// src/api/v1/internal/settings/settingsService.ts

var _bcrypt = require('bcrypt');
var SettingsCreateUserService = async (user, body) => {
  try {
    const isUserExist2 = await _chunkYCOP6BXVjs.userSignupRedisRepository.fetch(body.email);
    if (isUserExist2.email) {
      await _chunkYCOP6BXVjs.userSignupRedisRepository.remove(body.email);
    }
    const userAccount = await _chunkJDA4FSDTjs.findUser.call(void 0, body.email);
    if (userAccount) {
      return _chunkGDC63SRXjs.ServiceResponse.failure(
        "User already exists",
        null,
        _httpstatuscodes.StatusCodes.UNAUTHORIZED
      );
    }
    if (user.role === "Admin" && body.role === "Admin") {
      return _chunkGDC63SRXjs.ServiceResponse.failure(
        "Admin can't create another admin",
        null,
        _httpstatuscodes.StatusCodes.UNAUTHORIZED
      );
    }
    const user_password = _chunkX5VRHMWCjs.generatePassword.call(void 0, 10);
    const salt = await _bcrypt.genSalt.call(void 0, 10);
    const hashedPassword = await _bcrypt.hash.call(void 0, user_password, salt);
    await _chunkJDA4FSDTjs.createUser.call(void 0, {
      ...body,
      isEmailVerified: true,
      password: hashedPassword,
      isUserVerified: true
    });
    await _chunkVXTEHXEPjs.redis.del(`Stats:Users:${body.role}`);
    return _chunkGDC63SRXjs.ServiceResponse.success(`Successfully ${body.role} created`, null, _httpstatuscodes.StatusCodes.CREATED);
  } catch (error) {
    const errorMessage = `SettingsCreateUserService: $${error.message}`;
    logger.error(errorMessage);
    return _chunkGDC63SRXjs.ServiceResponse.failure(
      "An error occurred while creating users.",
      null,
      _httpstatuscodes.StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
};

// src/api/v1/internal/settings/settingsController.ts
var SettingsController = (_class3 = class {constructor() { _class3.prototype.__init22.call(this); }
  __init22() {this.createUser = async (req, res) => {
    const serviceResponse = await SettingsCreateUserService(JSON.parse(req.headers["x-requested-user"]), req.body);
    return _chunkE5IYCE7Tjs.handleServiceResponse.call(void 0, serviceResponse, res);
  }}
}, _class3);
var settingsController = new SettingsController();

// src/api/v1/internal/settings/settingsRouter.ts
var settingsRegistry = new (0, _zodtoopenapi.OpenAPIRegistry)();
var settingsRouter = _express2.default.Router();
settingsRouter.post("/user/create", _chunkE5IYCE7Tjs.validateRequest.call(void 0, _chunkMVSBMO72js.CreateUserSchema), settingsController.createUser);

// src/api/v1/internal/stats/statsRouter.ts



// src/api/v1/internal/stats/statsService.ts

var StatsGetUserService = async (query) => {
  try {
    const page = Number(query.page || "1");
    const role = query.role;
    const email = query.email;
    const limit = 10;
    if (email) {
      const isUserWithEmailExist = await _chunkVXTEHXEPjs.redis.get(`Stats:Users:${query.role}:${email}`);
      let data = isUserWithEmailExist ? JSON.parse(isUserWithEmailExist) : {};
      if (isUserWithEmailExist) {
        return _chunkGDC63SRXjs.ServiceResponse.success(`Successfully Get ${query.role}`, {
          "totalCounts": 1,
          "totalPages": 1,
          "currentPage": 1,
          "data": data ? data : []
        }, _httpstatuscodes.StatusCodes.OK);
      }
      const user = await _chunkJDA4FSDTjs.getUserByRoleFilterUsingEmail.call(void 0, query.role, email);
      await _chunkVXTEHXEPjs.redis.set(`Stats:Users:${query.role}:${email}`, JSON.stringify(user), {
        EX: 2 * 24 * 60 * 60
      });
      return _chunkGDC63SRXjs.ServiceResponse.success(`Successfully Get ${query.role}`, {
        "totalCounts": 1,
        "totalPages": 1,
        "currentPage": 1,
        "data": user ? user : []
      }, _httpstatuscodes.StatusCodes.OK);
    }
    const isUsersExist = await _chunkVXTEHXEPjs.redis.get(`Stats:Users:${query.role}`);
    let usersData = isUsersExist ? JSON.parse(isUsersExist) : {};
    const all_pages = usersData["totalPages"];
    const all_data = usersData["data"] ? usersData["data"][page] : null;
    if (isUsersExist && all_data && all_pages >= page) {
      return _chunkGDC63SRXjs.ServiceResponse.success(`Successfully Get ${query.role}`, {
        "totalCounts": usersData["totalCounts"],
        "totalPages": usersData["totalPages"],
        "currentPage": page,
        "data": usersData["data"][page]
      }, _httpstatuscodes.StatusCodes.OK);
    }
    if (isUsersExist && all_pages < page) {
      return _chunkGDC63SRXjs.ServiceResponse.success(`Successfully Get ${query.role}`, {
        "totalCounts": usersData["totalCounts"],
        "totalPages": usersData["totalPages"],
        "currentPage": page,
        "data": []
      }, _httpstatuscodes.StatusCodes.OK);
    }
    const total = await _chunkJDA4FSDTjs.userModel.countDocuments({ role });
    const totalPages = Math.ceil(total / limit);
    const all_users = totalPages < page ? [] : await _chunkJDA4FSDTjs.getUserByRole.call(void 0, query.role, page, limit);
    usersData["totalCounts"] = total;
    usersData["totalPages"] = totalPages;
    if (totalPages >= page) {
      usersData["data"] = { ...usersData["data"], [page]: all_users };
    }
    await _chunkVXTEHXEPjs.redis.set(`Stats:Users:${query.role}`, JSON.stringify(usersData), {
      EX: 30 * 24 * 60 * 60
    });
    return _chunkGDC63SRXjs.ServiceResponse.success(`Successfully Get ${query.role}`, {
      "totalCounts": usersData["totalCounts"],
      "totalPages": usersData["totalPages"],
      "currentPage": page,
      "data": all_users
    }, _httpstatuscodes.StatusCodes.OK);
  } catch (error) {
    const errorMessage = `StatsGetUserService: $${error.message}`;
    logger.error(errorMessage);
    return _chunkGDC63SRXjs.ServiceResponse.failure(
      "An error occurred while creating users.",
      null,
      _httpstatuscodes.StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
};

// src/api/v1/internal/stats/statsController.ts
var StatsController = (_class4 = class {constructor() { _class4.prototype.__init23.call(this); }
  __init23() {this.getUser = async (req, res) => {
    const serviceResponse = await StatsGetUserService(req.query);
    return _chunkE5IYCE7Tjs.handleServiceResponse.call(void 0, serviceResponse, res);
  }}
}, _class4);
var statsController = new StatsController();

// src/api/v1/internal/stats/statsRouter.ts
var statsRegistry = new (0, _zodtoopenapi.OpenAPIRegistry)();
var statsRouter = _express2.default.Router();
statsRouter.get("/users/get", _chunkE5IYCE7Tjs.validateRequest.call(void 0, _chunkSZZ53PIMjs.GetUserSchema), statsController.getUser);

// src/api/v1/internal/internalRouter.ts
var internalRouter = _express2.default.Router();
var internalRegistry = [
  settingsRegistry,
  statsRegistry
];
internalRouter.use(_chunkRHY4WX2Ajs.InternalMiddleware);
internalRouter.use("/settings", settingsRouter);
internalRouter.use("/stats", statsRouter);

// src/api/v1/payment/paymentRouter.ts



// src/api/v1/payment/paymentService.ts


// src/api/v1/payment/paymentRepository.ts
var SubmitIssueQuoteForm = async (block) => {
  try {
    const [access] = await GETQuoteToken();
    const responseValue = await SubmitIssueQuote(_optionalChain([access, 'optionalAccess', _111 => _111.access_token]), {
      Amount: String(block.DuePremium),
      ProposalNo: block.ProposalNo,
      RefNo: block.CarrierReferenceNumber,
      Name: block.BusinessName
    });
    console.log(responseValue);
    return responseValue;
  } catch (error) {
    return [null, error.message];
  }
};

// src/api/v1/payment/paymentService.ts
var { FRONTEND_DOMAIN } = _chunkU3Q25YHWjs.env;
var PaymentCreateService = async (user, body) => {
  try {
    const session = await _chunkXRNJ7TQOjs.stripe.checkout.sessions.create({
      line_items: [{
        price_data: {
          currency: "aud",
          product_data: {
            name: "Business Insurance"
          },
          unit_amount: Number(body.amount) * 100
        },
        quantity: 1
      }],
      mode: "payment",
      ui_mode: "embedded",
      customer_email: user.email,
      return_url: `${FRONTEND_DOMAIN}/dashboard/quotation/payment?session_id={CHECKOUT_SESSION_ID}`
    });
    return _chunkGDC63SRXjs.ServiceResponse.success("Successfully create payment link", { clientSecret: session.client_secret }, _httpstatuscodes.StatusCodes.CREATED);
  } catch (error) {
    const errorMessage = `PaymentCreateService: $${error.message}`;
    logger.error(errorMessage);
    return _chunkGDC63SRXjs.ServiceResponse.failure(
      "An error occurred while creating payment link.",
      null,
      _httpstatuscodes.StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
};
var PaymentStatusService = async (user, query) => {
  try {
    const isExist = await _chunkVXTEHXEPjs.redis.get(`InsuranceForm:${user.email}`);
    const formStatus = await _chunkVXTEHXEPjs.redis.get(`InsuranceFormStatus:${user.email}`);
    const isPaymentCompleted = await _chunkVXTEHXEPjs.redis.get(`InsurancePaymentCompleted:${user.email}:${query.id}`);
    if (isPaymentCompleted) {
      return _chunkGDC63SRXjs.ServiceResponse.failure(
        "Successfully get payment status",
        JSON.parse(isPaymentCompleted),
        _httpstatuscodes.StatusCodes.OK
      );
    }
    const session = await _chunkXRNJ7TQOjs.stripe.checkout.sessions.retrieve(query.id);
    if (!isExist || !formStatus) {
      return _chunkGDC63SRXjs.ServiceResponse.failure(
        "An error occurred while fetching payment status.",
        null,
        _httpstatuscodes.StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
    if (session.payment_status === "unpaid") {
      return _chunkGDC63SRXjs.ServiceResponse.failure(
        "Payment is not completed.",
        null,
        _httpstatuscodes.StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
    let currentData = JSON.parse(isExist);
    const block = currentData["block-quote"];
    const [isSubmit, error] = await SubmitIssueQuoteForm(block);
    if (error) {
      return _chunkGDC63SRXjs.ServiceResponse.failure(
        error,
        null,
        _httpstatuscodes.StatusCodes.BAD_REQUEST
      );
    }
    if (isSubmit.CloverErrorResponse) {
      return _chunkGDC63SRXjs.ServiceResponse.failure(
        "An error occurred while creating quote. Please recheck the form",
        null,
        _httpstatuscodes.StatusCodes.BAD_REQUEST
      );
    }
    currentData["quote-summary"] = isSubmit;
    await _chunkVXTEHXEPjs.redis.set(`InsuranceForm:${user.email}`, JSON.stringify(currentData), {
      EX: 30 * 24 * 60 * 60
    });
    await _chunkJI2CNXVDjs.policiesUpdateFullQuote.call(void 0, currentData["form-id"], isSubmit);
    await _chunkVXTEHXEPjs.redis.del(`InsuranceForm:${currentData["form-id"]}:${user.email}`);
    await _chunkVXTEHXEPjs.redis.del(`InsuranceFormStatus:${currentData["form-id"]}:${user.email}`);
    await _chunkVXTEHXEPjs.redis.del(`InsuranceFormStatus:${user.email}`);
    await _chunkVXTEHXEPjs.redis.del(`InsuranceForm:${user.email}`);
    await _chunkVXTEHXEPjs.redis.del(`Block-Quotes:${user.email}`);
    await _chunkVXTEHXEPjs.redis.del("Block-Quotes:All");
    await _chunkVXTEHXEPjs.redis.del(`Policies:${user.email}`);
    await _chunkVXTEHXEPjs.redis.del(`Policies:All`);
    const { PolicyNo, CarrierReferenceNumber } = isSubmit;
    const res = {
      payment: {
        status: session.status,
        payment_status: session.payment_status,
        customer_email: _optionalChain([session, 'access', _112 => _112.customer_details, 'optionalAccess', _113 => _113.email]),
        id: session.payment_intent,
        amount: session.amount_subtotal ? session.amount_subtotal / 100 : 0,
        time: /* @__PURE__ */ new Date()
      },
      policyNo: PolicyNo,
      refNo: CarrierReferenceNumber
    };
    await _chunkVXTEHXEPjs.redis.set(`InsurancePaymentCompleted:${user.email}:${query.id}`, JSON.stringify(res), {
      EX: 1 * 60 * 60
    });
    if (["Agent", "User"].includes(user.role)) {
      await _chunkVXTEHXEPjs.redis.del(`PoliciesRecords:${user.email}`);
    } else {
      await _chunkVXTEHXEPjs.redis.del(`PoliciesRecords`);
    }
    return _chunkGDC63SRXjs.ServiceResponse.success("Successfully get payment status", res, _httpstatuscodes.StatusCodes.CREATED);
  } catch (error) {
    const errorMessage = `PaymentStatusService: $${error.message}`;
    logger.error(errorMessage);
    return _chunkGDC63SRXjs.ServiceResponse.failure(
      "An error occurred while fetching payment status.",
      null,
      _httpstatuscodes.StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
};
var PaymentPeriodService = async (user, body) => {
  try {
    const isExist = await _chunkVXTEHXEPjs.redis.get(`InsuranceForm:${user.email}`);
    const formStatus = await _chunkVXTEHXEPjs.redis.get(`InsuranceFormStatus:${user.email}`);
    if (!isExist || !formStatus) {
      return _chunkGDC63SRXjs.ServiceResponse.failure(
        "An error occurred while creating monthly payment.",
        null,
        _httpstatuscodes.StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
    await _chunkVXTEHXEPjs.redis.del(`InsuranceFormStatus:${user.email}`);
    await _chunkVXTEHXEPjs.redis.del(`InsuranceForm:${user.email}`);
    return _chunkGDC63SRXjs.ServiceResponse.success("Successfully saved your request", null, _httpstatuscodes.StatusCodes.CREATED);
  } catch (error) {
    const errorMessage = `PaymentPeriodService: $${error.message}`;
    logger.error(errorMessage);
    return _chunkGDC63SRXjs.ServiceResponse.failure(
      "An error occurred while creating monthly payment.",
      null,
      _httpstatuscodes.StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
};

// src/api/v1/payment/paymentController.ts
var PaymentController = (_class5 = class {constructor() { _class5.prototype.__init24.call(this);_class5.prototype.__init25.call(this);_class5.prototype.__init26.call(this); }
  __init24() {this.create = async (req, res) => {
    const serviceResponse = await PaymentCreateService(JSON.parse(req.headers["x-requested-user"]), req.body);
    return _chunkE5IYCE7Tjs.handleServiceResponse.call(void 0, serviceResponse, res);
  }}
  __init25() {this.status = async (req, res) => {
    const serviceResponse = await PaymentStatusService(JSON.parse(req.headers["x-requested-user"]), req.query);
    return _chunkE5IYCE7Tjs.handleServiceResponse.call(void 0, serviceResponse, res);
  }}
  __init26() {this.period = async (req, res) => {
    const serviceResponse = await PaymentPeriodService(JSON.parse(req.headers["x-requested-user"]), req.body);
    return _chunkE5IYCE7Tjs.handleServiceResponse.call(void 0, serviceResponse, res);
  }}
}, _class5);
var paymentController = new PaymentController();

// src/api/v1/payment/paymentRouter.ts
var paymentRegistry = new (0, _zodtoopenapi.OpenAPIRegistry)();
var paymentRouter = _express2.default.Router();
paymentRouter.post("/create", _chunkE5IYCE7Tjs.validateRequest.call(void 0, _chunkMMEWGB5Ajs.PaymentCreateSchema), paymentController.create);
paymentRouter.get("/status", _chunkE5IYCE7Tjs.validateRequest.call(void 0, _chunkMMEWGB5Ajs.PaymentStatusSchema), paymentController.status);
paymentRouter.post("/period", _chunkE5IYCE7Tjs.validateRequest.call(void 0, _chunkMMEWGB5Ajs.PaymentPeriodSchema), paymentController.period);

// src/api/v1/policies/policiesRouter.ts



// src/api/v1/policies/policiesService.ts

var QuotedService = async (user, query) => {
  try {
    const page = Number(query.page || "1");
    const limit = 10;
    const name = query.name;
    const num = query.num;
    const effectiveAt = query.effectiveAt;
    const createdAt = query.createdAt;
    const userRole = user.role === "SuperAdmin";
    const queryValue = userRole ? {
      "data.quote-summary": { $exists: false },
      "data.block-quote": { $exists: false }
    } : {
      "meta.email": user.email,
      "data.quote-summary": { $exists: false },
      "data.block-quote": { $exists: false }
    };
    const totalFilteredCountQuery = await _chunkJI2CNXVDjs.filterPoliciesQuery.call(void 0, 
      queryValue,
      "quoted",
      {
        name,
        num,
        effectiveAt,
        createdAt
      }
    );
    if (name || num || effectiveAt || createdAt) {
      const totalFilteredCount = await _chunkJI2CNXVDjs.policiesModel.countDocuments(totalFilteredCountQuery);
      const totalPages2 = Math.ceil(totalFilteredCount / limit);
      const all_quotes2 = totalPages2 < page ? [] : await _chunkJI2CNXVDjs.quotedData.call(void 0, page, limit, totalFilteredCountQuery);
      return _chunkGDC63SRXjs.ServiceResponse.success(`Successfully Get Quotes`, {
        "totalCounts": totalFilteredCount,
        "totalPages": totalPages2,
        "currentPage": page,
        "data": all_quotes2
      }, _httpstatuscodes.StatusCodes.OK);
    }
    const quotesExist = userRole ? await _chunkVXTEHXEPjs.redis.get("Quotes:All") : await _chunkVXTEHXEPjs.redis.get(`Quotes:${user.email}`);
    let quotesData = quotesExist ? JSON.parse(quotesExist) : {};
    const all_pages = quotesData["totalPages"];
    const all_data = quotesData["data"] ? quotesData["data"][page] : null;
    if (quotesExist && all_data && all_pages >= page) {
      return _chunkGDC63SRXjs.ServiceResponse.success(`Successfully Get Quotes`, {
        "totalCounts": quotesData["totalCounts"],
        "totalPages": quotesData["totalPages"],
        "currentPage": page,
        "data": quotesData["data"][page]
      }, _httpstatuscodes.StatusCodes.OK);
    }
    if (quotesExist && all_pages < page) {
      return _chunkGDC63SRXjs.ServiceResponse.success(`Successfully Get Quotes`, {
        "totalCounts": quotesData["totalCounts"],
        "totalPages": quotesData["totalPages"],
        "currentPage": page,
        "data": []
      }, _httpstatuscodes.StatusCodes.OK);
    }
    const total = await _chunkJI2CNXVDjs.policiesModel.countDocuments(queryValue);
    const totalPages = Math.ceil(total / limit);
    const all_quotes = totalPages < page ? [] : await _chunkJI2CNXVDjs.quotedData.call(void 0, page, limit, totalFilteredCountQuery);
    quotesData["totalCounts"] = total;
    quotesData["totalPages"] = totalPages;
    if (totalPages >= page) {
      quotesData["data"] = { ...quotesData["data"], [page]: all_quotes };
    }
    if (userRole) {
      await _chunkVXTEHXEPjs.redis.set(`Quotes:All`, JSON.stringify(quotesData), {
        EX: 30 * 24 * 60 * 60
      });
    } else {
      await _chunkVXTEHXEPjs.redis.set(`Quotes:${user.email}`, JSON.stringify(quotesData), {
        EX: 30 * 24 * 60 * 60
      });
    }
    return _chunkGDC63SRXjs.ServiceResponse.success(`Successfully Get Quotes`, {
      "totalCounts": quotesData["totalCounts"],
      "totalPages": quotesData["totalPages"],
      "currentPage": page,
      "data": all_quotes
    }, _httpstatuscodes.StatusCodes.OK);
  } catch (error) {
    const errorMessage = `QuotedService: $${error.message}`;
    logger.error(errorMessage);
    return _chunkGDC63SRXjs.ServiceResponse.failure(
      "An error occurred while creating users.",
      null,
      _httpstatuscodes.StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
};
var BlockedService = async (user, query) => {
  try {
    const page = Number(query.page || "1");
    const limit = 10;
    const name = query.name;
    const num = query.num;
    const effectiveAt = query.effectiveAt;
    const createdAt = query.createdAt;
    const userRole = user.role === "SuperAdmin";
    const queryValue = userRole ? {
      "data.quote-summary": { $exists: false },
      "data.block-quote": { $exists: true }
    } : {
      "meta.email": user.email,
      "data.quote-summary": { $exists: false },
      "data.block-quote": { $exists: true }
    };
    const totalFilteredCountQuery = await _chunkJI2CNXVDjs.filterPoliciesQuery.call(void 0, 
      queryValue,
      "blocked",
      {
        name,
        num,
        effectiveAt,
        createdAt
      }
    );
    if (name || num || effectiveAt || createdAt) {
      const totalFilteredCount = await _chunkJI2CNXVDjs.policiesModel.countDocuments(totalFilteredCountQuery);
      const totalPages2 = Math.ceil(totalFilteredCount / limit);
      const all_quotes2 = totalPages2 < page ? [] : await _chunkJI2CNXVDjs.blockedData.call(void 0, page, limit, totalFilteredCountQuery);
      return _chunkGDC63SRXjs.ServiceResponse.success(`Successfully Get Blocked Quotes`, {
        "totalCounts": totalFilteredCount,
        "totalPages": totalPages2,
        "currentPage": page,
        "data": all_quotes2
      }, _httpstatuscodes.StatusCodes.OK);
    }
    const quotesExist = userRole ? await _chunkVXTEHXEPjs.redis.get("Block-Quotes:All") : await _chunkVXTEHXEPjs.redis.get(`Block-Quotes:${user.email}`);
    let quotesData = quotesExist ? JSON.parse(quotesExist) : {};
    const all_pages = quotesData["totalPages"];
    const all_data = quotesData["data"] ? quotesData["data"][page] : null;
    if (quotesExist && all_data && all_pages >= page) {
      return _chunkGDC63SRXjs.ServiceResponse.success(`Successfully Get Blocked Quotes`, {
        "totalCounts": quotesData["totalCounts"],
        "totalPages": quotesData["totalPages"],
        "currentPage": page,
        "data": quotesData["data"][page]
      }, _httpstatuscodes.StatusCodes.OK);
    }
    if (quotesExist && all_pages < page) {
      return _chunkGDC63SRXjs.ServiceResponse.success(`Successfully Get Blocked Quotes`, {
        "totalCounts": quotesData["totalCounts"],
        "totalPages": quotesData["totalPages"],
        "currentPage": page,
        "data": []
      }, _httpstatuscodes.StatusCodes.OK);
    }
    const total = await _chunkJI2CNXVDjs.policiesModel.countDocuments(queryValue);
    const totalPages = Math.ceil(total / limit);
    const all_quotes = totalPages < page ? [] : await _chunkJI2CNXVDjs.blockedData.call(void 0, page, limit, totalFilteredCountQuery);
    quotesData["totalCounts"] = total;
    quotesData["totalPages"] = totalPages;
    if (totalPages >= page) {
      quotesData["data"] = { ...quotesData["data"], [page]: all_quotes };
    }
    if (userRole) {
      await _chunkVXTEHXEPjs.redis.set(`Block-Quotes:All`, JSON.stringify(quotesData), {
        EX: 30 * 24 * 60 * 60
      });
    } else {
      await _chunkVXTEHXEPjs.redis.set(`Block-Quotes:${user.email}`, JSON.stringify(quotesData), {
        EX: 30 * 24 * 60 * 60
      });
    }
    return _chunkGDC63SRXjs.ServiceResponse.success(`Successfully Get Blocked Quotes`, {
      "totalCounts": quotesData["totalCounts"],
      "totalPages": quotesData["totalPages"],
      "currentPage": page,
      "data": all_quotes
    }, _httpstatuscodes.StatusCodes.OK);
  } catch (error) {
    const errorMessage = `BlockedService: $${error.message}`;
    logger.error(errorMessage);
    return _chunkGDC63SRXjs.ServiceResponse.failure(
      "An error occurred while creating users.",
      null,
      _httpstatuscodes.StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
};
var IssuedService = async (user, query) => {
  try {
    const page = Number(query.page || "1");
    const limit = 10;
    const name = query.name;
    const num = query.num;
    const effectiveAt = query.effectiveAt;
    const createdAt = query.createdAt;
    const userRole = user.role === "SuperAdmin";
    const queryValue = userRole ? {
      "data.quote-summary": { $exists: true }
    } : {
      "meta.email": user.email,
      "data.quote-summary": { $exists: true }
    };
    const totalFilteredCountQuery = await _chunkJI2CNXVDjs.filterPoliciesQuery.call(void 0, 
      queryValue,
      "issued",
      {
        name,
        num,
        effectiveAt,
        createdAt
      }
    );
    if (name || num || effectiveAt || createdAt) {
      const totalFilteredCount = await _chunkJI2CNXVDjs.policiesModel.countDocuments(totalFilteredCountQuery);
      const totalPages2 = Math.ceil(totalFilteredCount / limit);
      const all_quotes2 = totalPages2 < page ? [] : await _chunkJI2CNXVDjs.issuedData.call(void 0, page, limit, totalFilteredCountQuery);
      return _chunkGDC63SRXjs.ServiceResponse.success(`Successfully Get Policies`, {
        "totalCounts": totalFilteredCount,
        "totalPages": totalPages2,
        "currentPage": page,
        "data": all_quotes2
      }, _httpstatuscodes.StatusCodes.OK);
    }
    const quotesExist = userRole ? await _chunkVXTEHXEPjs.redis.get("Policies:All") : await _chunkVXTEHXEPjs.redis.get(`Policies:${user.email}`);
    let quotesData = quotesExist ? JSON.parse(quotesExist) : {};
    const all_pages = quotesData["totalPages"];
    const all_data = quotesData["data"] ? quotesData["data"][page] : null;
    if (quotesExist && all_data && all_pages >= page) {
      return _chunkGDC63SRXjs.ServiceResponse.success(`Successfully Get Policies`, {
        "totalCounts": quotesData["totalCounts"],
        "totalPages": quotesData["totalPages"],
        "currentPage": page,
        "data": quotesData["data"][page]
      }, _httpstatuscodes.StatusCodes.OK);
    }
    if (quotesExist && all_pages < page) {
      return _chunkGDC63SRXjs.ServiceResponse.success(`Successfully Get Policies`, {
        "totalCounts": quotesData["totalCounts"],
        "totalPages": quotesData["totalPages"],
        "currentPage": page,
        "data": []
      }, _httpstatuscodes.StatusCodes.OK);
    }
    const total = await _chunkJI2CNXVDjs.policiesModel.countDocuments(queryValue);
    const totalPages = Math.ceil(total / limit);
    const all_quotes = totalPages < page ? [] : await _chunkJI2CNXVDjs.issuedData.call(void 0, page, limit, totalFilteredCountQuery);
    quotesData["totalCounts"] = total;
    quotesData["totalPages"] = totalPages;
    if (totalPages >= page) {
      quotesData["data"] = { ...quotesData["data"], [page]: all_quotes };
    }
    if (userRole) {
      await _chunkVXTEHXEPjs.redis.set(`Policies:All`, JSON.stringify(quotesData), {
        EX: 30 * 24 * 60 * 60
      });
    } else {
      await _chunkVXTEHXEPjs.redis.set(`Policies:${user.email}`, JSON.stringify(quotesData), {
        EX: 30 * 24 * 60 * 60
      });
    }
    return _chunkGDC63SRXjs.ServiceResponse.success(`Successfully Get Policies`, {
      "totalCounts": quotesData["totalCounts"],
      "totalPages": quotesData["totalPages"],
      "currentPage": page,
      "data": all_quotes
    }, _httpstatuscodes.StatusCodes.OK);
  } catch (error) {
    const errorMessage = `IssuedService: $${error.message}`;
    logger.error(errorMessage);
    return _chunkGDC63SRXjs.ServiceResponse.failure(
      "An error occurred while creating users.",
      null,
      _httpstatuscodes.StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
};

// src/api/v1/policies/policiesController.ts
var PoliciesController = (_class6 = class {constructor() { _class6.prototype.__init27.call(this);_class6.prototype.__init28.call(this);_class6.prototype.__init29.call(this); }
  __init27() {this.quoted = async (req, res) => {
    const serviceResponse = await QuotedService(JSON.parse(req.headers["x-requested-user"]), req.query);
    return _chunkE5IYCE7Tjs.handleServiceResponse.call(void 0, serviceResponse, res);
  }}
  __init28() {this.blocked = async (req, res) => {
    const serviceResponse = await BlockedService(JSON.parse(req.headers["x-requested-user"]), req.query);
    return _chunkE5IYCE7Tjs.handleServiceResponse.call(void 0, serviceResponse, res);
  }}
  __init29() {this.issued = async (req, res) => {
    const serviceResponse = await IssuedService(JSON.parse(req.headers["x-requested-user"]), req.query);
    return _chunkE5IYCE7Tjs.handleServiceResponse.call(void 0, serviceResponse, res);
  }}
}, _class6);
var policiesController = new PoliciesController();

// src/api/v1/policies/policiesRouter.ts
var policiesRegistry = new (0, _zodtoopenapi.OpenAPIRegistry)();
var policiesRouter = _express2.default.Router();
policiesRouter.get("/quoted", _chunkE5IYCE7Tjs.validateRequest.call(void 0, _chunkNX24CH72js.QuotedModel), policiesController.quoted);
policiesRouter.get("/blocked", _chunkE5IYCE7Tjs.validateRequest.call(void 0, _chunkNX24CH72js.QuotedModel), policiesController.blocked);
policiesRouter.get("/issued", _chunkE5IYCE7Tjs.validateRequest.call(void 0, _chunkNX24CH72js.QuotedModel), policiesController.issued);

// src/api/v1/v1Router.ts
var v1Router = _express2.default.Router();
var v1Registry = [
  authRegistry,
  paymentRegistry,
  policiesRegistry,
  ...formsRegistry,
  ...internalRegistry
];
v1Router.use(_chunkH52BNYS6js.AuthMiddleware);
v1Router.use("/auth", authRouter);
v1Router.use("/forms", formsRouter);
v1Router.use("/internal", internalRouter);
v1Router.use("/payment", paymentRouter);
v1Router.use("/policies", policiesRouter);

// src/api-docs/openAPIDocumentGenerator.ts
function generateOpenAPIDocument() {
  const registry = new (0, _zodtoopenapi.OpenAPIRegistry)([_chunkQIPQVNW5js.healthCheckRegistry, ...v1Registry]);
  const generator = new (0, _zodtoopenapi.OpenApiGeneratorV3)(registry.definitions);
  return generator.generateDocument({
    openapi: "3.0.0",
    info: {
      version: "1.0.0",
      title: "Swagger API"
    },
    externalDocs: {
      description: "View the raw OpenAPI Specification in JSON format",
      url: "/swagger.json"
    }
  });
}

// src/api-docs/openAPIRouter.ts
var openAPIRouter = _express2.default.Router();
var openAPIDocument = generateOpenAPIDocument();
openAPIRouter.get("/swagger.json", (_req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.send(openAPIDocument);
});
openAPIRouter.use("/", _swaggeruiexpress2.default.serve, _swaggeruiexpress2.default.setup(openAPIDocument));

// src/server.ts
var logger = _pino.pino.call(void 0, { name: "server start" });
var app = _express2.default.call(void 0, );
app.set("trust proxy", true);
app.use(_express2.default.json());
app.use(_express2.default.urlencoded({ extended: true }));
app.use(_cors2.default.call(void 0, { origin: _chunkU3Q25YHWjs.env.CORS_ORIGIN, credentials: true }));
app.use(_helmet2.default.call(void 0, ));
app.use(_chunkPQNQEBHSjs.rateLimiter_default);
app.use(_chunkRKO6BLKOjs.requestLogger_default);
app.use("/health-check", _chunkQIPQVNW5js.healthCheckRouter);
app.use("/api/v1", v1Router);
app.use("/auth/verification", _chunkSBKGAB2Fjs.signupVerificationRouter);
if (_chunkU3Q25YHWjs.env.NODE_ENV === "development") {
  app.use(openAPIRouter);
}
app.use(_chunkDDBUW572js.errorHandler_default.call(void 0, ));

// src/api/v1/auth/authService.ts


var forgotCache = /* @__PURE__ */ new Map();
var sessionCache = /* @__PURE__ */ new Map();
var AuthSignUpService = async (req) => {
  try {
    const user = await _chunkJDA4FSDTjs.findUser.call(void 0, req.email);
    if (user) {
      return _chunkGDC63SRXjs.ServiceResponse.failure("User already exists", null, _httpstatuscodes.StatusCodes.UNAUTHORIZED);
    }
    const { password, ...rest } = req;
    const token = await _chunkCHP2GYIBjs.SignUpToken.call(void 0, "Encrypt", { email: rest.email });
    const salt = await _bcrypt.genSalt.call(void 0, 10);
    const hashedPassword = await _bcrypt.hash.call(void 0, password, salt);
    const preparedData = {
      email: req.email,
      // Email is the primary identifier
      name: req.name,
      phone: req.phone,
      role: req.role,
      address: req.address,
      ABN: req.ABN,
      isEmailVerified: false,
      // Default value
      password: hashedPassword,
      // Password will be hashed
      token: String(token),
      // Token as a string
      disabled: false
      // Include the disabled flag
    };
    await _chunkVXTEHXEPjs.redis.set("tests:key", "hello world");
    _chunkVXTEHXEPjs.redis.set(`Signup:${req.email}`, JSON.stringify(preparedData), {
      EX: 60 * 60
    });
    _chunk3FHKKDEGjs.emailQueue.add(
      {
        ...req,
        type: "Signup",
        token: String(token)
      },
      {
        removeOnComplete: true,
        attempts: 3,
        jobId: req.email
      }
    );
    return _chunkGDC63SRXjs.ServiceResponse.success("Successfully sent login link to your email", null, _httpstatuscodes.StatusCodes.CREATED);
  } catch (error) {
    logger.error(`AuthSignUpService: ${error.message}`);
    return _chunkGDC63SRXjs.ServiceResponse.failure("An error occurred while signing up users.", null, _httpstatuscodes.StatusCodes.INTERNAL_SERVER_ERROR);
  }
  ;
};
var AuthLoginService = async (req) => {
  try {
    const user = await _chunkJDA4FSDTjs.findUser.call(void 0, req.email);
    if (!user) {
      return _chunkGDC63SRXjs.ServiceResponse.failure("User not found", null, _httpstatuscodes.StatusCodes.NOT_FOUND);
    }
    if (user.disabled) {
      return _chunkGDC63SRXjs.ServiceResponse.failure("Your account is disabled! Please contact support", null, _httpstatuscodes.StatusCodes.UNAUTHORIZED);
    }
    if (user.role === "Agent" && !user.isUserVerified) {
      return _chunkGDC63SRXjs.ServiceResponse.failure("Your Agent account is not approved yet", null, _httpstatuscodes.StatusCodes.UNAUTHORIZED);
    }
    const isPasswordValid = await _bcrypt.compare.call(void 0, req.password, user.password);
    if (!isPasswordValid) {
      return _chunkGDC63SRXjs.ServiceResponse.failure("Invalid Password", null, _httpstatuscodes.StatusCodes.UNAUTHORIZED);
    }
    const value = {
      email: user.email,
      name: user.name,
      phone: user.phone,
      role: user.role,
      address: user.address,
      userId: user.userId,
      createdAt: user.createdAt
    };
    const newAccessToken = await _chunkCHP2GYIBjs.AccessToken.call(void 0, "Encrypt", { email: value.email });
    const newRefreshToken = await _chunkCHP2GYIBjs.RefreshToken.call(void 0, "Encrypt", { email: value.email });
    const session = {
      ...value,
      accessToken: String(newAccessToken),
      refreshToken: String(newRefreshToken),
      expiresIn: _chunk2QMC77YJjs.expireIn.call(void 0, 2)
    };
    sessionCache.set(req.email, session);
    return _chunkGDC63SRXjs.ServiceResponse.success("Successfully logged in", session, _httpstatuscodes.StatusCodes.CREATED);
  } catch (error) {
    logger.error(`AuthLoginService: ${error.message}`);
    return _chunkGDC63SRXjs.ServiceResponse.failure("An error occurred while logging in users.", null, _httpstatuscodes.StatusCodes.INTERNAL_SERVER_ERROR);
  }
};
var AuthLoginRefreshService = async (req) => {
  try {
    const isUserSessionExist = sessionCache.get(req.email);
    if (!isUserSessionExist || isUserSessionExist.refreshToken !== req.token) {
      return _chunkGDC63SRXjs.ServiceResponse.failure("User Doesn't Exist", null, _httpstatuscodes.StatusCodes.UNAUTHORIZED);
    }
    const { accessToken, refreshToken, ...user } = isUserSessionExist;
    const newAccessToken = await _chunkCHP2GYIBjs.AccessToken.call(void 0, "Encrypt", { email: user.email });
    const newRefreshToken = await _chunkCHP2GYIBjs.RefreshToken.call(void 0, "Encrypt", { email: user.email });
    const newSession = {
      ...user,
      accessToken: String(newAccessToken),
      refreshToken: String(newRefreshToken),
      expiresIn: _chunk2QMC77YJjs.expireIn.call(void 0, 2)
    };
    sessionCache.set(req.email, newSession);
    return _chunkGDC63SRXjs.ServiceResponse.success("Login successfully refreshed", newSession, _httpstatuscodes.StatusCodes.OK);
  } catch (error) {
    logger.error(`AuthLoginRefreshService: ${error.message}`);
    return _chunkGDC63SRXjs.ServiceResponse.failure("An error occurred while refreshing login of users.", null, _httpstatuscodes.StatusCodes.INTERNAL_SERVER_ERROR);
  }
};
var AuthForgotService = async (req) => {
  try {
    if (forgotCache.has(req.email)) {
      return _chunkGDC63SRXjs.ServiceResponse.success("Forgot link already sent to you successfully", null, _httpstatuscodes.StatusCodes.OK);
    }
    const user = await _chunkJDA4FSDTjs.isUserExist.call(void 0, req.email);
    if (!user) {
      return _chunkGDC63SRXjs.ServiceResponse.failure("User not found", null, _httpstatuscodes.StatusCodes.UNAUTHORIZED);
    }
    const token = await _chunkCHP2GYIBjs.ForgotToken.call(void 0, "Encrypt", { email: req.email });
    forgotCache.set(req.email, {
      email: req.email,
      createdAt: /* @__PURE__ */ new Date(),
      token: String(token)
    });
    _chunk3FHKKDEGjs.emailQueue.add(
      {
        ...req,
        name: user.name,
        type: "Forgot",
        token: String(token)
      },
      {
        removeOnComplete: true,
        attempts: 3,
        jobId: req.email
      }
    );
    return _chunkGDC63SRXjs.ServiceResponse.success("Successfully sent forgot link to your email", null, _httpstatuscodes.StatusCodes.CREATED);
  } catch (error) {
    logger.error(`AuthForgotService: ${error.message}`);
    return _chunkGDC63SRXjs.ServiceResponse.failure("An error occurred while sending forgot email.", null, _httpstatuscodes.StatusCodes.INTERNAL_SERVER_ERROR);
  }
};
var AuthResetService = async (body) => {
  try {
    const { email, password, token } = body;
    const forgotData = forgotCache.get(email);
    if (!forgotData || forgotData.token !== token) {
      return _chunkGDC63SRXjs.ServiceResponse.failure("Unauthorized", null, _httpstatuscodes.StatusCodes.UNAUTHORIZED);
    }
    const salt = await _bcrypt.genSalt.call(void 0, 10);
    const hashedPassword = await _bcrypt.hash.call(void 0, password, salt);
    await _chunkJDA4FSDTjs.updateUserPassword.call(void 0, email, hashedPassword);
    forgotCache.delete(email);
    return _chunkGDC63SRXjs.ServiceResponse.success("Password Reset Successfully", null, _httpstatuscodes.StatusCodes.CREATED);
  } catch (error) {
    logger.error(`AuthResetService: ${error.message}`);
    return _chunkGDC63SRXjs.ServiceResponse.failure("An error occurred while resetting password.", null, _httpstatuscodes.StatusCodes.INTERNAL_SERVER_ERROR);
  }
};
var AuthRegisterEmployeeService = async (body) => {
  try {
    const existingUser = await _chunkJDA4FSDTjs.findUser.call(void 0, body.email);
    if (existingUser) {
      return _chunkGDC63SRXjs.ServiceResponse.failure("Employee already exists", null, _httpstatuscodes.StatusCodes.CONFLICT);
    }
    const salt = await _bcrypt.genSalt.call(void 0, 10);
    const hashedPassword = await _bcrypt.hash.call(void 0, body.password, salt);
    const userData = {
      email: body.email,
      name: body.name,
      phone: body.phone,
      address: body.address,
      password: hashedPassword,
      role: "Admin",
      // 👈 Key fix here
      isUserVerified: false,
      isEmailVerified: true
    };
    await _chunkJDA4FSDTjs.createUser.call(void 0, userData);
    return _chunkGDC63SRXjs.ServiceResponse.success("Employee registered successfully", null, _httpstatuscodes.StatusCodes.CREATED);
  } catch (error) {
    logger.error(`AuthRegisterEmployeeService: ${error.message}`);
    return _chunkGDC63SRXjs.ServiceResponse.failure("An error occurred while registering the employee.", null, _httpstatuscodes.StatusCodes.INTERNAL_SERVER_ERROR);
  }
};
var GetAllUsersListService = async (page, limit = 10) => {
  try {
    const users = await _chunkJDA4FSDTjs.getAllUsers.call(void 0, page, limit);
    return {
      success: true,
      statusCode: 200,
      // status: "success",
      data: users,
      message: "Success"
    };
  } catch (error) {
    console.error("Error fetching all users:", error);
    return {
      success: false,
      statusCode: 500,
      // status: "error",
      message: "Internal server error.",
      data: null
    };
  }
};
var AuthGetAgentsService = async (status = "all") => {
  try {
    const validStatuses = ["approved", "pending", "all"];
    const finalStatus = validStatuses.includes(status) ? status : "all";
    const agents = await _chunkXSUWL2FGjs.getAgentsByStatus.call(void 0, finalStatus);
    return {
      success: true,
      statusCode: 200,
      message: "Agents fetched successfully",
      data: agents
    };
  } catch (error) {
    return {
      success: false,
      statusCode: 500,
      message: "Failed to fetch agents",
      data: null,
      error: error instanceof Error ? error.message : String(error)
    };
  }
};
var AuthApproveAgentService = async (email, isUserVerified) => {
  try {
    const result = await _chunkXSUWL2FGjs.updateAgentApprovalStatus.call(void 0, email, isUserVerified);
    if (result.modifiedCount === 0) {
      return {
        success: false,
        statusCode: 404,
        message: "Agent not found or already in desired state",
        data: null
      };
    }
    return {
      success: true,
      statusCode: 200,
      message: `Agent ${isUserVerified ? "approved" : "rejected"} successfully`,
      data: null
    };
  } catch (error) {
    return {
      success: false,
      statusCode: 500,
      message: "Failed to update agent status",
      data: null,
      error: error instanceof Error ? error.message : String(error)
    };
  }
};
var AuthUpdateProfileService = async (updateData) => {
  try {
    const { email, ...fieldsToUpdate } = updateData;
    const { password, ...rest } = fieldsToUpdate;
    let updatedData = { ...rest };
    if (password) {
      const salt = await _bcrypt.genSalt.call(void 0, 10);
      const hashedPassword = await _bcrypt.hash.call(void 0, password, salt);
      updatedData.password = hashedPassword;
    }
    const updatedUser = await _chunkXSUWL2FGjs.updateUserProfile.call(void 0, email, updatedData);
    return {
      success: true,
      statusCode: 200,
      message: "User profile updated successfully",
      data: updatedUser
    };
  } catch (error) {
    return {
      success: false,
      statusCode: 500,
      message: "Profile update failed",
      data: null,
      error: error instanceof Error ? error.message : String(error)
    };
  }
};
var AuthUpdateAgentProfileService = async (updateData) => {
  try {
    const { email, ...fieldsToUpdate } = updateData;
    const { password, ...rest } = fieldsToUpdate;
    let updatedData = { ...rest };
    if (password) {
      const salt = await _bcrypt.genSalt.call(void 0, 10);
      const hashedPassword = await _bcrypt.hash.call(void 0, password, salt);
      updatedData.password = hashedPassword;
    }
    const updatedUser = await _chunkXSUWL2FGjs.updateUserProfile.call(void 0, email, updatedData);
    return {
      success: true,
      statusCode: 200,
      message: "Agent profile updated successfully",
      data: updatedUser
    };
  } catch (error) {
    return {
      success: false,
      statusCode: 500,
      message: "Agent profile update failed",
      data: null,
      error: error instanceof Error ? error.message : String(error)
    };
  }
};
var AuthUpdateAdminProfileService = async (updateData) => {
  try {
    const { email, password, ...fieldsToUpdate } = updateData;
    if (password) {
      const salt = await _bcrypt.genSalt.call(void 0, 10);
      const hashedPassword = await _bcrypt.hash.call(void 0, password, salt);
      fieldsToUpdate.password = hashedPassword;
    }
    const updatedAdmin = await _chunkXSUWL2FGjs.updateAdminProfile.call(void 0, email, fieldsToUpdate);
    return {
      success: true,
      statusCode: 200,
      message: "Admin profile updated successfully",
      data: updatedAdmin
    };
  } catch (error) {
    return {
      success: false,
      statusCode: 500,
      message: "Failed to update admin profile",
      error: error instanceof Error ? error.message : String(error)
    };
  }
};
var AuthUpdateSuperAdminProfileService = async (updateData) => {
  try {
    const { email, ...fieldsToUpdate } = updateData;
    const { password, ...rest } = fieldsToUpdate;
    let updatedData = { ...rest };
    if (password) {
      const salt = await _bcrypt.genSalt.call(void 0, 10);
      const hashedPassword = await _bcrypt.hash.call(void 0, password, salt);
      updatedData = { ...updatedData, password: hashedPassword };
    }
    const updatedSuperAdmin = await _chunkXSUWL2FGjs.updateSuperAdminProfile.call(void 0, email, updatedData);
    if (updatedSuperAdmin) {
      return {
        success: true,
        statusCode: 200,
        message: "Super Admin profile updated successfully",
        data: updatedSuperAdmin
      };
    }
    return {
      success: false,
      statusCode: 400,
      message: "Only SuperAdmin details can be udpated...",
      data: updatedSuperAdmin
    };
  } catch (error) {
    return {
      success: false,
      statusCode: 500,
      message: "Failed to update Super Admin profile",
      data: null,
      error: error instanceof Error ? error.message : String(error)
    };
  }
};














































































exports.AuthSignUpService = AuthSignUpService; exports.AuthLoginService = AuthLoginService; exports.AuthLoginRefreshService = AuthLoginRefreshService; exports.AuthForgotService = AuthForgotService; exports.AuthResetService = AuthResetService; exports.AuthRegisterEmployeeService = AuthRegisterEmployeeService; exports.GetAllUsersListService = GetAllUsersListService; exports.AuthGetAgentsService = AuthGetAgentsService; exports.AuthApproveAgentService = AuthApproveAgentService; exports.AuthUpdateProfileService = AuthUpdateProfileService; exports.AuthUpdateAgentProfileService = AuthUpdateAgentProfileService; exports.AuthUpdateAdminProfileService = AuthUpdateAdminProfileService; exports.AuthUpdateSuperAdminProfileService = AuthUpdateSuperAdminProfileService; exports.authController = authController; exports.authRegistry = authRegistry; exports.authRouter = authRouter; exports.GetChainHatToken = GetChainHatToken; exports.GetAddressDetails = GetAddressDetails; exports.GETQuoteToken = GETQuoteToken; exports.SubmitCreateQuote = SubmitCreateQuote; exports.SubmitFullQuote = SubmitFullQuote; exports.SubmitBlockQuote = SubmitBlockQuote; exports.SubmitIssueQuote = SubmitIssueQuote; exports.MetaData = MetaData; exports.InsuranceFormStatusDefault = InsuranceFormStatusDefault; exports.InsuranceFormDefaultValues = InsuranceFormDefaultValues; exports.Coverages = Coverages; exports.CoveragesFormName = CoveragesFormName; exports.ArrangeCoverages = ArrangeCoverages; exports.InsuranceFormStatus = InsuranceFormStatus; exports.updateInsuranceStatus = updateInsuranceStatus; exports.SubmitCreateQuoteForm = SubmitCreateQuoteForm; exports.SubmitFullQuoteForm = SubmitFullQuoteForm; exports.InsuranceStatusService = InsuranceStatusService; exports.InsuranceFormGetService = InsuranceFormGetService; exports.InsuranceFormSaveService = InsuranceFormSaveService; exports.InsuranceFormResetService = InsuranceFormResetService; exports.InsuranceFormCreateQuoteService = InsuranceFormCreateQuoteService; exports.InsuranceFormBlockQuoteService = InsuranceFormBlockQuoteService; exports.InsuranceFormFullQuoteService = InsuranceFormFullQuoteService; exports.InsuranceFormClone = InsuranceFormClone; exports.InsuranceFormDiscard = InsuranceFormDiscard; exports.insuranceController = insuranceController; exports.insuranceRegistry = insuranceRegistry; exports.insuranceRouter = insuranceRouter; exports.formsRouter = formsRouter; exports.formsRegistry = formsRegistry; exports.SettingsCreateUserService = SettingsCreateUserService; exports.settingsController = settingsController; exports.settingsRegistry = settingsRegistry; exports.settingsRouter = settingsRouter; exports.StatsGetUserService = StatsGetUserService; exports.statsController = statsController; exports.statsRegistry = statsRegistry; exports.statsRouter = statsRouter; exports.internalRouter = internalRouter; exports.internalRegistry = internalRegistry; exports.SubmitIssueQuoteForm = SubmitIssueQuoteForm; exports.PaymentCreateService = PaymentCreateService; exports.PaymentStatusService = PaymentStatusService; exports.PaymentPeriodService = PaymentPeriodService; exports.paymentController = paymentController; exports.paymentRegistry = paymentRegistry; exports.paymentRouter = paymentRouter; exports.QuotedService = QuotedService; exports.BlockedService = BlockedService; exports.IssuedService = IssuedService; exports.policiesController = policiesController; exports.policiesRegistry = policiesRegistry; exports.policiesRouter = policiesRouter; exports.v1Router = v1Router; exports.v1Registry = v1Registry; exports.generateOpenAPIDocument = generateOpenAPIDocument; exports.openAPIRouter = openAPIRouter; exports.logger = logger; exports.app = app;
//# sourceMappingURL=chunk-S7VHYFOK.js.map