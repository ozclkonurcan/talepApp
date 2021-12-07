using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TalepProject.Entities.Entities
{
    public class Sektor
    {
        [Key]
        public long SektorID { get; set; }
        public string SektorAd { get; set; }
    }
}
