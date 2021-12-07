using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TalepProject.API.ViewModel;
using TalepProject.Entities;
using TalepProject.Entities.Entities;

namespace TalepProject.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TalepController : ControllerBase
    {
        private readonly Talep_DBContext _context;
        public TalepController(Talep_DBContext context)
        {
            _context = context;
        }

     
        [HttpGet]
        public IEnumerable<TalepViewModel> GetTalepList()
        {

            var list = _context.talep.ToList();
            var talep = new Talep();
            var talepList = new List<TalepViewModel>();

            foreach (var item in list)
            {
                talepList.Add(new TalepViewModel
                {
                    TalepID = item.TalepID,
                    PersonelID = GetPersonelByID(item.PersonelID),
                    PersonelEmail = item.PersonelEmail,
                    TalepPersonelResim = item.TalepPersonelResim,
                    PersonelStatuID = item.PersonelStatuID,
                    SektorID = GetSektorByID(item.SektorID),
                    SirketID = GetSirketByID(item.SirketID),
                    DepartmanID = GetDepartmanByID(item.DepartmanID),
                    TalepAd = item.TalepAd,
                    TalepAciklamasi = item.TalepAciklamasi,
                    TalepMiktar = item.TalepMiktar,
                    AgirlikBirimi = item.AgirlikBirimi,
                    TalepTarih = item.TalepTarih,
                    TalepTahminiDeger = item.TalepTahminiDeger,
                    ParaBirimi = item.ParaBirimi,
                    TalepDurum = item.TalepDurum,
                    OnaylayanAd = item.OnaylayanAd,
                    OnaylayanResim = item.OnaylayanResim,
                    OnayTarih = item.OnayTarih
   


                });
            }
            return talepList;
        }

        private string GetDepartmanByID(long departmanID)
        {
            return _context.departman.FirstOrDefault(x => x.DepartmanID == departmanID).DepartmanAd;
        }

        private string GetSirketByID(long sirketID)
        {
            return _context.sirket.FirstOrDefault(x => x.SirketID == sirketID).SirketAd;
        }

        private string GetSektorByID(long sektorID)
        {
            return _context.sektor.FirstOrDefault(x => x.SektorID == sektorID).SektorAd;
        }

        private string GetPersonelByID(long personelID)
        {
            return _context.personel.FirstOrDefault(x => x.PersonelID == personelID).PersonelAd;
        }

        [HttpGet("{id}")]
        public TalepViewModel Get(int id)
        {
            var item = _context.talep.FirstOrDefault(x => x.TalepID == id);
            var talepModel = new TalepViewModel();


            if (item != null)
            {

                talepModel.TalepID = item.TalepID;
                talepModel.PersonelID = GetPersonelByID(item.PersonelID);
                talepModel.PersonelEmail = item.PersonelEmail;
                talepModel.TalepPersonelResim = item.TalepPersonelResim;
                talepModel.PersonelStatuID = item.PersonelStatuID;
                talepModel.SektorID = GetSektorByID(item.SektorID);
                talepModel.SirketID = GetSirketByID(item.SirketID);
                talepModel.DepartmanID = GetDepartmanByID(item.DepartmanID);
                talepModel.TalepAd = item.TalepAd;
                talepModel.TalepAciklamasi = item.TalepAciklamasi;
                talepModel.TalepMiktar = item.TalepMiktar;
                talepModel.AgirlikBirimi = item.AgirlikBirimi;
                talepModel.TalepTarih = item.TalepTarih;
                talepModel.TalepTahminiDeger = item.TalepTahminiDeger;
                talepModel.ParaBirimi = item.ParaBirimi;
                talepModel.TalepDurum = item.TalepDurum;
                talepModel.OnaylayanResim = item.OnaylayanResim;
                talepModel.OnaylayanAd = item.OnaylayanAd;
                talepModel.OnayTarih = item.OnayTarih;


            };

            return talepModel;
        }
        [HttpPost]
        public IActionResult Post([FromBody] Talep talep)
        {
            //var talepControl = _context.talep.SingleOrDefault(x => x.TalepAd == talep.TalepAd);

            //if(talepControl != null)
            //{
            //    ModelState.AddModelError(string.Empty, "Zaten böyle bir kayıt var");
            //    return talep;
            //}


            if (_context.talep.Any(x => x.TalepAd == talep.TalepAd && x.PersonelID == talep.PersonelID && x.TalepDurum == 0))
            {
                return BadRequest(error: new { message = "Böyle bir kayıt zaten var" });
            
            }
            _context.talep.Add(talep);
            _context.SaveChanges();

            return Ok(new
            {
                message = "success"
            });
        }



        // PUT api/<CategoriesController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] Talep talep)
        {
            var tal = _context.talep.FirstOrDefault(x => x.TalepID == id);

 
            tal.TalepDurum = talep.TalepDurum;
            tal.OnaylayanAd = talep.OnaylayanAd;
            tal.OnaylayanResim = talep.OnaylayanResim;
            tal.OnayTarih = talep.OnayTarih;
            

            _context.SaveChanges();
        }

        // DELETE api/<CategoriesController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {

            _context.talep.Remove(_context.talep.FirstOrDefault(x => x.TalepID == id));
            _context.SaveChanges();


        }


    }
}
