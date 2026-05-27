using System;

namespace backend.Application.Customers
{
    public class CustomerSearchDto
    {
        public int Id { get; set; }
        public string AccountRef { get; set; }
        public string Name { get; set; }
        public string Town { get; set; }
        public string County { get; set; }
        public string Postcode { get; set; }
        public string Contact { get; set; }
        public string Phone { get; set; }
        public decimal Balance { get; set; }
    }

    public class LeaseSearchDto : CustomerSearchDto
    {
        public int LeaseId { get; set; }
        public string LeaseDesc { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public decimal? PaymentAmount { get; set; }
        public string LeaseStatus { get; set; }
        public string Termination { get; set; }
    }
}
