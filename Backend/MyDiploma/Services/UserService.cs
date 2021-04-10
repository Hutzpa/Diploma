using Microsoft.Extensions.Options;
using System.Collections.Generic;
using System.Linq;
using MyDiploma.Entities;
using MyDiploma.Helpers;
using MyDiploma.Data;

namespace MyDiploma.Services
{
    public interface IUserService
    {
        IEnumerable<User> GetAll();
        User GetById(int id);
    }
    [Authorize]
    public class UserService : IUserService
    {
        private readonly AppSettings _appSettings;
        private readonly DiplomaContext _context;

        public UserService(IOptions<AppSettings> appSettings, DiplomaContext context)
        {
            _appSettings = appSettings.Value;
            _context = context;
        }

        public IEnumerable<User> GetAll()
        {
            return _context.Users.ToList();
        }

        public User GetById(int id)
        {
            return _context.Users.FirstOrDefault(x => x.Id == id);
        }

    }
}
