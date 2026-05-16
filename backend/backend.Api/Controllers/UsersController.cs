using backend.Application.Common;
using backend.Application.DTOs;
using backend.Application.Permissions;
using backend.Application.Users;
using backend.Authorization;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IUserService _userService;

        public UsersController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpGet]
        [HasPermission(PermissionNames.UsersView)]
        public IActionResult GetAll([FromQuery] PagedRequest request)
        {
            return Ok(_userService.GetAll(request));
        }

        [HttpPost]
        [HasPermission(PermissionNames.UsersCreate)]
        public IActionResult Create(CreateUserDto input)
        {
            return Ok(_userService.Create(input));
        }

        [HttpPut]
        [HasPermission(PermissionNames.UsersUpdate)]
        public IActionResult Update(UpdateUserDto input)
        {
            var user = _userService.Update(input);
            if (user == null)
            {
                return NotFound();
            }

            return Ok(user);
        }

        [HttpDelete("{id}")]
        [HasPermission(PermissionNames.UsersDelete)]
        public IActionResult Delete(int id)
        {
            if (!_userService.Delete(id))
            {
                return NotFound();
            }

            return Ok();
        }
    }
}