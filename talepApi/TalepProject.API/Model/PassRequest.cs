using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TalepProject.API.Model
{
    public class PassRequest
    {
        public string ToPassEmail { get; set; }
        public string PersonelAd { get; set; }
        public string PersonelEmail { get; set; }
        public string Password { get; set; }
       
    }
}
