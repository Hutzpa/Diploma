using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MyDiploma.Entities
{
    public class Message
    {
        public int Id { get; set; }

        public int ChatRoomId {get;set;}
        public ChatRoom ChatRoom { get; set; }

        public int UserId { get; set; }
        public User User { get; set; }
        public string Text { get; set; }

        public DateTime SendingTime { get; set; } = DateTime.UtcNow;
    }
}
