using System;
using System.Collections.Generic;

#nullable disable

namespace backend.Models
{
    public partial class Debug
    {
        public int Id { get; set; }
        public DateTime Timestamp { get; set; }
        public string Message { get; set; }
    }
}
