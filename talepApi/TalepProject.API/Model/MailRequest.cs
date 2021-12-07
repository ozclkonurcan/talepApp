using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TalepProject.API.Model
{
    public class MailRequest
    {
        public string ToEmail { get; set; }
        public string EmailPersonelAd { get; set; }
        public string EmailTalepAd { get; set; }
        public string EmailTalepAciklama { get; set; }
        public string EmailTalepTarih { get; set; }
        public string EmailTalepOnaylayanAd { get; set; }
        public string EmailTalepDurum { get; set; }
        public string EmailTalepOnayTarih { get; set; }
        //public List<IFormFile>Attachments { get; set; }
    }
}
