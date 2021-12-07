using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TalepProject.Entities.Entities
{
    public class Durum
    {
        [Key]
        public long DurumID { get; set; }
        public string DurumAd { get; set; }
    }
}
