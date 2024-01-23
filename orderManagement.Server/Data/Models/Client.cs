using System.ComponentModel.DataAnnotations;

namespace orderManagement.Server.Data.Models

{
    public class Client
    {
        [Key]
        public int ClientId { get; set; }
        public string? Name { get; set; }
        public string Surname { get; set; }
        public string AddressType { get; set; } = "Homeless";
        public string StreetAddress { get; set; }
        public string Suburb { get; set; }
        public string City { get; set; }
        public string PostalCode { get; set; }
    }
}
