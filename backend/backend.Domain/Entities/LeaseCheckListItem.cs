using System;
using System.Collections.Generic;

#nullable disable

namespace backend.Domain.Entities
{
    public partial class LeaseCheckListItem
    {
        public int Id { get; set; }
        public int LeaseId { get; set; }
        public string Category { get; set; }
        public int CheckListItemId { get; set; }
        public bool Checked { get; set; }
        public string Notes { get; set; }
        public DateTime? EditedDate { get; set; }
        public string EditedBy { get; set; }

        public virtual CheckListItem CheckListItem { get; set; }
        public virtual Lease Lease { get; set; }
    }
}
