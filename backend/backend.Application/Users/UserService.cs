using System.Collections.Generic;
using System.Linq;
using backend.Application.Abstractions.Persistence;
using backend.Application.Common;
using backend.Application.DTOs;
using backend.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace backend.Application.Users
{
    public interface IUserService
    {
        PagedResult<UserDto> GetAll(PagedRequest request);
        backend.Domain.Entities.Users Create(CreateUserDto input);
        backend.Domain.Entities.Users Update(UpdateUserDto input);
        bool Delete(int id);
    }

    public class UserService : IUserService
    {
        private readonly IApplicationDbContext _context;

        public UserService(IApplicationDbContext context)
        {
            _context = context;
        }

        public PagedResult<UserDto> GetAll(PagedRequest request)
        {
            var query = _context.Users.AsQueryable();
            var columnMap = new Dictionary<string, string>
            {
                { "username", "Username" },
                { "email", "Email" },
                { "department", "Department" },
                { "roleId", "RoleId" },
                { "inactive", "Inactive" }
            };

            var sortField = columnMap.ContainsKey(request.SortField) ? columnMap[request.SortField] : "Id";
            query = request.SortOrder == "asc"
                ? query.OrderBy(e => EF.Property<object>(e, sortField))
                : query.OrderByDescending(e => EF.Property<object>(e, sortField));

            var total = query.Count();
            var data = query
                .Skip((request.Page - 1) * request.PageSize)
                .Take(request.PageSize)
                .Select(u => new UserDto
                {
                    Id = u.Id,
                    Username = u.Username,
                    Email = u.Email,
                    Department = u.Department,
                    RoleId = u.RoleId,
                    Inactive = u.Inactive
                })
                .ToList();

            return new PagedResult<UserDto>
            {
                Data = data,
                Total = total
            };
        }

        public backend.Domain.Entities.Users Create(CreateUserDto input)
        {
            var user = new backend.Domain.Entities.Users
            {
                Username = input.Username,
                Pword = BCrypt.Net.BCrypt.HashPassword(input.Pword),
                RoleId = input.RoleId,
                RealName = input.RealName,
                Signature = input.Signature,
                Position = input.Position,
                Department = input.Department,
                Email = input.Email,
                Inactive = false
            };

            _context.Users.Add(user);
            _context.SaveChanges();
            return user;
        }

        public backend.Domain.Entities.Users Update(UpdateUserDto input)
        {
            var user = _context.Users.Find(input.Id);
            if (user == null)
            {
                return null;
            }

            user.Username = input.Username;
            user.RoleId = input.RoleId;
            user.RealName = input.RealName;
            user.Signature = input.Signature;
            user.Position = input.Position;
            user.Department = input.Department;
            user.Email = input.Email;
            user.Inactive = input.Inactive;

            _context.SaveChanges();
            return user;
        }

        public bool Delete(int id)
        {
            var user = _context.Users.Find(id);
            if (user == null)
            {
                return false;
            }

            _context.Users.Remove(user);
            _context.SaveChanges();
            return true;
        }
    }
}