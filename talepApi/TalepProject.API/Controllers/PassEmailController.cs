using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TalepProject.API.Model;
using TalepProject.API.Services;

namespace TalepProject.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PassEmailController : ControllerBase
    {
        private readonly IPassService _passService;
        public PassEmailController(IPassService passService)
        {
            _passService = passService;
        }
        [HttpPost("Send")]
        public async Task<IActionResult> Send([FromBody] PassRequest request)
        {
            try
            {
                await _passService.SendPassEmailAsync(request);
                return Ok();
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }
    }
}
