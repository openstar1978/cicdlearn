using System;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;

namespace backend.Authorization
{
    public class PermissionAuthorizationHandler : AuthorizationHandler<PermissionRequirement>
    {
        protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, PermissionRequirement requirement)
        {
            var isAdmin = context.User.Claims.Any(claim =>
                claim.Type == ClaimTypes.Role && IsAdminRole(claim.Value));

            var hasPermission = context.User.HasClaim("permission", "*") ||
                context.User.HasClaim("permission", requirement.Permission);

            if (isAdmin || hasPermission)
            {
                context.Succeed(requirement);
            }

            return Task.CompletedTask;
        }

        private static bool IsAdminRole(string roleName)
        {
            return string.Equals(roleName, "Admin", StringComparison.OrdinalIgnoreCase) ||
                string.Equals(roleName, "Administrator", StringComparison.OrdinalIgnoreCase);
        }
    }
}
