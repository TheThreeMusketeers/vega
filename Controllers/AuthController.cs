using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using vega.Controllers.Resources;
using vega.Core.Models;
using vega.Persistence;
using System.IdentityModel.Tokens.Jwt;

namespace vega.Controllers
{
    [Route("/auth")]
    public class AuthController : Controller
    {
        private readonly VegaDbContext context;
        private readonly IMapper mapper;
        public AuthController(VegaDbContext context, IMapper mapper)
        {
            this.mapper = mapper;
            this.context = context;

        }
        [HttpPost("register")]
        public async Task<JwtPacket> Register()
        {
            var jwt = new JwtSecurityToken();
            var encodedJwt = new JwtSecurityTokenHandler().WriteToken(jwt);

            return new JwtPacket()
            {
                Token = encodedJwt
            };
        }
    }//cs
}//ns