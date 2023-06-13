using System.IO;
using System.Linq;
using System.Net;
using data;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Azure.Functions.Worker.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;

namespace func
{
    public class PandaCareFamBam
    {
        private readonly ILogger _logger;
        private readonly PandaCareContext _context;


        public PandaCareFamBam(ILoggerFactory loggerFactory, PandaCareContext context)
        {
            _context = context;
            _logger = loggerFactory.CreateLogger<PandaCareFamBam>();
        }

        [Function("PandaCareFamBam")]
        public async Task<HttpResponseData> Run([HttpTrigger(AuthorizationLevel.Function, "get", "post")] HttpRequestData req)
        {
            _logger.LogInformation("FamBam: List a part.");
            //create an anonymous object based on the data model
            //which will be a list of parent-child-conversationalReference objects
            var children = _context.Parents.Select(p => new
            {
                ParentName = p.ParentName,
                ChildName = p.Children.Select(c => c.ChildName),
                ConversationReference = p.ConversationalReferences.Select(c => c.ConversationReference)
            });
            //convert the anonymous object to json
            var json = JsonConvert.SerializeObject(children);
            //return a json object
            var response = req.CreateResponse(HttpStatusCode.OK);
            //response.Headers.Add("Content-Type", "application/json; charset=utf-8");
            //write the json to the response
            await response.WriteAsJsonAsync(json);

            return response;
        }
    }
}

