using MailKit.Net.Smtp;
using MailKit.Security;
using Microsoft.Extensions.Options;
using MimeKit;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using TalepProject.API.Model;
using TalepProject.API.Settings;

namespace TalepProject.API.Services
{
    public class PassService :IPassService
    {
        private readonly MailSettings _mailSettings;
        public PassService(IOptions<MailSettings> options)
        {
            _mailSettings = options.Value;
        }

        public async Task SendPassEmailAsync(PassRequest passRequest)
        {
            var email = new MimeMessage();
            email.Sender = MailboxAddress.Parse(_mailSettings.Mail);
            email.To.Add(MailboxAddress.Parse(passRequest.ToPassEmail));
            email.Subject = passRequest.PersonelAd;


            var builder = new BodyBuilder();

            builder.HtmlBody = "Personel Email : " + passRequest.PersonelEmail + "<br/>" +
                                                                    "<hr/>" + "<br/>" +
                              "Personel Password : " + passRequest.Password;
            email.Body = builder.ToMessageBody();
            using var smtp = new SmtpClient();
            smtp.Connect(_mailSettings.Host, _mailSettings.Port, SecureSocketOptions.StartTls);
            smtp.Authenticate(_mailSettings.Mail, _mailSettings.Password);
            await smtp.SendAsync(email);
            smtp.Disconnect(true);
        }
    }
}
