using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MyDiploma.Data;
using MyDiploma.Models.Chat;
using MyDiploma.Models.Profile;
using MyDiploma.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace MyDiploma.Controllers
{
    [Route("[controller]")]
    [ApiController]
    [Authorize]
    public class ProfileController : ControllerBase
    {
        private DiplomaContext _context;
        private IFileManager _fileManager;

        public ProfileController(DiplomaContext context,IFileManager fileManager)
        {
            _context = context;
            _fileManager = fileManager;
        }


        [HttpPost("SetProfilePicture")]
        public async Task<IActionResult> SetProfilePictureAsync([FromForm] FormData formData)
        {
            Entities.User user = (Entities.User)HttpContext.Items["User"];

            user.Photo = formData.FormFile == null ? "" : await _fileManager.SaveImage(formData.FormFile);

            _context.Users.Update(user);
            await _context.SaveChangesAsync();
            return Ok();
        }
    }
}
