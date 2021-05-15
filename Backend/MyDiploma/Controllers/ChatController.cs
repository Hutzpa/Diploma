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
            //Находим все диалоги(только ОДИНОЧНЫЕ) в которых участвует пользователь 1 и 2. Находим общий диалог среди результатов
            var dialogsOfUser1 = await _context.Participants.Include(o => o.ChatRoom).Where(o => o.UserId == _dialog.User1 && o.ChatRoom.RoomType == Entities.Enums.RoomType.Dialog).Select(o => o.ChatRoom).ToListAsync();
            var dialogsOfUser2 = await _context.Participants.Include(o => o.ChatRoom).Where(o => o.UserId == _dialog.User2 && o.ChatRoom.RoomType == Entities.Enums.RoomType.Dialog).Select(o => o.ChatRoom).ToListAsync();
            var dialog = dialogsOfUser1.Intersect(dialogsOfUser2).First();


            return Ok(JsonSerializer.Serialize(dialog));
        }

        [HttpPost("GetMessages")]
        public IActionResult GetDialogMessages(int dialogId)
        {
            return null;
        }

        //Сохранить сообщение

        //Получить все сообщения в диалоге 

        //Выйти из диалога 

        //Добавить в диалог

        //Получить всех участников диалога 
    }
}
