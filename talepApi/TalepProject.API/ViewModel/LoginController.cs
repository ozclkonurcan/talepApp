using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using TalepProject.Entities;
using TalepProject.Entities.Entities;

namespace TalepProject.API.ViewModel
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly Talep_DBContext _context;

        public LoginController(Talep_DBContext context)
        {
            _context = context;
        }

        //[HttpGet]
        //public IActionResult GirisYap()
        //{
        //    return View();
        //}

        //public async Task<IActionResult> GirisYap(Personel p)
        //{
        //    var bilgiler = _context.personel.FirstOrDefault(x => x.PersonelEmail == p.PersonelEmail &&
        //    x.PersonelPassword == p.PersonelPassword);
        //    if(bilgiler != null)
        //    {
        //        var claims = new List<Claim>
        //       {
        //           new Claim(ClaimTypes.Email,p.PersonelEmail)
        //       };
        //        var useridentity = new ClaimsIdentity(claims, "Login");
        //        ClaimsPrincipal principal = new ClaimsPrincipal(useridentity);
        //        await HttpContext.SignInAsync(principal);
        //        return RedirectToAction("Index", "Personel");
        //    }
        //   // return View();
            
        //}
    }
}
