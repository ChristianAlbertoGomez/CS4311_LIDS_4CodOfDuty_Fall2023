| ID | Description | Mitigating Reason |
| --- | --- | -- |
| V-222400 | Validity periods must be verified on all application messages using WS-Security or SAML assertions. | Not Applicable; Our implementation does not contain SOAP Capabilities.  |
| V-222404 | The application must use both the NotBefore and NotOnOrAfter elements or OneTimeUse element when using the Conditions element in a SAML assertion. | Not Applicable; SAML assertion is not used to exchange authentication data for our system.  |
| V-222612 | The application must not be vulnerable to overflow attacks. | Not Applicable; Our system is developed using a memory safe language  |
| V-222578 | The application must destroy the session ID value and/or cookie on logoff or browser close.  |  |
| V-222430 | The application must execute without excessive account permissions.  | System requires Root permissions due to pulling Root Ownership of files  |
| V-222432 | The application must enforce the limit of three consecutive invalid logon attempts by a user during a 15 minute time period.  | Not Applicable; Software requirements do not include authentication under the assumption that the user has already been authenticated by external mechanism.   |
| V-222577 | The application must not expose session IDs.  |  |
| V-222609 | The application must not be subject to input handling vulnerabilities.  |  |
| V-222608 | The application must not be vulnerable to XML-oriented attacks.  | The application checks if XML files do not contain any strange information.  |
| V-222602 | The application must protect from Cross-Site Scripting (XSS) vulnerabilities.  | Not Applicable:The attacker should not be able to execute XSS as they would have to first give a valid config file.  |
| V-222601 | The application must not store sensitive information in hidden fields.  | The application will store most of the information in a database.  |
| V-222607 | The application must not be vulnerable to SQL Injection.  | Not Applicable; The application employs local file-based data storage which is not able to interpret or execute SQL commands. Thus, the risk associated with SQL injection does not apply.   |
| V-222604 | The application must protect from command injection.  |  |
| V-222403 | The application must use the NotOnOrAfter condition when using the SubjectConfirmation element in a SAML assertion.  |  |
| V-222585 | The application must fail to a secure state if system initialization fails, shutdown fails, or aborts fail.  |  |
| V-222550 | The application, when utilizing PKI-based authentication, must validate certificates by constructing a certification path (which includes status information) to an accepted trust anchor.  |  |
| V-222522 | The application must uniquely identify and authenticate organizational users (or processes acting on behalf of organizational users).  | Users should already be identified by which system they are using (LIDS, LNIDS, LIDS-D) as well as the config file provided by the user.  |
| V-222554 | The application must not display passwords/PINs as clear text.  | Not Applicable; Application does not include an internal mechanism for user authentication that involves passwords or PINs. Instead, it relies entirely on an external authentication system. |
| V-222596 | The application must protect the confidentiality and integrity of transmitted information.  |  |
| V-222399 | Messages protected with WS_Security must use time stamps with creation and expiration times.  | Not Applicable; System does not use WS-Security tokens.  |
| V-222658 | All products must be supported by the vendor or the development team.  | The development team, upon delivery of the software, will provide essential documentation and guidance for understanding, maintaining, and supporting the software post-delivery. |
| V-222659 | The application must be decommissioned when maintenance or support is no longer available.  |  |
| V-222551 | The application, when using PKI-based authentication, must enforce authorized access to the corresponding private key.  |  |
| V-222620 | Application web servers must be on a separate network segment from the application and database servers if it is a tiered application operating in the DoD DMZ.  | Not Applicable; Web servers aren’t connected to any network outside the network that is going to be scanned. |
| V-222536 | The application must enforce a minimum 15-character password length.  | Not Applicable; Application does not include an internal mechanism for user authentication that involves passwords. Instead, it relies entirely on an external authentication system.  |
| V-222643 | The application must have the capability to mark sensitive/classified output when required.  |  |
| V-222542 | The application must only store cryptographic representations of passwords.  | Not Applicable; Application does not include an internal mechanism for user authentication that involves passwords. Instead, it relies entirely on an external authentication system.  |
| V-222543 | The application must transmit only cryptographically-protected passwords.  | Not Applicable; Application does not include an internal mechanism for user authentication that involves passwords. Instead, it relies entirely on an external authentication system. |
| V-222425 | The application must enforce approved authorizations for logical access to information and system resources in accordance with applicable access control policies.  | Not Applicable; Application's design and operational model delegate the responsibility of enforcing access authorizations to an external, independent system. This external system handles all controls related to user authentication and authorization before granting access to the application.  |
| V-222642 | The application must not contain embedded authentication data.  | Not Applicable; Application does not include an internal mechanism for user authentication that involves passwords or PINs. Instead, it relies entirely on an external authentication system. |
| V-222662 | Default passwords must be changed.  | Not Applicable; Application does not include an internal mechanism for user authentication that involves passwords. Instead, it relies entirely on an external authentication system.  |
| V-222555 | The application must use mechanisms meeting the requirements of applicable federal laws, Executive Orders, directives, policies, regulations, standards, and guidance for authentication to a cryptographic module.  |  |