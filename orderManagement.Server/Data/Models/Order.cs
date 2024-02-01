using System.ComponentModel.DataAnnotations;

namespace orderManagement.Server.Data.Models
{
    public class Order
    {
        [Key]
        public int OrderId { get; set; }
        public int ClientId { get; set; }
        public string ClientEmail { get; set; }
        public int[] Products { get; set; }
        public int Quantity { get; set; }
    }
}
