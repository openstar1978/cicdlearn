using System;
using System.Collections.Generic;

#nullable disable

namespace backend.Domain.Entities
{
    public partial class Sector
    {
        public Sector()
        {
            CustomerLegalStatuses = new HashSet<Customer>();
            CustomerSectors = new HashSet<Customer>();
            InverseParent = new HashSet<Sector>();
            LeaseLegalStatuses = new HashSet<Lease>();
            LeaseSectors = new HashSet<Lease>();
        }

        public int Id { get; set; }
        public int? ParentId { get; set; }
        public string Key { get; set; }
        public string Description { get; set; }
        public bool Inactive { get; set; }

        public virtual Sector Parent { get; set; }
        public virtual ICollection<Customer> CustomerLegalStatuses { get; set; }
        public virtual ICollection<Customer> CustomerSectors { get; set; }
        public virtual ICollection<Sector> InverseParent { get; set; }
        public virtual ICollection<Lease> LeaseLegalStatuses { get; set; }
        public virtual ICollection<Lease> LeaseSectors { get; set; }
    }
}
