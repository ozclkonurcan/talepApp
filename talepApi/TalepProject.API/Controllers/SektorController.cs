using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TalepProject.Entities;
using TalepProject.Entities.Entities;

namespace TalepProject.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SektorController : ControllerBase
    {
        private readonly Talep_DBContext _context;
        public SektorController(Talep_DBContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IEnumerable<Sektor>Get()
        {
            var list = _context.sektor.ToList();
            return list;
        }

        [HttpPost]
        public IActionResult Post([FromBody] Sektor sektor)
        {
            //var talepControl = _context.talep.SingleOrDefault(x => x.TalepAd == talep.TalepAd);

            //if(talepControl != null)
            //{
            //    ModelState.AddModelError(string.Empty, "Zaten böyle bir kayıt var");
            //    return talep;
            //}


            if (_context.sektor.Any(x => x.SektorAd == sektor.SektorAd ))
            {
                return BadRequest(error: new { message = "Böyle bir kayıt zaten var" });

            }
            _context.sektor.Add(sektor);
            _context.SaveChanges();

            return Ok(new
            {
                message = "success"
            });
        }



    }
}
