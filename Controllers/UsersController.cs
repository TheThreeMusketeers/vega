using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using vega.Controllers.Resources;
using vega.Core.Models;
using vega.Persistence;
using vega.Core;
using Microsoft.AspNetCore.Authorization;
using System.Linq;
using System;

namespace vega.Controllers
{
    [Route("/api/users")]
    public class UsersController : Controller
    {
        private readonly IMapper mapper;
        private readonly IUserRepository repository;
        private readonly IUnitOfWork unitOfWork;
        public UsersController(IMapper mapper, IUserRepository repository, IUnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;
            this.repository = repository;
            this.mapper = mapper;

        }
        
        [HttpGet("{id}")]
        public async Task<IActionResult> GetUser(int id)
        {
            var user = await repository.GetUser(id);
            
            if(user==null) return NotFound("User not found!");

            return Ok(user);

        }//GetUser

        [Authorize]
        [HttpGet("me")]
        public async Task<IActionResult> GetUser()
        {
            var user = await GetSecureUser();
            
            if(user==null) return NotFound("User not found!");

            return Ok(user);
        }

        [Authorize]
        [HttpPost("me")]
        public async Task<IActionResult> UpdateUser([FromBody] UpdateUserResource userResource)
        {
            var user = await GetSecureUser();

            if(user==null) return NotFound("User not found!");

            mapper.Map<UpdateUserResource, User>(userResource, user);
            
            await unitOfWork.CompleteAsync();

            return Ok(user);
        }

        private async Task<User> GetSecureUser()
        {
            var id = HttpContext.User.Claims.First().Value;
            
            var user = await repository.GetUser(Convert.ToInt32(id));

            return user;
        }


    }//cs
}//ns