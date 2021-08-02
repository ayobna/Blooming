using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Vonage;
using Vonage.Request;
using Vonage.Messaging;
using Bloomingproj.Models;

namespace Bloomingproj.Controllers
{
    public class SMSController : ApiController
    {
        [HttpPost]
        [Route("Api/SendCode")]
        public IHttpActionResult Post(SMS sMS )
        {
            try
            {
                var credentials = Credentials.FromApiKeyAndSecret("74fb7b90","sF5O0bRE3PMW4lxD"
       );

                var VonageClient = new VonageClient(credentials);
                var response = VonageClient.SmsClient.SendAnSms(new Vonage.Messaging.SendSmsRequest()
                {
                    To = "972502127125",
                    From = "Blooming",
                    Text = "Thank you, payment:"+sMS.total,
                    Type = SmsType.unicode
                });

                return Ok("has been sent successfully");

            }
            catch (Exception ex)
            {
                return Content(HttpStatusCode.InternalServerError, ex);
            }
        }


    }
}
