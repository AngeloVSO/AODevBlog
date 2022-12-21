using AODevBlog.Models.BlogComment;
using AODevBlog.Repository.BlogCommentRpository;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.JsonWebTokens;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AODevBlog.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BlogCommentController : ControllerBase
    {
        private readonly IBlogCommentRepository _blogCommentRepository;

        public BlogCommentController(IBlogCommentRepository blogCommentRepository)
        {
            _blogCommentRepository = blogCommentRepository;
        }

        [Authorize]
        [HttpPost]
        public async Task<ActionResult<BlogComment>> Create(BlogCommentCreate blogCommentCreate)
        {
            int applicationUserId = int.Parse(User.Claims.First(i => i.Type == JwtRegisteredClaimNames.NameId).Value);

            var createBlogComment = await _blogCommentRepository.UpsertAsync(blogCommentCreate, applicationUserId);

            return Created("BlogComment", createBlogComment);
        }

        [HttpGet("{blogId}")]
        public async Task<ActionResult<List<BlogComment>>> GetAll(int blogId)
        {
            var blogComments = await _blogCommentRepository.GetAllAsync(blogId);

            return Ok(blogComments);
        }

        [Authorize]
        [HttpDelete("{blogCommentId}")]
        public async Task<ActionResult<int>> Detele(int blogCommentId)
        {

            int applicationUserId = int.Parse(User.Claims.First(i => i.Type == JwtRegisteredClaimNames.NameId).Value);

            var foundBlogComment = await _blogCommentRepository.GetAsync(blogCommentId);

            if (foundBlogComment == null) return BadRequest("Comment does not exist.");

            if (foundBlogComment.ApplicationUserId == applicationUserId)
            {
                var result = await _blogCommentRepository.DeleteAsync(blogCommentId);

                return Ok(result);
            }
            else
            {
                return BadRequest("This comment was not created by the current user.");
            }
        }
    }
}
