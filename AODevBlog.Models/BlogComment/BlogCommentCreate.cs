using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace AODevBlog.Models.BlogComment
{
    public class BlogCommentCreate
    {
        public int BlogCommentId { get; set; }
        public int? ParentBlogCommentId { get; set; }
        public int BlogId { get; set; }

        [Required(ErrorMessage = "O conteúdo é obrigatório")]
        [MinLength(10, ErrorMessage = "Precisa ter 10-300 caracteres")]
        [MaxLength(300, ErrorMessage = "Precisa ter 10-300 caracteres")]
        public string Content { get; set; }
    }
}
