using System;
using System.Collections.Generic;

#nullable disable

namespace backend.Models
{
    public partial class ChangeLog
    {
        public int Id { get; set; }
        public string TableName { get; set; }
        public int RecordId { get; set; }
        public string Change { get; set; }
        public string Username { get; set; }
        public DateTime ModificationTimestamp { get; set; }
    }
}
