using System;
using System.Collections.Generic;

#nullable disable

namespace backend.Domain.Entities
{
    public partial class Report
    {
        public int Id { get; set; }
        public string Description { get; set; }
        public string Type { get; set; }
        public byte[] GridData { get; set; }
        public string CreatedBy { get; set; }
        public DateTime CreatedDate { get; set; }
        public bool Inactive { get; set; }
    }
}
