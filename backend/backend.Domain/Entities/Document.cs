using System;
using System.Collections.Generic;

#nullable disable

namespace backend.Domain.Entities
{
    public partial class Document
    {
        public Document()
        {
            LeaseHistories = new HashSet<LeaseHistory>();
        }

        public int Id { get; set; }
        public string AccountRef { get; set; }
        public int? LeaseId { get; set; }
        public string Description { get; set; }
        public string FileExtension { get; set; }
        public bool Inactive { get; set; }

        public virtual Lease Lease { get; set; }
        public virtual ICollection<LeaseHistory> LeaseHistories { get; set; }
    }
}
