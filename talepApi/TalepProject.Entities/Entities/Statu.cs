using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TalepProject.Entities.Entities
{
    public class Statu
    {
        [Key]
        public long StatuID { get; set; }
        public string StatuAd { get; set; }
    }
}
