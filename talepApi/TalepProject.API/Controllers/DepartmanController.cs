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
    public class DepartmanController : ControllerBase
    {
        private readonly Talep_DBContext _context;
        public DepartmanController(Talep_DBContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IEnumerable<DepartmanViewModel> GetDepartmanList()
        {

            var list = _context.departman.ToList();
            var departman = new Departman();
            var departmanList = new List<DepartmanViewModel>();

            foreach (var item in list)
            {
                departmanList.Add(new DepartmanViewModel
                {
                    DepartmanID = item.DepartmanID,
                    SektorID = GetSektorById(item.SektorID),
                    SirketID = GetSirketById(item.SirketID),
                    DepartmanAd = item.DepartmanAd



                });
            }
            return departmanList;
        }

        // POST api/<ValuesController>
        // POST api/<ValuesController>
        [HttpPost]
        public IActionResult Post(DepartmanViewModel departman)
        {
            if (!ModelState.IsValid)
                return BadRequest("Invalid data.");
            //var x = _context.departman.FirstOrDefault(x => x.DepartmanID == personel.DepartmanID);
            if (_context.departman.Any(x => x.DepartmanAd == departman.DepartmanAd && x.SirketID == GetSirketBySTR(departman.SirketID)))
            {
                return BadRequest(error: new { message = "Zaten böyle bir kayıt var" });
            }
           


            _context.departman.Add(new Departman()
            {
                SektorID = GetSektorBySTR(departman.SektorID),
                SirketID = GetSirketBySTR(departman.SirketID),
                DepartmanAd = departman.DepartmanAd
          
            });

            _context.SaveChanges();



            return Ok();



        }

        private long GetSirketBySTR(string sirketID)
        {
            return _context.sirket.FirstOrDefault(x => x.SirketAd == sirketID).SirketID;
        }

        private long GetSektorBySTR(string sektorID)
        {
            return _context.sektor.FirstOrDefault(x => x.SektorAd == sektorID).SektorID;
        }

        //[HttpPost]
        //public void Post([FromBody] Departman departman)
        //{
        //    _context.departman.Add(departman);
        //    _context.SaveChanges();
        //}

        [HttpPut("{id}")]
        public void Put(int id, [FromBody] Departman departman)
        {
            var tal = _context.departman.FirstOrDefault(x => x.DepartmanID == id);

            tal.DepartmanAd = departman.DepartmanAd;
           


            _context.SaveChanges();
        }

        [HttpPut("Admin/{id}")]
        public IActionResult Put(int id, DepartmanViewModel departman)
        {
            var tal = _context.departman.FirstOrDefault<Departman>(x => x.DepartmanID == id);


            if (tal != null)
            {
                tal.DepartmanAd = departman.DepartmanAd;
                tal.SektorID = GetSektorBySTR(departman.SektorID);
                tal.SirketID = GetSirketBySTR(departman.SirketID);
           
            }
            else
            {
                return NotFound();
            }


            _context.SaveChanges();

            return Ok();
        }

        private string GetSirketById(long sirketID)
        {
            return _context.sirket.FirstOrDefault(x => x.SirketID == sirketID).SirketAd;
        }

        private string GetSektorById(long sektorID)
        {
            return _context.sektor.FirstOrDefault(x => x.SektorID == sektorID).SektorAd;
        }
    }
}
