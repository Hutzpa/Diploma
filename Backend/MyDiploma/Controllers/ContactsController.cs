using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MyDiploma.Data;
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
    public class ContactsController : ControllerBase
    {
        private DiplomaContext _context;

        public ContactsController(DiplomaContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetContactsAsync()
        {
            Entities.User currentUser = (Entities.User)HttpContext.Items["User"];
            var contacts = await _context.Contacts.Include(o=>o.Sender).Include(o=>o.Receiver).Where(o => o.ReceiverId == currentUser.Id || o.SenderId == currentUser.Id && o.IsApproved == true).ToListAsync();
            return Ok(JsonSerializer.Serialize(contacts));
        }
    }
}
