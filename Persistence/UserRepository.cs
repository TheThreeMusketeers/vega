using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using vega.Core;
using vega.Core.Models;

namespace vega.Persistence
{
    public class UserRepository : IUserRepository
    {
        private readonly VegaDbContext context;
        public UserRepository(VegaDbContext context)
        {
            this.context = context;

        }
        public void Add(User user)
        {
            context.Users.Add(user);
        }

        public async Task<User> Login(LoginViewModel loginData)
        {
            return await context.Users.SingleOrDefaultAsync(u => u.Email == loginData.Email && u.Password == loginData.Password);
        }
    }
}