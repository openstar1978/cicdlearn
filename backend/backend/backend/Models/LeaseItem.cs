using System;
using System.Collections.Generic;

#nullable disable

namespace backend.Models
{
    public partial class LeaseItem
    {
        public int Id { get; set; }
        public int LeaseId { get; set; }
        public int EquipmentTypeId { get; set; }
        public string Make { get; set; }
        public int EquipmentConditionId { get; set; }
        public string Description { get; set; }
        public string SerialNo { get; set; }
        public int Quantity { get; set; }
        public bool Inactive { get; set; }

        public virtual EquipmentCondition EquipmentCondition { get; set; }
        public virtual EquipmentType EquipmentType { get; set; }
        public virtual Lease Lease { get; set; }
    }
}
