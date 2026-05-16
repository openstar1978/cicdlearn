using backend.Application.Permissions;
using backend.Application.Roles;
using backend.Authorization;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class RolesController : ControllerBase
    {
        private readonly IRoleService _roleService;

        public RolesController(IRoleService roleService)
        {
            _roleService = roleService;
        }

        [HttpGet]
        [HasPermission(PermissionNames.RolesView)]
        public IActionResult GetAll()
        {
            return Ok(_roleService.GetAll());
        }
    }
}