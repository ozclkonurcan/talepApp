using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TalepProject.Entities.Entities
{
    public class Cinsiyet
    {
        [Key]
        public long CinsiyetID { get; set; }
        public string CinsiyetAd { get; set; }
    }
}
