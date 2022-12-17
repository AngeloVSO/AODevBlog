using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace AODevBlog.Models.Account
{
    public class ApplicationUserCreate : ApplicationUserLogin
    {
        [MinLength(10, ErrorMessage = "Precisa ter pelo menos 10-30 caracteres")]
        [MaxLength(30, ErrorMessage = "Precisa ter pelo menos 10-30 caracteres")]
        public string Fullname { get; set; }
        [Required(ErrorMessage = "O email é obrigatório")]
        [MaxLength(30, ErrorMessage = "Máximo de 30 caracteres permitido")]
        [EmailAddress(ErrorMessage = "Email com formato inválido")]
        public string Email { get; set; }
    }
}
