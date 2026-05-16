using System.Collections.Generic;

namespace backend.Application.Abstractions.Authentication
{
    public interface IJwtTokenService
    {
        string GenerateToken(backend.Domain.Entities.Users user, IEnumerable<string> permissions, string roleName);
    }
}