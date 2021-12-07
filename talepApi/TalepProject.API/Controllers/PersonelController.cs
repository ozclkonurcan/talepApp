using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using TalepProject.API.ViewModel;
using TalepProject.Entities;
using TalepProject.Entities.Entities;

namespace TalepProject.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PersonelController : ControllerBase
    {
        private readonly Talep_DBContext _context;
        private readonly IWebHostEnvironment _env;
     
        public PersonelController(Talep_DBContext context, IWebHostEnvironment env)
        {
            _context = context;
            _env = env;
        }



        [HttpGet]
        public IEnumerable<PersonelViewModel> GetPersonelList()
        {

            var list = _context.personel.ToList();
            var personel = new Personel();
            var personelList = new List<PersonelViewModel>();

            foreach (var item in list)
            {
                personelList.Add(new PersonelViewModel
                {
                    PersonelID = item.PersonelID,
                   // PersonelResim = item.PersonelResim,
                    CinsiyetID = GetCinsiyetById(item.CinsiyetID),
                    PersonelAd = item.PersonelAd,
                    SektorID = GetSektorById(item.SektorID),
                    SirketID = GetSirketById(item.SirketID),
                    DepartmanID = GetDepartmanById(item.DepartmanID),
                    PersonelTel = item.PersonelTel,
                    PersonelEmail = item.PersonelEmail,
                    PersonelPassword = item.PersonelPassword,
                    StatuID = GetStatuById(item.StatuID),
                    DurumID = GetDurumById(item.DurumID),
                    YetkiliButce = Convert.ToInt32(item.YetkiliButce),
                    PersonelTarih = item.PersonelTarih


                });
            }
            return personelList;
        }


        

        [HttpGet("personel2")]
        public IEnumerable<Personel> Get()
        {

            var list = _context.personel.ToList();
            return list;
        }

        [Route("SaveFile")]
        [HttpPost]
        public JsonResult SaveFile()
        {
            try
            {
                var httpRequest = Request.Form;
                var postedFile = httpRequest.Files[0];
                string fileName = postedFile.FileName;
                var physicalPath = _env.ContentRootPath + "/Photos/" + fileName;

                using(var stream = new FileStream(physicalPath, FileMode.Create))
                {
                    postedFile.CopyTo(stream);
                }

                return new JsonResult(fileName);


            }
            catch (Exception)
            {

                return new JsonResult("profil1.jpg");
            }
        }
        [HttpPost]
        public IActionResult Post(Personel personel)
        {

            //var x = _context.departman.FirstOrDefault(x => x.DepartmanID == personel.DepartmanID);

            if (_context.personel.Any(x => x.PersonelAd == personel.PersonelAd && x.PersonelEmail == personel.PersonelEmail))
            {
                return BadRequest(error: new { message = "Zaten böyle bir kayıt var" });
            }
            _context.personel.Add(personel);

            _context.SaveChanges();


            return Ok(new
            {
                message = "success"
            });


        }

        // POST api/<ValuesController>
        [HttpPost("Admin")]
        public IActionResult Post(PersonelViewModel personel)
        {
              if (!ModelState.IsValid)
            return BadRequest("Invalid data.");
            //var x = _context.departman.FirstOrDefault(x => x.DepartmanID == personel.DepartmanID);

            if (_context.personel.Any(x => x.PersonelEmail == personel.PersonelEmail))
            {
                return BadRequest(error: new { message = "Zaten böyle bir kayıt var" });
            }

            _context.personel.Add(new Personel()
                {
                    PersonelAd = personel.PersonelAd,
                    CinsiyetID = GetCinsiyetBySTR(personel.CinsiyetID),
                    StatuID = GetStatuBySTR(personel.StatuID),
                    DurumID = GetDurumBySTR(personel.DurumID),
                    PersonelEmail = personel.PersonelEmail,
                    PersonelPassword = personel.PersonelPassword,
                    PersonelTel = personel.PersonelTel,
                    PersonelResim = personel.PersonelResim,
                    DepartmanID = GetDepartmanBySTR(personel.DepartmanID),
                    SektorID = GetSektorBySTR(personel.SektorID),
                    SirketID = GetSirketBySTR(personel.SirketID),
                    YetkiliButce = personel.YetkiliButce,
                    PersonelTarih = personel.PersonelTarih
                });

                _context.SaveChanges();
            


            return Ok();



        }

        private long GetDurumBySTR(string durumID)
        {
            return _context.durum.FirstOrDefault(x => x.DurumAd == durumID).DurumID;
        }

        private long GetStatuBySTR(string statuID)
        {
            return _context.statu.FirstOrDefault(x => x.StatuAd == statuID).StatuID;
        }

        private long GetCinsiyetBySTR(string cinsiyetID)
        {
            return _context.cinsiyet.FirstOrDefault(x => x.CinsiyetAd == cinsiyetID).CinsiyetID;
        }

        private long GetSirketBySTR(string sirketID)
        {
            return _context.sirket.FirstOrDefault(x => x.SirketAd == sirketID).SirketID;
        }

        private long GetSektorBySTR(string sektorID)
        {
            return _context.sektor.FirstOrDefault(x => x.SektorAd == sektorID).SektorID;
        }

        private long GetDepartmanBySTR(string departmanID)
        {
            return _context.departman.FirstOrDefault(x => x.DepartmanAd == departmanID).DepartmanID;
        }

        private string GetDurumById(long durumID)
        {
            return _context.durum.FirstOrDefault(x => x.DurumID == durumID).DurumAd;
        }

        private string GetStatuById(long statuID)
        {
            return _context.statu.FirstOrDefault(x => x.StatuID == statuID).StatuAd;
        }

        private string GetCinsiyetById(long cinsiyetID)
        {
            return _context.cinsiyet.FirstOrDefault(x => x.CinsiyetID == cinsiyetID).CinsiyetAd;
        }

        private string GetDepartmanById(long departmanID)
        {
            return _context.departman.FirstOrDefault(x => x.DepartmanID == departmanID).DepartmanAd;
        }

        private string GetSirketById(long sirketID)
        {
            return _context.sirket.FirstOrDefault(x => x.SirketID == sirketID).SirketAd;
        }

        private string GetSektorById(long sektorID)
        {
            return _context.sektor.FirstOrDefault(x => x.SektorID == sektorID).SektorAd;
        }
        [HttpPut("{id}")]
        public void Put(long id, [FromBody] Personel personel)
        {
            var tal = _context.personel.FirstOrDefault(x => x.PersonelID == id);


            tal.PersonelAd = personel.PersonelAd;
            tal.PersonelEmail = personel.PersonelEmail;
            tal.PersonelTel = personel.PersonelTel;
            tal.PersonelPassword = personel.PersonelPassword;
            tal.DepartmanID = personel.DepartmanID;
            tal.SektorID = personel.SektorID;
            tal.SirketID = personel.SirketID;
            tal.StatuID = personel.StatuID;
            tal.YetkiliButce = personel.YetkiliButce;
            tal.PersonelResim = personel.PersonelResim;
            //tal.DurumID = personel.DurumID;

            _context.SaveChanges();
        }

        [HttpPut("Admin/{id}")]
        public IActionResult Put(long id,PersonelViewModel personel)
        {
            var tal = _context.personel.FirstOrDefault<Personel>(x => x.PersonelID == id);


          if(tal != null)
            {
                tal.PersonelAd = personel.PersonelAd;
                tal.PersonelEmail = personel.PersonelEmail;
                tal.PersonelTel = personel.PersonelTel;
                tal.PersonelPassword = personel.PersonelPassword;
                tal.DepartmanID = GetDepartmanBySTR(personel.DepartmanID);
                tal.SektorID = GetSektorBySTR(personel.SektorID);
                tal.SirketID = GetSirketBySTR(personel.SirketID);
                tal.StatuID = GetStatuBySTR(personel.StatuID);
                tal.YetkiliButce = personel.YetkiliButce;
                tal.PersonelResim = personel.PersonelResim;
                //tal.DurumID = personel.DurumID;
            }
            else
            {
                return NotFound();
            }


            _context.SaveChanges();

            return Ok();
        }


        [HttpPut("durum/{id}")]
        public void DurumPut(long id, [FromBody] Personel personel)
        {
            var drm = _context.personel.FirstOrDefault(x => x.PersonelID == id);


            drm.DurumID = personel.DurumID;

            _context.SaveChanges();
        }



        [HttpGet("{id}")]
        public PersonelViewModel Get(long id)
        {
            var item = _context.personel.FirstOrDefault(x => x.PersonelID == id);
            var personelModel = new PersonelViewModel();


            if (item != null)
            {   
                
            personelModel.PersonelID = item.PersonelID;
           // personelModel.PersonelResim = item.PersonelResim;
            personelModel.CinsiyetID = GetCinsiyetById(item.CinsiyetID);
            personelModel.PersonelAd = item.PersonelAd;
            personelModel.SektorID = GetSektorById(item.SektorID);
            personelModel.SirketID = GetSirketById(item.SirketID);
            personelModel.DepartmanID = GetDepartmanById(item.DepartmanID);
            personelModel.PersonelTel = item.PersonelTel;
            personelModel.PersonelEmail = item.PersonelEmail;
            personelModel.PersonelPassword = item.PersonelPassword;
            personelModel.StatuID = GetStatuById(item.StatuID);
            personelModel.DurumID = GetDurumById(item.DurumID);
            personelModel.YetkiliButce = item.YetkiliButce;
                personelModel.PersonelTarih = item.PersonelTarih;


                };
            
            return personelModel;
        }
    }
}
