namespace MyDiploma.Entities
{
    public class Contact
    {
        public int SenderId { get; set; }
        public User Sender { get; set; }
        public int ReceiverId { get; set; }
        public User Receiver { get; set; }

        public bool IsApproved { get; set; } = false;
    }
}
