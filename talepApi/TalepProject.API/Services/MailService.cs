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
    public class MailService : IMailService
    {
        private readonly MailSettings _mailSettings;
        public MailService(IOptions<MailSettings> options)
        {
            _mailSettings = options.Value;
        }
        public async Task SendEmailAsync(MailRequest mailRequest)
        {
            var email = new MimeMessage();
            email.Sender = MailboxAddress.Parse(_mailSettings.Mail);
            email.To.Add(MailboxAddress.Parse(mailRequest.ToEmail));
            email.Subject = mailRequest.EmailPersonelAd;

         
            var builder = new BodyBuilder();
            //if(mailRequest.Attachments != null)
            //{
            //    byte[] fileBytes;
            //    foreach(var file in mailRequest.Attachments)
            //    {
            //        if(file.Length > 0)
            //        {
            //            using (var ms = new MemoryStream())
            //            {
            //                file.CopyTo(ms);
            //                fileBytes = ms.ToArray();
            //            }
            //            builder.Attachments.Add(file.FileName, fileBytes, ContentType.Parse(file.ContentType));
            //        }
            //    }
            //}
            builder.HtmlBody ="Talep Adı : "+mailRequest.EmailTalepAd +"<br/>"+
                                                                    "<hr/>"+"<br/>"+
                              "Talep Açıklama : "+mailRequest.EmailTalepAciklama+"<br/>"+
                                                                    "<hr/>"+"<br/>"+
                              "Talep Tarih : " +mailRequest.EmailTalepTarih+"<br/>"+
                              "<hr/>" + "<br/>"+ "<br/>"+
                             "İşlemi Gerçekleştiren Yetkili : "+mailRequest.EmailTalepOnaylayanAd+"<br/>"+
                             "Talep Durumu : "+mailRequest.EmailTalepDurum+" / "+mailRequest.EmailTalepOnayTarih;
            email.Body = builder.ToMessageBody();
            using var smtp = new SmtpClient();
            smtp.Connect(_mailSettings.Host, _mailSettings.Port, SecureSocketOptions.StartTls);
            smtp.Authenticate(_mailSettings.Mail, _mailSettings.Password);
            await smtp.SendAsync(email);
            smtp.Disconnect(true);

        }
    }
}
