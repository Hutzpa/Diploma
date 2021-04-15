using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MyDiploma.Data;
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

        public RequestController(DiplomaContext context)
        {
            _context = context;
        }



        [HttpPost("search")]
        public async Task<IActionResult> SearchAsync(SearchRequest request)
        {
            var data = await _context.Users.Where(o => o.FirstName.Contains(request.Query) || o.LastName.Contains(request.Query) || o.Username.Contains(request.Query)).ToListAsync();
            return Ok(data);
        }

        [HttpPost("send")]
        public IActionResult SendContactsRequest(ContactsRequest request)
        {
            return BadRequest();
        }
    }
}
