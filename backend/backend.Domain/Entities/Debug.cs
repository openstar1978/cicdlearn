using System;
using System.Collections.Generic;

#nullable disable

namespace backend.Domain.Entities
{
    public partial class Debug
    {
        public int Id { get; set; }
        public DateTime Timestamp { get; set; }
        public string Message { get; set; }
    }
}
