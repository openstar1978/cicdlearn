using System;
using System.Collections.Generic;
using System.Linq;
using backend.Application.Abstractions.Persistence;
using backend.Application.Common;
using Microsoft.EntityFrameworkCore;

namespace backend.Application.Customers
{
    public interface ICustomerSearchService
    {
        PagedResult<CustomerSearchDto> GetBySchool(string search, int page, int pageSize);
        PagedResult<LeaseSearchDto> GetByLease(string search, int page, int pageSize);
    }

    public class CustomerSearchService : ICustomerSearchService
    {
        private readonly IApplicationDbContext _context;

        public CustomerSearchService(IApplicationDbContext context)
        {
            _context = context;
        }

        public PagedResult<CustomerSearchDto> GetBySchool(string search, int page, int pageSize)
        {
            var query = _context.Customers.AsQueryable();
            query = ApplyCustomerSearch(query, search);
            var safePage = GetSafePage(page);
            var safePageSize = GetSafePageSize(pageSize);
            var total = query.Count();

            var data = query
                .OrderBy(customer =>  customer.InvName )
                .Skip((safePage - 1) * safePageSize)
                .Take(safePageSize)
                .Select(customer => new CustomerSearchDto
                {
                    Id = customer.Id,
                    AccountRef = customer.AccountRef,
                    Name = customer.SageName ?? customer.InvName ?? customer.AccountRef,
                    Town = customer.SageAddress3 ?? customer.InvAddress3,
                    County = customer.SageAddress4 ?? customer.InvAddress4,
                    Postcode = customer.SageAddress5 ?? customer.InvAddress5,
                    Contact = null,
                    Phone = null,
                    Balance = customer.SageBalance ?? 0
                })
                .ToList();

            return new PagedResult<CustomerSearchDto>
            {
                Data = data,
                Total = total
            };
        }

        public PagedResult<LeaseSearchDto> GetByLease(string search, int page, int pageSize)
        {
            var query = _context.Leases.AsQueryable();
            query = ApplyLeaseSearch(query, search);
            var safePage = GetSafePage(page);
            var safePageSize = GetSafePageSize(pageSize);
            var total = query.Count();

            var data = query
                .OrderBy(lease => lease.Id)
                .Skip((safePage - 1) * safePageSize)
                .Take(safePageSize)
                .Select(lease => new LeaseSearchDto
                {
                    Id = lease.Id,
                    AccountRef = lease.AccountRef,
                    Name = lease.Customer.SageName ?? lease.Customer.InvName ?? lease.AccountRef,
                    Town = lease.Customer.SageAddress3 ?? lease.Customer.InvAddress3,
                    County = lease.Customer.SageAddress4 ?? lease.Customer.InvAddress4,
                    Postcode = lease.Customer.SageAddress5 ?? lease.Customer.InvAddress5,
                    Contact = null,
                    Phone = null,
                    Balance = lease.Customer.SageBalance ?? 0,
                    LeaseId = lease.Id,
                    LeaseDesc = lease.Description ?? lease.InvoiceDescription,
                    StartDate = lease.StartDate,
                    EndDate = lease.EndDate,
                    PaymentAmount = lease.PaymentAmount,
                    LeaseStatus = lease.Status.HasValue ? lease.Status.Value.ToString() : null,
                    Termination = lease.TerminationNotified ? "YES" : "NO"
                })
                .ToList();

            return new PagedResult<LeaseSearchDto>
            {
                Data = data,
                Total = total
            };
        }

        private static IQueryable<backend.Domain.Entities.Customer> ApplyCustomerSearch(
    IQueryable<backend.Domain.Entities.Customer> query,
    string search)
        {
            if (string.IsNullOrWhiteSpace(search))
            {
                return query;
            }

            var term = $"%{search.Trim()}%";

            return query.Where(customer =>

                (!string.IsNullOrEmpty(customer.AccountRef) &&
                 EF.Functions.Like(customer.AccountRef, term))

                ||

                (!string.IsNullOrEmpty(customer.SageName) &&
                 EF.Functions.Like(customer.SageName, term))

                ||

                (!string.IsNullOrEmpty(customer.InvName) &&
                 EF.Functions.Like(customer.InvName, term))

                ||

                (!string.IsNullOrEmpty(customer.SageAddress3) &&
                 EF.Functions.Like(customer.SageAddress3, term))

                ||

                (!string.IsNullOrEmpty(customer.SageAddress4) &&
                 EF.Functions.Like(customer.SageAddress4, term))

                ||

                (!string.IsNullOrEmpty(customer.SageAddress5) &&
                 EF.Functions.Like(customer.SageAddress5, term))

                ||

                (!string.IsNullOrEmpty(customer.InvAddress3) &&
                 EF.Functions.Like(customer.InvAddress3, term))

                ||

                (!string.IsNullOrEmpty(customer.InvAddress4) &&
                 EF.Functions.Like(customer.InvAddress4, term))

                ||

                (!string.IsNullOrEmpty(customer.InvAddress5) &&
                 EF.Functions.Like(customer.InvAddress5, term))
            );
        }

        private static IQueryable<backend.Domain.Entities.Lease> ApplyLeaseSearch(
            IQueryable<backend.Domain.Entities.Lease> query,
            string search)
        {
            if (string.IsNullOrWhiteSpace(search))
            {
                return query;
            }

            var term = search.Trim();
            var hasLeaseId = int.TryParse(term, out var leaseId);
            return query.Where(lease =>
                (hasLeaseId && lease.Id == leaseId) ||
                lease.AccountRef.Contains(term) ||
                lease.Description.Contains(term) ||
                lease.InvoiceDescription.Contains(term) ||
                lease.Customer.SageName.Contains(term) ||
                lease.Customer.InvName.Contains(term));
        }

        private static int GetSafePageSize(int pageSize)
        {
            if (pageSize <= 0)
            {
                return 50;
            }

            return Math.Min(pageSize, 200);
        }

        private static int GetSafePage(int page)
        {
            return page <= 0 ? 1 : page;
        }
    }
}
