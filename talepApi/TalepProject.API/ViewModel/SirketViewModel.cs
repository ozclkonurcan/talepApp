using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace TalepProject.API.ViewModel
{
    public class SirketViewModel
    {
        [Key]
        public long SirketID { get; set; }
        public string SektorID { get; set; }
        public string SirketAd { get; set; }
    }
}
