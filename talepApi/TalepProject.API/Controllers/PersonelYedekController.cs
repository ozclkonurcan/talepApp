using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TalepProject.Entities;

namespace TalepProject.API.ViewModel
{
    [Route("api/[controller]")]
    [ApiController]
    public class PersonelYedekController : ControllerBase
    {
        private readonly Talep_DBContext _context;
    }
}
