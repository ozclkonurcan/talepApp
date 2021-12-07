using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TalepProject.Entities.Entities
{
    public class Yetkili
    {
        [Key]
        public long YetkiID { get; set; }
        public long PersonelID { get; set; }
        public long PersonelAd { get; set; }
        public long SektorID { get; set; }
        public long SirketID { get; set; }
        public long DepartmanID { get; set; }
        public long StatuID { get; set; }
        public string YetkiTarih { get; set; }
    }
}
