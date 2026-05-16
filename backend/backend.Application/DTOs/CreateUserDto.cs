using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Application.DTOs
{
    public class UserDto
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
        public string Department { get; set; }
        public int RoleId { get; set; }
        public bool Inactive { get; set; }
    }
    public class CreateUserDto
    {
        public string Username { get; set; }
        public string Pword { get; set; }
        public int RoleId { get; set; }
        public string RealName { get; set; }
        public string Signature { get; set; }
        public string Position { get; set; }
        public string Department { get; set; }
        public string Email { get; set; }
    }
    public class UpdateUserDto
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public int RoleId { get; set; }
        public string RealName { get; set; }
        public string Signature { get; set; }
        public string Position { get; set; }
        public string Department { get; set; }
        public bool Inactive { get; set; }
        public string Email { get; set; }
    }
}
