using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TalepProject.Entities.Entities
{
    public class Talep
    {
        [Key]
        public long TalepID { get; set; }
        public long PersonelID { get; set; }
        public string PersonelEmail { get; set; }
        public string TalepPersonelResim { get; set; }
        public long PersonelStatuID { get; set; }
        public long SektorID { get; set; }
        public long SirketID { get; set; }
        public long DepartmanID { get; set; }

        public string TalepAd { get; set; }
        public string TalepAciklamasi { get; set; }
        public long TalepMiktar { get; set; }
        public string AgirlikBirimi { get; set; }
        public string TalepTarih { get; set; }
        public decimal TalepTahminiDeger { get; set; }
        public string ParaBirimi { get; set; }
        public long TalepDurum { get; set; }
        public string OnaylayanAd { get; set; }
        public string OnaylayanResim { get; set; }
        public string OnayTarih { get; set; }
    }
}
