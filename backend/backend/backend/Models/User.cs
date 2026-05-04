using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

#nullable disable

namespace backend.Models
{
    [Table("Users", Schema = "dbo")]
    public partial class Users
    {
        [Key]
        [Column("Id")]
        public int Id { get; set; }
        [Column("Username")]
        public string Username { get; set; }
        public int RoleId { get; set; }
        public string RealName { get; set; }
        public string Signature { get; set; }
        public string Position { get; set; }
        public string Department { get; set; }
        public bool Inactive { get; set; }
        public string Email { get; set; }
        public string Pword { get; set; }


        public virtual Role Role { get; set; }
    }
}
