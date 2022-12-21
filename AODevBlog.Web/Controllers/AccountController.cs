using AODevBlog.Models.Account;
using AODevBlog.Services.TokenService;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AODevBlog.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly ITokenService _tokeService;
        private readonly UserManager<ApplicationUserIdentity> _userManager;
        private readonly SignInManager<ApplicationUserIdentity> _signInManager;

        public AccountController(SignInManager<ApplicationUserIdentity> signInManager, UserManager<ApplicationUserIdentity> userManager, ITokenService tokeService)
        {
            _signInManager = signInManager;
            _userManager = userManager;
            _tokeService = tokeService;
        }

        [HttpPost("register")]
        public async Task<ActionResult<ApplicationUser>> Register(ApplicationUserCreate applicationUserCreate)
        {
            var applicationUserIdentity = new ApplicationUserIdentity
            {
                Username = applicationUserCreate.Username,
                Email = applicationUserCreate.Email,
                Fullname = applicationUserCreate.Fullname
            };

            var result = await _userManager.CreateAsync(applicationUserIdentity, applicationUserCreate.Password);

            if (result.Succeeded)
            {
                var user = new ApplicationUser()
                {
                    ApplicationUserId = applicationUserIdentity.ApplicationUserId,
                    UserName = applicationUserIdentity.Username,
                    Email = applicationUserIdentity.Email,
                    FullName = applicationUserIdentity.Fullname,
                    Token = _tokeService.CreateToken(applicationUserIdentity)
                };

                return Created("user", user);
            }

            return BadRequest(result.Errors);
        }

        [HttpPost("login")]
        public async Task<ActionResult<ApplicationUser>> Login(ApplicationUserLogin applicationUserLogin)
        {
            var applicationUserIdentity = await _userManager.FindByNameAsync(applicationUserLogin.Username);

            if (applicationUserIdentity != null)
            {
                var result = await _signInManager.CheckPasswordSignInAsync(
                    applicationUserIdentity, 
                    applicationUserLogin.Password, false);

                if (result.Succeeded)
                {
                    var applicationUser = new ApplicationUser
                    {
                        ApplicationUserId = applicationUserIdentity.ApplicationUserId,
                        UserName = applicationUserIdentity.Username,
                        Email = applicationUserIdentity.Email,
                        FullName = applicationUserIdentity.Fullname,
                        Token = _tokeService.CreateToken(applicationUserIdentity)
                    };

                    return Ok(applicationUser);
                }
            }

            return BadRequest("Invalid login attempt.");
        }
    }
}
