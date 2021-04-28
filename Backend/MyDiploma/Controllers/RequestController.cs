using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MyDiploma.Data;
using MyDiploma.Entities;
using MyDiploma.Models.Contacts;
using MyDiploma.Models.Request;
using MyDiploma.Models.Search;
using System.Linq;
using System.Text.Json;
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

        [HttpGet("requests")]
        public async Task<IActionResult> GetRequests()
        {
            Entities.User currentUser = (Entities.User)HttpContext.Items["User"];
            return Ok(JsonSerializer.Serialize(await _context.Contacts.Include(o => o.Sender).Include(o=>o.Receiver).Where(o => o.ReceiverId == currentUser.Id && o.IsApproved == false).ToListAsync()));
        }

        [HttpPost("decide")]
        public async Task<IActionResult> DecideAsync(DecisionRequest decision)
        {
            var request = await _context.Contacts.FirstOrDefaultAsync(o => o.ReceiverId == decision.ReceiverId && o.SenderId == decision.SenderId);
            if (request == null)
                return BadRequest();
            if (decision.Approved)
            {
                request.IsApproved = true;
                _context.Contacts.Update(request);
            }
            else
            {
                _context.Contacts.Remove(request);
            }
            await _context.SaveChangesAsync();
            return Ok();
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
