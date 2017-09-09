using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using vega.Controllers.Resources;
using vega.Core.Models;
using vega.Persistence;
using System.IdentityModel.Tokens.Jwt;
using vega.Core;

namespace vega.Controllers
{
    [Route("/auth")]
    public class AuthController : Controller
    {
        private readonly IMapper mapper;
        private readonly IUserRepository repository;
        private readonly IUnitOfWork unitOfWork;
        public AuthController(IMapper mapper, IUserRepository repository, IUnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;
            this.repository = repository;
            this.mapper = mapper;

        }
        [HttpPost("register")]
        public async Task<JwtPacket> Register([FromBody] User user)
        {
            var jwt = new JwtSecurityToken();
            var encodedJwt = new JwtSecurityTokenHandler().WriteToken(jwt);

            repository.Add(user);

            await unitOfWork.CompleteAsync();

            return new JwtPacket()
            {
                Token = encodedJwt,
                FirstName = user.FirstName
            };
        }
    }//cs
}//ns