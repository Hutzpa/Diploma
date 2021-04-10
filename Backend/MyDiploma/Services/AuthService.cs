using Microsoft.Extensions.Options;
using MyDiploma.Entities;
using MyDiploma.Helpers;
using MyDiploma.Models;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using MyDiploma.Data;
using System.Threading.Tasks;

namespace MyDiploma.Services
{
    public interface IAuthService
    {
        AuthenticateResponse Authenticate(AuthenticateRequest model);
        Task<bool> RegisterAsync(RegisterRequest request);
    }
    public class AuthService : IAuthService
    {
        private AppSettings _appSettings;
        private DiplomaContext _dbContext;
        private IHashService _hashService;

        public AuthService(IOptions<AppSettings> appSettings, DiplomaContext dbContext,IHashService hashService)
        {
            _appSettings = appSettings.Value;
            _dbContext = dbContext;
            _hashService = hashService;
        }

        public AuthenticateResponse Authenticate(AuthenticateRequest model)
        {
            var user = _dbContext.Users.SingleOrDefault(o => o.Username == model.Username);       
             // return null if user not found
            if (user == null || !_hashService.Verify(model.Password, user.PasswordHash)) return null;
            // authentication successful so generate jwt token
            var token = GenerateJwtToken(user);
            return new AuthenticateResponse(user, token);
        }

        public async Task<bool> RegisterAsync(RegisterRequest request)
        {
            User user = new User
            {
                Username = request.Username,
                FirstName = request.FirstName,
                LastName = request.LastName,
                PasswordHash = _hashService.Hash(request.Password),
            };
            await _dbContext.Users.AddAsync(user);
            return await _dbContext.SaveChangesAsync() > 0;
        }


        // helper methods
        private string GenerateJwtToken(User user)
        {
            // generate token that is valid for 7 days
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_appSettings.Secret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[] { new Claim("id", user.Id.ToString()) }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
    }
}
