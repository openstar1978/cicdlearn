using System.Collections.Generic;
using System.Linq;
using backend.Application.Abstractions.Persistence;

namespace backend.Application.Roles
{
    public interface IRoleService
    {
        IEnumerable<RoleDto> GetAll();
    }

    public class RoleService : IRoleService
    {
        private readonly IApplicationDbContext _context;

        public RoleService(IApplicationDbContext context)
        {
            _context = context;
        }

        public IEnumerable<RoleDto> GetAll()
        {
            return _context.Roles
                .Select(role => new RoleDto
                {
                    Id = role.Id,
                    Description = role.Description
                })
                .ToList();
        }
    }
}