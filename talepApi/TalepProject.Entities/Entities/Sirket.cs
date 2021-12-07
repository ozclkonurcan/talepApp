using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TalepProject.Entities.Entities
{
    public class Sirket
    {
        [Key]
        public long SirketID { get; set; }
        public long SektorID { get; set; }
        public string SirketAd { get; set; }
    }
}
