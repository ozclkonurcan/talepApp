using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TalepProject.Entities.Entities
{
    public class Departman
    {
        [Key]
        public long DepartmanID { get; set; }
        public long SektorID { get; set; }
        public long SirketID { get; set; }
        public string DepartmanAd { get; set; }
    }
}
