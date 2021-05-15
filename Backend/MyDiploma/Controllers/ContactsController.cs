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
        [Obsolete("Баг 2")]
        public async Task<IActionResult> GetContactsAsync()
        {
            Entities.User currentUser = (Entities.User)HttpContext.Items["User"];

            var whereIsSender = await _context.Contacts.Include(o => o.Sender).Where(o => o.Sender.Id == currentUser.Id).Select(o => o.Receiver).ToListAsync();
            var whereIsReceiver = await _context.Contacts.Include(o => o.Receiver).Where(o => o.Receiver.Id == currentUser.Id).Select(o => o.Sender).ToListAsync();

            var result = whereIsSender.Union(whereIsReceiver).Distinct().ToList();

            

            return Ok(JsonSerializer.Serialize(result));
        }
    }
}
