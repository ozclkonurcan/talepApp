using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace TalepProject.API.ViewModel
{
    public class AuthViewModel
    {
        [Key]
        public long PersonelID { get; set; }
        public string PersonelAd { get; set; }

        public string CinsiyetID { get; set; }
        public string SektorID { get; set; }
        public string SirketID { get; set; }
        public string DepartmanID { get; set; }
        public string PersonelResim { get; set; }
        public decimal PersonelTel { get; set; }
        public string PersonelEmail { get; set; }
        public string PersonelPassword { get; set; }
        public string StatuID { get; set; }
        public string DurumID { get; set; }
        public decimal YetkiliButce { get; set; }
    }
}
