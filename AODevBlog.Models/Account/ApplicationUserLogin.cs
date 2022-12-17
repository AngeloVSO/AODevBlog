using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace AODevBlog.Models.Account
{
    public class ApplicationUserLogin
    {
        [Required(ErrorMessage = "O nome do usuário é obrigatório")]
        [MinLength(5, ErrorMessage = "Precisa ter pelo menos 5-20 caracteres")]
        [MaxLength(20, ErrorMessage = "Precisa ter pelo menos 5-20 caracteres")]
        public string Username { get; set; }
        [Required(ErrorMessage = "O nome do usuário é obrigatório")]
        [MinLength(10, ErrorMessage = "Precisa ter pelo menos 10-50 caracteres")]
        [MaxLength(50, ErrorMessage = "Precisa ter pelo menos 10-50 caracteres")]
        public string Password { get; set; }
    }
}
