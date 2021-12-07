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
    public class YetkiliController : ControllerBase
    {
        private readonly Talep_DBContext _context;

        public YetkiliController(Talep_DBContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IEnumerable<YetkiliViewModel> GetYetkiList()
        {

            var list = _context.yetkili.ToList();
            var yetkili = new Yetkili();
            var yetkiliList = new List<YetkiliViewModel>();

            foreach (var item in list)
            {
                yetkiliList.Add(new YetkiliViewModel
                {
                    YetkiID = item.YetkiID,
                    PersonelID = item.PersonelID,
                    PersonelAd = getPersonelByID(item.PersonelAd),
                    SektorID = getSektorByID(item.SektorID),
                    SirketID = getSirketByID(item.SirketID),
                    DepartmanID = getDepartmanByID(item.DepartmanID),
                    StatuID = getStatuByID(item.StatuID),
                    YetkiTarih = item.YetkiTarih



                });
            }
            return yetkiliList;
        }

        private string getStatuByID(long statuID)
        {
            return _context.statu.FirstOrDefault(x => x.StatuID == statuID).StatuAd;
        }

        [HttpPost]
        public IActionResult Post(YetkiliViewModel yetkili)
        {
            if (!ModelState.IsValid)
                return BadRequest("Invalid data.");
            //var x = _context.departman.FirstOrDefault(x => x.DepartmanID == personel.DepartmanID);
            //if (_context.yetkili.Any(x => x.YetkiAd == yetkili.YetkiAd))
            //{
            //    return BadRequest(error: new { message = "Zaten böyle bir kayıt var" });
            //}



            _context.yetkili.Add(new Yetkili()
            {
                YetkiID = yetkili.YetkiID,
              PersonelID = yetkili.PersonelID,
              PersonelAd = getPersonelBySTR(yetkili.PersonelAd),
              SektorID = getSektorBySTR(yetkili.SektorID),
              SirketID = getSirketBySTR(yetkili.SirketID),
              DepartmanID = getDepartmanBySTR(yetkili.DepartmanID),
              StatuID = getStatuBySTR(yetkili.StatuID),
              YetkiTarih = yetkili.YetkiTarih

            });

            _context.SaveChanges();



            return Ok();



        }

        private long getPersonelBySTR(string personelAd)
        {
            return _context.personel.FirstOrDefault(x => x.PersonelAd == personelAd).PersonelID;
        }

        // DELETE api/<CategoriesController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {

            _context.yetkili.Remove(_context.yetkili.FirstOrDefault(x => x.YetkiID == id));
            _context.SaveChanges();


        }

        [HttpGet("{id}")]
        public IEnumerable<YetkiliViewModel> Get(int id)
        {
            var list = _context.yetkili.Where(x => x.PersonelID == id).ToList();
            var yetkili = new Yetkili();
            var yetkiliList = new List<YetkiliViewModel>();

            foreach (var item in list)
            {
                yetkiliList.Add(new YetkiliViewModel
                {
                    YetkiID = item.YetkiID,
                    PersonelID = item.PersonelID,
                    PersonelAd = getPersonelByID(item.PersonelAd),
                    SektorID = getSektorByID(item.SektorID),
                    SirketID = getSirketByID(item.SirketID),
                    DepartmanID = getDepartmanByID(item.DepartmanID),
                    StatuID = getStatuByID(item.StatuID),
                    YetkiTarih = item.YetkiTarih



                });
            }
            return yetkiliList;
        }

        private string getPersonelByID(long personelAd)
        {
            return _context.personel.FirstOrDefault(x => x.PersonelID == personelAd).PersonelAd;
        }

        private long getStatuBySTR(string statuID)
        {
        return _context.statu.FirstOrDefault(x => x.StatuAd == statuID).StatuID;
    }

    private long getDepartmanBySTR(string departmanID)
        {
            return _context.departman.FirstOrDefault(x => x.DepartmanAd == departmanID).DepartmanID;
        }

        private long getSirketBySTR(string sirketID)
        {
            return _context.sirket.FirstOrDefault(x => x.SirketAd == sirketID).SirketID;
        }

        private long getSektorBySTR(string sektorID)
        {
            return _context.sektor.FirstOrDefault(x => x.SektorAd == sektorID).SektorID;
        }

       

        private string getDepartmanByID(long departmanID)
        {
            return _context.departman.FirstOrDefault(x => x.DepartmanID == departmanID).DepartmanAd;
        }

        private string getSirketByID(long sirketID)
        {
            return _context.sirket.FirstOrDefault(x => x.SirketID == sirketID).SirketAd;
        }

        private string getSektorByID(long sektorID)
        {
            return _context.sektor.FirstOrDefault(x => x.SektorID == sektorID).SektorAd;    
        }

    }


}
