using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TalepProject.API.Model;

namespace TalepProject.API.Services
{
    public interface IPassService
    {
        Task SendPassEmailAsync(PassRequest passRequest);
    }
}
