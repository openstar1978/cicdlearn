using backend.Application.Permissions;
using backend.Authorization;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class PermissionsController : ControllerBase
    {
        private readonly IPermissionService _permissionService;

        public PermissionsController(IPermissionService permissionService)
        {
            _permissionService = permissionService;
        }

        [HttpGet]
        [HasPermission(PermissionNames.PermissionsView)]
        public IActionResult GetAll()
        {
            return Ok(_permissionService.GetAll());
        }

        [HttpGet("users/{userId}")]
        [HasPermission(PermissionNames.UsersManagePermissions)]
        public IActionResult GetForUser(int userId)
        {
            return Ok(_permissionService.GetForUser(userId));
        }

        [HttpPut("users/{userId}")]
        [HasPermission(PermissionNames.UsersManagePermissions)]
        public IActionResult AssignToUser(int userId, AssignUserPermissionsDto input)
        {
            if (!_permissionService.AssignToUser(userId, input?.PermissionIds))
            {
                return NotFound();
            }

            return Ok();
        }
    }
}