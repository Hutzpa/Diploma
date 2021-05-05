using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MyDiploma.Data;
using MyDiploma.Models.Chat;
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
    public class ChatController : ControllerBase
    {
        private DiplomaContext _context;

        public ChatController(DiplomaContext context)
        {
            _context = context;
        }
        /// <summary>
        /// Получаем всё участие в диалогах для первого и второго пользователя и находим их общий диалог
        /// </summary>
        /// <returns></returns>
        [HttpPost("GetDialog")]
        public async Task<IActionResult> GetDialogAsync(GetDialog _dialog)
        {
            var participant1 = await _context.Participants.FirstOrDefaultAsync(o => o.UserId == _dialog.User1);
            var participant2 = await _context.Participants.FirstOrDefaultAsync(o => o.UserId == _dialog.User2);
            var dialogsOfUser1 = _context.ChatRooms.Where(o => o.Participants.Contains(participant1) && o.RoomType == Entities.Enums.RoomType.Dialog);
            var dialogsOfUser2 = _context.ChatRooms.Where(o => o.Participants.Contains(participant2) && o.RoomType == Entities.Enums.RoomType.Dialog);
            var dialog = dialogsOfUser1.Intersect(dialogsOfUser2).First();
            return Ok(JsonSerializer.Serialize(dialog));
        }




        //Сохранить сообщение

        //Получить все сообщения в диалоге 

        //Выйти из диалога 

        //Добавить в диалог

        //Получить всех участников диалога 
    }
}
