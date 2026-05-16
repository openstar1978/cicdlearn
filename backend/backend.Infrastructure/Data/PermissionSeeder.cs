using System.Linq;
using backend.Application.Permissions;
using backend.Domain.Entities;

namespace backend.Infrastructure.Data
{
    public static class PermissionSeeder
    {
        private static readonly string[] Permissions =
        {
            PermissionNames.UsersView,
            PermissionNames.UsersCreate,
            PermissionNames.UsersUpdate,
            PermissionNames.UsersDelete,
            PermissionNames.UsersManagePermissions,
            PermissionNames.RolesView,
            PermissionNames.PermissionsView,
            PermissionNames.SchoolsView,
            PermissionNames.SchoolsCreate,
            PermissionNames.SchoolsUpdate,
            PermissionNames.SchoolsDelete,
            PermissionNames.LeasesView,
            PermissionNames.LeasesCreate,
            PermissionNames.LeasesUpdate,
            PermissionNames.LeasesDelete,
            PermissionNames.PaymentPointsView,
            PermissionNames.PaymentPointsCreate,
            PermissionNames.PaymentPointsUpdate,
            PermissionNames.PaymentPointsDelete,
            PermissionNames.CreditPointsView,
            PermissionNames.CreditPointsCreate,
            PermissionNames.CreditPointsUpdate,
            PermissionNames.CreditPointsDelete
        };

        public static void Seed(ApplicationDbContext context)
        {
            foreach (var permissionName in Permissions)
            {
                if (!context.Permissions.Any(permission => permission.Name == permissionName))
                {
                    context.Permissions.Add(new Permission
                    {
                        Name = permissionName
                    });
                }
            }

            context.SaveChanges();
        }
    }
}
