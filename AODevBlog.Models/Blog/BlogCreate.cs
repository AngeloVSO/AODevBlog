using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace AODevBlog.Models.Blog
{
    public class BlogCreate
    {
        public int BlogId { get; set; }
        
        [Required(ErrorMessage = "O título é obrigatório")]
        [MinLength(10, ErrorMessage = "Precisa ter 10-50 caracteres")]
        [MaxLength(50, ErrorMessage = "Precisa ter 10-50 caracteres")]
        public string Title { get; set; }

        [Required(ErrorMessage = "O conteúdo é obrigatório")]
        [MinLength(300, ErrorMessage = "Precisa ter 300-3000 caracteres")]
        [MaxLength(3000, ErrorMessage = "Precisa ter 300-3000 caracteres")]
        public string Content { get; set; }
        public int? PhotoId { get; set; }

    }
}
