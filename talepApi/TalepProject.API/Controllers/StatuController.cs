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
    public class StatuController : ControllerBase
    {
        private readonly Talep_DBContext _context;
        public StatuController(Talep_DBContext context)
        {
            _context = context;
        }
        [HttpPost]
        public void Post([FromBody] Statu statu)
        {
            _context.statu.Add(statu);
            _context.SaveChanges();
        }

        [HttpPut("{id}")]
        public void Put(int id, [FromBody] Statu statu)
        {
            var tal = _context.statu.FirstOrDefault(x => x.StatuID == id);


            tal.StatuAd = statu.StatuAd;


            _context.SaveChanges();
        }
        [HttpGet]
        public IEnumerable<Statu> statu()
        {
            var list = _context.statu.ToList();
            return list;
        }
    }
}
