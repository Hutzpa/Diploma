using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace MyDiploma.Entities
{
    public class User
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Username { get; set; }
        public string Photo { get; set; }

        [JsonIgnore]
        public string PasswordHash { get; set; }

        [JsonIgnore]
        public List<Contact> Contacts { get; set; }

        [JsonIgnore]
        public List<Message> Messages { get; set; }
    }
}
