using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MyDiploma.Data;
using MyDiploma.Services;
using System.Linq;

namespace MyDiploma.Controllers
{
    [Route("[controller]")]
    [ApiController]
    //[Authorize]
    public class UserController : ControllerBase
    {
        private IUserService _userService;
        private DiplomaContext _context;
       

        public UserController(IUserService userService, DiplomaContext diplomaContext)
        {
            _context = diplomaContext;
            _userService = userService;
        }

        [HttpGet("getUser")]
        public IActionResult GetUser(int id)
        {
            Entities.User askedUser = (Entities.User)HttpContext.Items["User"];
            var user = _userService.GetById(id);
            var disabled = _context.Contacts.FirstOrDefault(o => o.ReceiverId == id  && o.SenderId == askedUser.Id) != null;
            if (user == null)
                return BadRequest();
            return Ok(new { Id = user.Id, FirstName = user.FirstName, LastName = user.LastName, Username = user.Username,RequestDisabled = disabled });
        }

        [HttpGet("getUserPhoto")]
        public IActionResult GetUserPhoto()
        {
            Entities.User askedUser = (Entities.User)HttpContext.Items["User"];
            return Ok(new { photo = askedUser.Photo });
        }
    }
}
