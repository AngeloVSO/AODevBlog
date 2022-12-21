using AODevBlog.Models.Account;
using System;
using System.Collections.Generic;
using System.Text;

namespace AODevBlog.Services.TokenService
{
    public interface ITokenService
    {
        public string CreateToken(ApplicationUserIdentity user);
    }
}
