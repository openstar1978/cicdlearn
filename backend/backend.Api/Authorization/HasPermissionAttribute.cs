using Microsoft.AspNetCore.Authorization;

namespace backend.Authorization
{
    public class HasPermissionAttribute : AuthorizeAttribute
    {
        public HasPermissionAttribute(string permission)
        {
            Policy = PermissionAuthorizationPolicyProvider.PolicyPrefix + permission;
        }
    }
}