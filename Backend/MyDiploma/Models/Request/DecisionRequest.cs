using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MyDiploma.Models.Request
{
    public class DecisionRequest
    {
        public int SenderId { get; set; }
        public int ReceiverId { get; set; }

        public bool Approved { get; set; }
    }
}
