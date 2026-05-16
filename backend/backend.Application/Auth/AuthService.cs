using System;
using System.Linq;
using System.Threading.Tasks;
using backend.Application.Abstractions.Authentication;
using backend.Application.Abstractions.Persistence;
using Microsoft.EntityFrameworkCore;

namespace backend.Application.Auth
{
    public interface IAuthService
    {
        Task<LoginResult> LoginAsync(LoginDto dto);
    }

    public class AuthService : IAuthService
    {
        private readonly IApplicationDbContext _context;
        private readonly IJwtTokenService _jwtTokenService;

        public AuthService(IApplicationDbContext context, IJwtTokenService jwtTokenService)
        {
            _context = context;
            _jwtTokenService = jwtTokenService;
        }

        public async Task<LoginResult> LoginAsync(LoginDto dto)
        {
            var user = await _context.Users
                .Include(x => x.Role)
                .FirstOrDefaultAsync(x => x.Username == dto.UserName && x.Inactive == false);

            if (user == null || dto.Password != user.Pword)
            {
                return null;
            }

            var roleName = user.Role?.Description;
            var isAdmin = IsAdminRole(roleName);
            var permissions = isAdmin
                ? new[] { "*" }.ToList()
                : await _context.UserPermissions
                    .Where(up => up.UserId == user.Id)
                    .Select(up => up.Permission.Name)
                    .Union(_context.RolePermissions
                        .Where(rp => rp.RoleId == user.RoleId)
                        .Select(rp => rp.Permission.Name))
                    .Distinct()
                    .ToListAsync();

            return new LoginResult(_jwtTokenService.GenerateToken(user, permissions, roleName));
        }

        private static bool IsAdminRole(string roleName)
        {
            return string.Equals(roleName, "Admin", StringComparison.OrdinalIgnoreCase) ||
                string.Equals(roleName, "Administrator", StringComparison.OrdinalIgnoreCase);
        }
    }
}
