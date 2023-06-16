using System.IO;
using System.Net;
using data;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Azure.Functions.Worker.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using panda_care_function;

namespace func
{
    public class HttpTrigger2
    {
        private readonly ILogger _logger;
        private readonly PandaCareContext _context;


        public HttpTrigger2(ILoggerFactory loggerFactory, PandaCareContext context)
        {
            _context = context;
            _logger = loggerFactory.CreateLogger<HttpTrigger2>();
        }

        [Function("PandaSave")]
        public async Task<HttpResponseData> Run([HttpTrigger(AuthorizationLevel.Function, "post")] HttpRequestData req)
        {
            _logger.LogInformation("PandaCare to the rescue.");

            string requestBody = await new StreamReader(req.Body).ReadToEndAsync();
            var registrationData = JsonConvert.DeserializeObject<ChildRegistrationData>(requestBody);

            HttpResponseData response = null;

            try
            {
                var parent = new Parent
                {
                    ParentName = registrationData.ParentName,
                    Email = registrationData.Email,
                    Phone = registrationData.Phone,
                    Address = registrationData.Address
                };

                var child = new Child
                {
                    ChildName = registrationData.ChildName,
                    DateOfBirth = registrationData.DateOfBirth,
                    MedicalConditions = registrationData.MedicalConditions
                };

                var conversationalReference = new ConversationalReference
                {
                    ConversationReference = registrationData.ConversationReference,
                    Parent = parent
                };

                _context.Parents.Add(parent);
                _context.Children.Add(child);
                _context.ConversationalReferences.Add(conversationalReference);

                await _context.SaveChangesAsync();

                parent.Children.Add(child);
                parent.ConversationalReferences.Add(conversationalReference);

                await _context.SaveChangesAsync();
                response = req.CreateResponse(HttpStatusCode.OK);
                response.Headers.Add("Content-Type", "text/plain; charset=utf-8");
                response.WriteString("Registered!");

            }
            catch (System.Exception ex)
            {

                _logger.LogError(ex, "An error occurred while storing child registration data.");
                response = req.CreateResponse(HttpStatusCode.InternalServerError);
                response.Headers.Add("Content-Type", "text/plain; charset=utf-8");
                response.WriteString(ex.Message);
            }


            return response;
        }
    }
}
