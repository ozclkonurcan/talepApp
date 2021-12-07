using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace TalepProject.API.ViewModel
{
    public class DepartmanViewModel
    {
        [Key]
        public long DepartmanID { get; set; }
        public string SektorID { get; set; }
        public string SirketID { get; set; }
        public string DepartmanAd { get; set; }
    }
}
