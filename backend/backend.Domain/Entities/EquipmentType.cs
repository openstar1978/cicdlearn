using System;
using System.Collections.Generic;

#nullable disable

namespace backend.Domain.Entities
{
    public partial class EquipmentType
    {
        public EquipmentType()
        {
            LeaseItems = new HashSet<LeaseItem>();
        }

        public int Id { get; set; }
        public string Key { get; set; }
        public string Description { get; set; }
        public bool Inactive { get; set; }

        public virtual ICollection<LeaseItem> LeaseItems { get; set; }
    }
}
