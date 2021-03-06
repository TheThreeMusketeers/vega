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

        public async Task<User> GetUser(int id)
        {
            return await context.Users.SingleOrDefaultAsync(u => u.Id == id);
        }

        public async Task<User> GetUserByEmail(string email)
        {
            return await context.Users.SingleOrDefaultAsync(u => u.Email == email);
        }

        public async Task<User> Login(LoginViewModel loginData)
        {
            return await context.Users.SingleOrDefaultAsync(u => u.Email == loginData.Email && u.Password == loginData.Password);
        }
    }
}