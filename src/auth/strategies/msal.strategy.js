import { BearerStrategy } from "passport-azure-ad";
import { passportConfig } from "../../config/authConfig.js";

export const MicrosoftStrategy = new BearerStrategy({
  identityMetadata: `https://${passportConfig.metadata.authority}/${passportConfig.credentials.tenantID}/${passportConfig.metadata.version}/${passportConfig.metadata.discovery}?appid=${passportConfig.credentials.clientID}`,
  // identityMetadata: `https://${passportConfig.metadata.authority}/${passportConfig.credentials.tenantID}/${passportConfig.metadata.discovery}`,
  issuer: `https://${passportConfig.metadata.authority}/${passportConfig.credentials.tenantID}/${passportConfig.metadata.version}`,
  clientID: passportConfig.credentials.clientID,
  //audience: passportConfig.credentials.clientID, // audience is this application
  audience: "https://graph.microsoft.com", // audience is this application
  validateIssuer: passportConfig.settings.validateIssuer,
  passReqToCallback: passportConfig.settings.passReqToCallback,
  loggingLevel: passportConfig.settings.loggingLevel,
  loggingNoPII: passportConfig.settings.loggingNoPII,
  scope: passportConfig.protectedRoutes.scopes
},
(token, done) => {
  //console.log("bearerStrategy middleware. Token:", token);
  /**
   * Below you can do extended token validation and check for additional claims, such as:
   * - check if the caller's tenant is in the allowed tenants list via the 'tid' claim (for multi-tenant applications)
   * - check if the caller's account is homed or guest via the 'acct' optional claim
   * - check if the caller belongs to right roles or groups via the 'roles' or 'groups' claim, respectively
   *
   * Bear in mind that you can do any of the above checks within the individual routes and/or controllers as well.
   * For more information, visit: https://docs.microsoft.com/azure/active-directory/develop/access-tokens#validate-the-user-has-permission-to-access-this-data
   */


  /**
   * Lines below verifies if the caller's client ID is in the list of allowed clients.
   * This ensures only the applications with the right client ID can access this API.
   * To do so, we use "azp" claim in the access token. Uncomment the lines below to enable this check.
   */

  // const myAllowedClientsList = [
  //     /* add here the client IDs of the applications that are allowed to call this API */
  // ]

  // if (!myAllowedClientsList.includes(token.azp)) {
  //     return done(new Error('Unauthorized'), {}, "Client not allowed");
  // }


  /**
   * Access tokens that have neither the 'scp' (for delegated permissions) nor
   * 'roles' (for application permissions) claim are not to be honored.
   */
  if (!token.hasOwnProperty('scp') && !token.hasOwnProperty('roles')) {
      return done(new Error('Unauthorized'), null, "No delegated or app permission claims found");
  }

  /**
   * If needed, pass down additional user info to route using the second argument below.
   * This information will be available in the req.user object.
   */
  return done(null, {}, token);
})