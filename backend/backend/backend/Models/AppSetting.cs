using System;
using System.Collections.Generic;

#nullable disable

namespace backend.Models
{
    public partial class AppSetting
    {
        public int Id { get; set; }
        public string Description { get; set; }
        public string Value { get; set; }
    }
}
