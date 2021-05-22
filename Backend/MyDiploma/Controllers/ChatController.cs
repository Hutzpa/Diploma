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


        [HttpPost("GetCompanionName")]
        public async Task<IActionResult> GetCompanionNameAsync(GetDialogId _dialogId)
        {
            int dialogId = _dialogId.DialogId;

            if (dialogId == 0)
                return BadRequest();
            Entities.User currentUser = (Entities.User)HttpContext.Items["User"];
            var companions = _context.ChatRooms.Include(o => o.Participants).ThenInclude(o=>o.User).FirstOrDefaultAsync(o => o.Id == dialogId)
                .GetAwaiter().GetResult().Participants;
            companions.Remove(await _context.Participants.FirstOrDefaultAsync(o => o.ChatRoomId == dialogId && o.UserId == currentUser.Id));
            var result = companions.First().User;
            return Ok(new {firstName = result.FirstName, lastName = result.LastName });
        }

        [HttpPost("SaveMessage")]
        public async Task<IActionResult> SaveMessageAsync(ChatMessage message)
        {
            Entities.User currentUser = (Entities.User)HttpContext.Items["User"];
            await _context.Messages.AddAsync(new Entities.Message
            {
                ChatRoomId = message.ChatRoomId,
                UserId = currentUser.Id,
                Text = message.Text,
            });
            await _context.SaveChangesAsync();
            return Ok();
        }

        [HttpPost("GetMessages")]
        public async Task<IActionResult> GetAllMessagesAsync(GetDialogId dialogId)
        {
            var messages = await _context.Messages.Include(o=>o.User).Where(o => o.ChatRoomId == dialogId.DialogId).ToListAsync();
            return Ok(JsonSerializer.Serialize(messages));
        }
        //Получить все сообщения в диалоге 

        //Выйти из диалога 

        //Добавить в диалог

        //Получить всех участников диалога 
    }
}
