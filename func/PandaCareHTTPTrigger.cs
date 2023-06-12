// using System.IO;
// using System.Net;
// using System.Threading.Tasks;
// using Microsoft.AspNetCore.Http;
// using Microsoft.AspNetCore.Mvc;
// using Microsoft.Azure.WebJobs;
// using Microsoft.Azure.WebJobs.Extensions.Http;
// using Microsoft.Azure.WebJobs.Extensions.OpenApi.Core.Attributes;
// using Microsoft.Azure.WebJobs.Extensions.OpenApi.Core.Enums;
// using Microsoft.Extensions.Logging;
// using Microsoft.OpenApi.Models;
// using Newtonsoft.Json;
// using data;

// namespace panda_care_function
// {
//     public class PandaCareHTTPTrigger
//     {
//         private readonly ILogger<PandaCareHTTPTrigger> _logger;
//         private readonly PandaCareContext _context;


//         public PandaCareHTTPTrigger(ILogger<PandaCareHTTPTrigger> log, PandaCareContext context)
//         {
//             _logger = log;
//             _context = context;
//         }

//         [FunctionName("PandaSave")]
//         [OpenApiOperation(operationId: "Run", tags: new[] { "name" })]
//         [OpenApiSecurity("function_key", SecuritySchemeType.ApiKey, Name = "code", In = OpenApiSecurityLocationType.Query)]
//         [OpenApiRequestBody(contentType: "application/json", bodyType: typeof(ChildRegistrationData), Description = "Registration", 
//             Required = true)]
//         [OpenApiResponseWithBody(statusCode: HttpStatusCode.OK, contentType: "application/json", 
//             bodyType: typeof(string), Description = "The id of the child that was registered")]
//         public async Task<IActionResult> Run(
//             [HttpTrigger(AuthorizationLevel.Function, "post", Route = null)] HttpRequest req)
//         {
//             _logger.LogInformation("PandaCare to the rescue.");
            
//             string requestBody = await new StreamReader(req.Body).ReadToEndAsync();
//             var registrationData = JsonConvert.DeserializeObject<ChildRegistrationData>(requestBody);

//             try
//             {
//                 var parent = new Parent
//                 {
//                     ParentName = registrationData.ParentName,
//                     Email = registrationData.Email,
//                     Phone = registrationData.Phone,
//                     Address = registrationData.Address
//                 };

//                 var child = new Child
//                 {
//                     ChildName = registrationData.ChildName,
//                     DateOfBirth = registrationData.DateOfBirth,
//                     MedicalConditions = registrationData.MedicalConditions
//                 };

//                 var conversationalReference = new ConversationalReference
//                 {
//                     ConversationReference = registrationData.ConversationReference,
//                     Parent = parent
//                 };

//                 _context.Parents.Add(parent);
//                 _context.Children.Add(child);
//                 _context.ConversationalReferences.Add(conversationalReference);

//                 await _context.SaveChangesAsync();

//                 return new OkResult();
//             }
//             catch (System.Exception ex)
//             {

//                 _logger.LogError(ex, "An error occurred while storing child registration data.");
//                 return new StatusCodeResult(500);
//             }
//         }
//     }
// }

