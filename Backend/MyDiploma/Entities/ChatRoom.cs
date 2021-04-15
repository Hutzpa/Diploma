using MyDiploma.Entities.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MyDiploma.Entities
{
    public class ChatRoom
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public RoomType RoomType { get; set; }

        public List<Participants> Participants { get; set; }

        public List<Message> Messages { get; set; }
    }
}
