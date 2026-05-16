using System.Collections.Generic;
using System.Linq;
using backend.Application.Abstractions.Persistence;
using backend.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace backend.Application.Permissions
{
    public interface IPermissionService
    {
        IEnumerable<PermissionDto> GetAll();
        IEnumerable<PermissionDto> GetForUser(int userId);
        bool AssignToUser(int userId, IEnumerable<int> permissionIds);
    }

    public class PermissionService : IPermissionService
    {
        private readonly IApplicationDbContext _context;

        public PermissionService(IApplicationDbContext context)
        {
            _context = context;
        }

        public IEnumerable<PermissionDto> GetAll()
        {
            return _context.Permissions
                .OrderBy(permission => permission.Name)
                .Select(permission => new PermissionDto
                {
                    Id = permission.Id,
                    Name = permission.Name
                })
                .ToList();
        }

        public IEnumerable<PermissionDto> GetForUser(int userId)
        {
            return _context.UserPermissions
                .Where(userPermission => userPermission.UserId == userId)
                .Select(userPermission => new PermissionDto
                {
                    Id = userPermission.Permission.Id,
                    Name = userPermission.Permission.Name
                })
                .OrderBy(permission => permission.Name)
                .ToList();
        }

        public bool AssignToUser(int userId, IEnumerable<int> permissionIds)
        {
            if (!_context.Users.Any(user => user.Id == userId))
            {
                return false;
            }

            var selectedPermissionIds = (permissionIds ?? Enumerable.Empty<int>()).Distinct().ToList();
            var validPermissionIds = _context.Permissions
                .Where(permission => selectedPermissionIds.Contains(permission.Id))
                .Select(permission => permission.Id)
                .ToList();

            var currentPermissions = _context.UserPermissions
                .Where(userPermission => userPermission.UserId == userId)
                .ToList();

            foreach (var userPermission in currentPermissions)
            {
                _context.UserPermissions.Remove(userPermission);
            }

            foreach (var permissionId in validPermissionIds)
            {
                _context.UserPermissions.Add(new UserPermission
                {
                    UserId = userId,
                    PermissionId = permissionId
                });
            }

            _context.SaveChanges();
            return true;
        }
    }
}