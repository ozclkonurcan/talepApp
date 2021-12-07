using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace TalepProject.API.ViewModel
{
    public class TalepViewModel
    {
        [Key]
        public long TalepID { get; set; }
        public string PersonelID { get; set; }

        public string PersonelEmail { get; set; }
        public string TalepPersonelResim { get; set; }
        public long PersonelStatuID { get; set; }
        public string SektorID { get; set; }
        public string SirketID { get; set; }
        public string DepartmanID { get; set; }
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
