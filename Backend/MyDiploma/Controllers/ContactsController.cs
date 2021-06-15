using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MyDiploma.Data;
using MyDiploma.Models.Contacts;
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

            var whereIsSender = await _context.Contacts.Include(o => o.Sender).Where(o => o.Sender.Id == currentUser.Id && o.IsApproved==true).Select(o => o.Receiver).ToListAsync();
            var whereIsReceiver = await _context.Contacts.Include(o => o.Receiver).Where(o => o.Receiver.Id == currentUser.Id && o.IsApproved==true).Select(o => o.Sender).ToListAsync();

            var result = whereIsSender.Union(whereIsReceiver).Distinct().ToList();
            return Ok(JsonSerializer.Serialize(result));
        }

        [HttpPost("deleteContact")]
        public async Task<IActionResult> DeleteContactAsync(DeleteContact contactToDelete)
        {
            Entities.User currentUser = (Entities.User)HttpContext.Items["User"];

            var contact = await _context.Contacts.FirstOrDefaultAsync(o => o.SenderId == contactToDelete.ContactId && o.ReceiverId == currentUser.Id);
            if(contact==null)
                contact = await _context.Contacts.FirstOrDefaultAsync(o => o.ReceiverId == contactToDelete.ContactId && o.SenderId == currentUser.Id);

            _context.Contacts.Remove(contact);
            await _context.SaveChangesAsync();
            return Ok();
        }
    }
}
