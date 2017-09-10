using System.Collections.Generic;
using System.Threading.Tasks;
using vega.Core.Models;

namespace vega.Core
{
    public interface IUserRepository
    {
          void Add(User user);

          Task<User> Login(LoginViewModel loginData);

          Task<User> GetUser(int id);

    }
}