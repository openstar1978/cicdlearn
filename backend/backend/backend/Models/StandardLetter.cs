using System;
using System.Collections.Generic;

#nullable disable

namespace backend.Models
{
    public partial class StandardLetter
    {
        public StandardLetter()
        {
            ChasingLetters = new HashSet<ChasingLetter>();
        }

        public int Id { get; set; }
        public byte Type { get; set; }
        public string Description { get; set; }
        public bool Inactive { get; set; }

        public virtual ICollection<ChasingLetter> ChasingLetters { get; set; }
    }
}
