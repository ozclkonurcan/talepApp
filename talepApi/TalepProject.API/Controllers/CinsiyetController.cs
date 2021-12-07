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
    public class CinsiyetController : ControllerBase
    {
        private readonly Talep_DBContext _context;
        public CinsiyetController(Talep_DBContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IEnumerable<Cinsiyet> Get()
        {
            return _context.cinsiyet.ToList();
        }
    }
}
