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
    }
}