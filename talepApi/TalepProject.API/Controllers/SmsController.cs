using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TalepProject.API.Model;
using TalepProject.API.Services;
using TalepProject.Entities.Entities;
using Twilio;
using Twilio.AspNet.Core;
using Twilio.Clients;
using Twilio.Rest.Api.V2010.Account;
using Twilio.TwiML;
using Twilio.Types;

namespace TalepProject.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SmsController : ControllerBase
    {
        [HttpPost("Send")]
        public IActionResult Send(SmsRequest model)
        {
            if (ModelState.IsValid)
            {
                
                    // Find your Account Sid and Auth Token at twilio.com/user/account 
                    const string accountSid = "AC7f65fd047775be9fbc95016f3f6d37b4";
                    const string authToken = "39a2a1845c86fc135736d0ed36e67f02";
                    TwilioClient.Init(accountSid, authToken);

                    var to = new PhoneNumber("+90" + model.SmsToNumber);
                    var message = MessageResource.Create(
                    to,
                    from: new PhoneNumber("+14235563769"), //  From number, must be an SMS-enabled Twilio number ( This will send sms from ur "To" numbers ). 
                    body: "Personel Email : "+model.PersonelAd +"///" + "Personel Password : "+ model.PersonelPassword);

                
                

            }

            return Ok("");
        }


        //[HttpPost("Send")]
        //public async Task<IActionResult> Send([FromBody] SmsRequest request)
        //{
        //    try
        //    {
        //        await _smsService.SendSmsAsync(request);
        //        return Ok();
        //    }
        //    catch (Exception ex)
        //    {

        //        throw ex;
        //    }
        //}
    }
}
