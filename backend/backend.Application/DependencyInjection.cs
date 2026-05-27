using backend.Application.Auth;
using backend.Application.Customers;
using backend.Application.Permissions;
using backend.Application.Roles;
using backend.Application.Users;
using Microsoft.Extensions.DependencyInjection;

namespace backend.Application
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddApplication(this IServiceCollection services)
        {
            services.AddScoped<IAuthService, AuthService>();
            services.AddScoped<IRoleService, RoleService>();
            services.AddScoped<IUserService, UserService>();
            services.AddScoped<IPermissionService, PermissionService>();
            services.AddScoped<ICustomerSearchService, CustomerSearchService>();
            return services;
        }
    }
}
