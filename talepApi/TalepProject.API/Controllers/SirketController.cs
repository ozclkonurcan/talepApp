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
    public class SirketController : ControllerBase
    {
        private readonly Talep_DBContext _context;
        public SirketController(Talep_DBContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IEnumerable<SirketViewModel> GetSirketList()
        {

            var list = _context.sirket.ToList();
            var sirket = new Sirket();
            var sirketList = new List<SirketViewModel>();

            foreach (var item in list)
            {
                sirketList.Add(new SirketViewModel
                {
                    SirketID = item.SirketID,
                    SektorID = GetSektorById(item.SektorID),
                    SirketAd = item.SirketAd



                });
            }
            return sirketList;
        }

        [HttpGet("Sirket2")]
        public IEnumerable<Sirket> Get()
        {
            return _context.sirket.ToList();
        }

        private string GetSektorById(long sektorID)
        {
            return _context.sektor.FirstOrDefault(x => x.SektorID == sektorID).SektorAd;
        }
    }
}
