using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MyDiploma.Models
{
    public class RegisterRequest
    {
        [Required(ErrorMessage = "First name is required")]
        public string FirstName { get; set; }
        [Required(ErrorMessage = "Last name is required")]
        public string LastName { get; set; }
        [Required(ErrorMessage = "Password is required")]
        [EmailAddress(ErrorMessage = "Username need to be in the email format")]
        public string Username { get; set; }
        [Required(ErrorMessage = "Username is required")]
        public string Password { get; set; }
    }
}
