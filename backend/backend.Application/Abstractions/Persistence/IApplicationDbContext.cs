using System.Threading;
using System.Threading.Tasks;
using backend.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace backend.Application.Abstractions.Persistence
{
    public interface IApplicationDbContext
    {
        DbSet<backend.Domain.Entities.Users> Users { get; set; }
        DbSet<Role> Roles { get; set; }
        DbSet<Permission> Permissions { get; set; }
        DbSet<RolePermission> RolePermissions { get; set; }
        DbSet<UserPermission> UserPermissions { get; set; }
        DbSet<Customer> Customers { get; set; }
        DbSet<Lease> Leases { get; set; }
        DbSet<LeasePaymentPoint> LeasePaymentPoints { get; set; }
        Task<int> SaveChangesAsync(CancellationToken cancellationToken = default);
        int SaveChanges();
    }
}
