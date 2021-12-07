using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Twilio;
using Twilio.Rest.Api.V2010.Account;
using Twilio.Types;

namespace TalepProject.API.Sms
{
    public class SmsSender
    {
        
            //// Find your Account Sid and Auth Token at twilio.com/user/account
            //// To set up environmental variables, see http://twil.io/secure
            // string accountSid = Environment.GetEnvironmentVariable("AC7f65fd047775be9fbc95016f3f6d37b4");
            // string authToken = Environment.GetEnvironmentVariable("39a2a1845c86fc135736d0ed36e67f02");

            //// Initialize the Twilio client
            //TwilioClient.Init(accountSid, authToken);




            //var message = MessageResource.Create(
            //    body: "Talep uyguluması sms denemesi",
            //    from: new Twilio.Types.PhoneNumber("+14235563769"),
            //    to: new Twilio.Types.PhoneNumber("+905531830397"));

            //Console.WriteLine(message.Sid);
        
    }
}
