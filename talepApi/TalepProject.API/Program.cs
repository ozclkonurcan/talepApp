using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Twilio;
using Twilio.Rest.Api.V2010.Account;

namespace TalepProject.API
{
    public class Program
    {
        public static void Main(string[] args)
        {

            CreateHostBuilder(args).Build().Run();

            var host = new WebHostBuilder()
          .UseKestrel()
          .UseContentRoot(Directory.GetCurrentDirectory())
          .UseIISIntegration().UseUrls("http://localhost:8080/")
          .UseStartup<Startup>()
          .Build();


            string accountSid = Environment.GetEnvironmentVariable("twiliosid");
            string authToken = Environment.GetEnvironmentVariable("twilioauth");

            TwilioClient.Init(accountSid, authToken);




            var message = MessageResource.Create(
                body: "Talep  asdajshgdjahgsdjahgsjdahsdas sms",
                from: new Twilio.Types.PhoneNumber("+14235563769"),
                to: new Twilio.Types.PhoneNumber("+9005531830397"));

            Console.WriteLine(message.Sid);
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>();
                });
    }
}
