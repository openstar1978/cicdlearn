using backend.Application.Customers;
using backend.Application.Permissions;
using backend.Authorization;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class CustomersController : ControllerBase
    {
        private readonly ICustomerSearchService _customerSearchService;

        public CustomersController(ICustomerSearchService customerSearchService)
        {
            _customerSearchService = customerSearchService;
        }

        [HttpGet("by-school")]
        [HasPermission(PermissionNames.SchoolsView)]
        public IActionResult GetBySchool(
            [FromQuery] string search,
            [FromQuery] int page = 1,
            [FromQuery] int pageSize = 25)
        {
            return Ok(_customerSearchService.GetBySchool(search, page, pageSize));
        }

        [HttpGet("by-lease")]
        [HasPermission(PermissionNames.LeasesView)]
        public IActionResult GetByLease(
            [FromQuery] string search,
            [FromQuery] int page = 1,
            [FromQuery] int pageSize = 25)
        {
            return Ok(_customerSearchService.GetByLease(search, page, pageSize));
        }
    }
}
