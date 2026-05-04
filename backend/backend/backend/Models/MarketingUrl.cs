using System;
using System.Collections.Generic;

#nullable disable

namespace backend.Models
{
    public partial class MarketingUrl
    {
        public int Id { get; set; }
        public string Description { get; set; }
        public string Urlstr { get; set; }
        public string Subject { get; set; }
        public string Body { get; set; }
        public bool? Activetoday { get; set; }
        public string ResultUrl { get; set; }
        public bool? Deleted { get; set; }
        public string Mdescription { get; set; }
        public string Urlemailtext { get; set; }
    }
}
