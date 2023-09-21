using System.Net;
using Labs26_29.Models;
using Labs26_29.Models.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using Microsoft.EntityFrameworkCore;
using Labs26_29.Models.Services;
using Labs26_29.Models;
using Labs26_29;

namespace ECommerce.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {

        private UserManager<ApplicationUsers> userManager;
        private SignInManager<ApplicationUsers> signInManager;
        private JwtTokenService tokenService;
        private CommyDBContext _context;
        public UsersController(CommyDBContext Context, UserManager<ApplicationUsers> manager, JwtTokenService _tokenService, SignInManager<ApplicationUsers> _signInManager)
        {

            _context = Context;
            userManager = manager;
            tokenService = _tokenService;
            signInManager = _signInManager;
        }

        // ROUTES

        [HttpPost("Register")]
        [AllowAnonymous]

        public async Task<ActionResult<ApplicationUsers>> Register(ApplicationUsers user)
        {
            // Note: data (RegisterUser) comes from an inbound DTO/Model created for this purpose
            // this.ModelState?  This comes from MVC Binding and shares an interface with the Model
            //var user = await userService.Register(data, this.ModelState);

            var result = await userManager.CreateAsync(user, user.Password);
            if (result.Succeeded)
            {
                // await userManager.AddToRolesAsync(user, user.Roles);
                // var name = HttpContext.User.Identity.Name;

                List<string> roles = new List<string>
                {
                    "Anonymous"
                };
                //await userManager.AddToRoleAsync(user, roles.ToString()); // Example role
                await signInManager.SignInAsync(user, null);

                return new ApplicationUsers
                {
                    Id = user.Id,
                    UserName = user.UserName,
                    Token = await tokenService.GetToken(user, System.TimeSpan.FromMinutes(15)),
                    Roles = roles,
                    
                };

            }



            // What about our errors?
            foreach (var error in result.Errors)
            {
                var errorKey =
                    error.Code.Contains("Password") ? nameof(user.Password) :
                    error.Code.Contains("Email") ? nameof(user.Email) :
                    error.Code.Contains("UserName") ? nameof(user.UserName) :
                    "";
                ModelState.AddModelError(errorKey, error.Description);
            }



            if (ModelState.IsValid)
            {
                return user;
            }

            return BadRequest(new ValidationProblemDetails(ModelState));
        }



        [HttpPost("Login")]
        public async Task<ActionResult<ApplicationUsers>> Login(ApplicationUsers data)
        {
            // Find the user by their username
            var user = await userManager.Users
                                          // Include user's orders
                                        .FirstOrDefaultAsync(u => u.UserName == data.UserName);

            if (user == null)
            {
                return Unauthorized();
            }

            if (await userManager.CheckPasswordAsync(user, data.Password))
            {
                await signInManager.SignInAsync(user, null);

                return new ApplicationUsers
                {
                    Id = user.Id,
                    UserName = user.UserName,
                    Token = await tokenService.GetToken(user, System.TimeSpan.FromMinutes(15)),
                    Roles = user.Roles,
                        // Include user's orders in the response
                };
            }

            return BadRequest();
        }

        


        [Authorize(Policy = "create")]
        [HttpGet("me")]
        public async Task<ApplicationUsers> GetUser(ClaimsPrincipal principal)
        {
            var user = await userManager.GetUserAsync(principal);
            //  await userManager.AddToRolesAsync(user, user.Roles);

            return new ApplicationUsers
            {
                Id = user.Id,
                UserName = user.UserName,
                Roles = await userManager.GetRolesAsync(user)
            };
        }
    }
}
