using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TalepProject.API.Model
{
    public class SmsRequest
    {
        public string SmsToNumber { get; set; }
        public string PersonelAd { get; set; }
        public string PersonelPassword { get; set; }
    }
}
