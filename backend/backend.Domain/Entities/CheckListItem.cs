using System;
using System.Collections.Generic;

#nullable disable

namespace backend.Domain.Entities
{
    public partial class CheckListItem
    {
        public CheckListItem()
        {
            InverseParent = new HashSet<CheckListItem>();
            LeaseCheckListItems = new HashSet<LeaseCheckListItem>();
        }

        public int Id { get; set; }
        public int? ParentId { get; set; }
        public int? SortOrder { get; set; }
        public string Key { get; set; }
        public string Description { get; set; }
        public bool Inactive { get; set; }

        public virtual CheckListItem Parent { get; set; }
        public virtual ICollection<CheckListItem> InverseParent { get; set; }
        public virtual ICollection<LeaseCheckListItem> LeaseCheckListItems { get; set; }
    }
}
