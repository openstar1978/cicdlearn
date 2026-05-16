using System;
using System.Collections.Generic;

#nullable disable

namespace backend.Domain.Entities
{
    public partial class BusinessSource
    {
        public BusinessSource()
        {
            InverseParent = new HashSet<BusinessSource>();
            LeaseBusinessSourceItems = new HashSet<Lease>();
            LeaseBusinessSources = new HashSet<Lease>();
        }

        public int Id { get; set; }
        public int? ParentId { get; set; }
        public string Key { get; set; }
        public string Description { get; set; }
        public bool Inactive { get; set; }
        public string Puttype { get; set; }
        public decimal? Putvalue { get; set; }
        public string Putby { get; set; }
        public bool? NoRrr { get; set; }

        public virtual BusinessSource Parent { get; set; }
        public virtual ICollection<BusinessSource> InverseParent { get; set; }
        public virtual ICollection<Lease> LeaseBusinessSourceItems { get; set; }
        public virtual ICollection<Lease> LeaseBusinessSources { get; set; }
    }
}
