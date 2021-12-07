using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace TalepProject.API.ViewModel
{
    public class YetkiliViewModel
    {
        [Key]
        public long YetkiID { get; set; }
        public long PersonelID { get; set; }
        public string PersonelAd { get; set; }
        public string SektorID { get; set; }
        public string SirketID { get; set; }
        public string DepartmanID { get; set; }
        public string StatuID { get; set; }
        public string YetkiTarih { get; set; }
    }
}
