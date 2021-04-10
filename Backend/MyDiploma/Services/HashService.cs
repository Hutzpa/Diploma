using BC = BCrypt.Net.BCrypt;

namespace MyDiploma.Services
{
    public interface IHashService
    {
        string Hash(string toHash);

        bool Verify(string password, string passwordHash);
    }
    public class HashService : IHashService
    {
        public string Hash(string toHash) => BC.HashPassword(toHash);
        public bool Verify(string password, string passwordHash) => BC.Verify(password, passwordHash);
    }
}
