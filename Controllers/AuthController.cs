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
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;
using System.Text;

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
        public async Task<IActionResult> Register([FromBody] User user)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            repository.Add(user);

            await unitOfWork.CompleteAsync();

            var jwtPacket = CreateJwtPacket(user);

            return Ok(jwtPacket);

            
        }//Register

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginViewModel loginData)
        {
            var user = await repository.Login(loginData);
            
            if(user==null) return NotFound("Email or password is incorrect!");

            var jwtPacket = CreateJwtPacket(user);

            return Ok(jwtPacket);

        }//Login

        JwtPacket CreateJwtPacket(User user)
        {
            var signingKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes("this is the secret key"));

            var signingCredentials = new SigningCredentials(signingKey,SecurityAlgorithms.HmacSha256);
            
            var claims = new Claim[]
            {
                new Claim(JwtRegisteredClaimNames.Sub,user.Id.ToString())
            };
            var jwt = new JwtSecurityToken(claims:claims,signingCredentials:signingCredentials);
            var encodedJwt = new JwtSecurityTokenHandler().WriteToken(jwt);
            return new JwtPacket()
            {
                Token = encodedJwt,
                FirstName = user.FirstName
            };
        }//CreateJwtPacket

    }//cs
}//ns