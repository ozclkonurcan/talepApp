using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace TalepProject.Entities.Entities
{
    public class Personel
    {
        [Key]
        public long PersonelID { get; set; }
        public string PersonelAd { get; set; }
        public long CinsiyetID { get; set; }
        public long SektorID { get; set; }
        public long SirketID { get; set; }
        public long DepartmanID { get; set; }

        public string PersonelResim { get; set; }

        public decimal PersonelTel { get; set; }
        public string PersonelEmail { get; set; }
        //[JsonIgnore]
        public string PersonelPassword { get; set; }
        public long StatuID { get; set; }
        public long DurumID { get; set; }
        public long YetkiliButce { get; set; }

        public string PersonelTarih { get; set; }

    }
}
