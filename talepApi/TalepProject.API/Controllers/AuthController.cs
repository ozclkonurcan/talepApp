using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TalepProject.API.Helpers;
using TalepProject.API.ViewModel;
using TalepProject.Entities;
using TalepProject.Entities.Entities;

namespace TalepProject.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly Talep_DBContext _context;
        private readonly JwtService _jwtService;
        public AuthController(Talep_DBContext context, JwtService jwtService)
        {
            _context = context;
            _jwtService = jwtService;
        }

        [HttpPost(template:"register")]
        public IActionResult Register()
        {
            return Ok("success");
        }
        [HttpPost(template:"login")]
        public IActionResult Login(Personel personel)
        {
            var user = _context.personel.FirstOrDefault(x => x.PersonelEmail == personel.PersonelEmail
            && x.PersonelPassword == personel.PersonelPassword && x.DurumID == 1);

            if (user == null)
            {

                return BadRequest(error: new { message = "Hatalı yada eksik giriş"});
            }

           
            



            var jwt = _jwtService.Generate(Convert.ToInt32(user.PersonelID));

            Response.Cookies.Append("jwt", (string)jwt, new CookieOptions
            {
                HttpOnly = true
            });

            return Ok(new {
            message = "success"
            });
        }

        [HttpGet("user")]
        public IActionResult User()
        {
            try { 
            var jwt = Request.Cookies["jwt"];

            var token = _jwtService.Verify(jwt);

            long userId = long.Parse(token.Issuer);

            var User = _context.personel.FirstOrDefault(x => x.PersonelID == userId);

            return Ok(User);
            }catch(Exception _)
            {
                return Unauthorized();
            }
        }

        


        [HttpPost("logout")]
        public IActionResult Logout()
        {
            Response.Cookies.Delete("jwt");
            return Ok(new
            {
                message = "success"
            });
        }


        [HttpGet("{id}")]
        public AuthViewModel Get(int id)
        {
            var item = _context.personel.FirstOrDefault(x => x.PersonelID == id);
            var personelModel = new AuthViewModel();


            if (item != null)
            {

                personelModel.PersonelID = item.PersonelID;
                //personelModel.PersonelResim = item.PersonelResim;
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


            };

            return personelModel;
        }

        private string GetDurumById(long durumID)
        {
            return _context.durum.FirstOrDefault(x => x.DurumID == durumID).DurumAd;
        }

        private string GetStatuById(long statuID)
        {
            return _context.statu.FirstOrDefault(x => x.StatuID == statuID).StatuAd;
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

        private string GetCinsiyetById(long cinsiyetID)
        {
            return _context.cinsiyet.FirstOrDefault(x => x.CinsiyetID == cinsiyetID).CinsiyetAd;
        }
    }
}
