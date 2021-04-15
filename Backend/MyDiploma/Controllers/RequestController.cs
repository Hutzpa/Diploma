using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MyDiploma.Data;
using MyDiploma.Entities;
using MyDiploma.Models.Contacts;
using MyDiploma.Models.Search;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MyDiploma.Controllers
{
    [Route("[controller]")]
    [ApiController]
    [Authorize]
    public class RequestController : ControllerBase
    {
        private DiplomaContext _context;
       // private User _User;

        public RequestController(DiplomaContext context)
        {
            _context = context;
            //_User = (MyDiploma.Entities.User)HttpContext.Items["User"];
        }



        [HttpPost("search")]
        public async Task<IActionResult> SearchAsync(SearchRequest request)
        {
            var data = await _context.Users.Where(o => o.FirstName.Contains(request.Query) || o.LastName.Contains(request.Query) || o.Username.Contains(request.Query)).ToListAsync();         
            return Ok(data);
        }

        [HttpPost("send")]
        public async Task<IActionResult> SendContactsRequestAsync(ContactsRequest request)
        {
            if (request.SenderId == request.ReceiverId)
                return BadRequest();
            var sender = await _context.Users.FirstOrDefaultAsync(o => o.Id == request.SenderId);
            var reciever = await _context.Users.FirstOrDefaultAsync(o => o.Id == request.ReceiverId);
            if (sender == null || reciever == null)
                return BadRequest();
            var isExist = await _context.Contacts.FirstOrDefaultAsync(o => o.SenderId == sender.Id && o.ReceiverId == reciever.Id);
            if (isExist != null)
                return BadRequest();
            Contact contact = new Contact
            {
                SenderId = sender.Id,
                ReceiverId = reciever.Id
            };
            await _context.Contacts.AddAsync(contact);
            await _context.SaveChangesAsync();
            return Ok();
        }
    }
}
