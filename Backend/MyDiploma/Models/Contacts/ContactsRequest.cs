using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MyDiploma.Models.Contacts
{
    public class ContactsRequest
    {
        public int SenderId { get; set; }
        public int ReceiverId { get; set; }
    }
}
