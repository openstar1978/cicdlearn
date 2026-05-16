using System;
using System.Collections.Generic;

#nullable disable

namespace backend.Domain.Entities
{
    public partial class Autochasing
    {
        public string Username { get; set; }
        public DateTime? Lastautochasing { get; set; }
        public string Status { get; set; }
    }
}
