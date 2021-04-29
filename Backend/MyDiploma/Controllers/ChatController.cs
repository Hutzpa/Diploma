using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MyDiploma.Data;
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
    public class ChatController : ControllerBase
    {
        private DiplomaContext _context;

        public ChatController(DiplomaContext context)
        {
            _context = context;
        }

        //Сохранить сообщение

        //Получить все сообщения в диалоге 

        //Выйти из диалога 

        //Добавить в диалог

        //Получить всех участников диалога 
    }
}
