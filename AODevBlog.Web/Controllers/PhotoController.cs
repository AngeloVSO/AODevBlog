using AODevBlog.Models.Photo;
using AODevBlog.Repository.BlogRepository;
using AODevBlog.Repository.PhotoRepository;
using AODevBlog.Services;
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
    public class PhotoController : ControllerBase
    {
        private readonly IPhotoRepository _photoRepository;
        private readonly IBlogRepository _blogRepository;
        private readonly IPhotoService _photoService;

        public PhotoController(IPhotoService photoService, IPhotoRepository photoRepository, IBlogRepository blogRepository)
        {
            _photoService = photoService;
            _photoRepository = photoRepository;
            _blogRepository = blogRepository;
        }

        [Authorize]
        [HttpPost]
        public async Task<ActionResult<Photo>> UploadPhoto(IFormFile file)
        {
            int applicationUserId = int.Parse(User.Claims.First(i => i.Type == JwtRegisteredClaimNames.NameId).Value);

            var uploadResult = await _photoService.AddPhotAsync(file);

            if (uploadResult.Error != null) return BadRequest(uploadResult.Error.Message);

            var photoCreate = new PhotoCreate
            {
                PublicId = uploadResult.PublicId,
                ImageUrl = uploadResult.SecureUrl.AbsoluteUri,
                Description = file.FileName
            };

            var photo = await _photoRepository.InsertAsync(photoCreate, applicationUserId);

            return Ok(photo);
        }

        [Authorize]
        [HttpGet]
        public async Task<ActionResult<List<Photo>>> GetByApplicationUserId()
        {
            int applicationUserId = int.Parse(User.Claims.First(i => i.Type == JwtRegisteredClaimNames.NameId).Value);

            var photos = await _photoRepository.GetAllByUserIdAsync(applicationUserId);

            return Ok(photos);
        }

        [HttpGet("{photoId}")]
        public async Task<ActionResult<Photo>> Get(int photoId)
        {
            var photo = await _photoRepository.GetAsync(photoId);

            return Ok(photo);
        }

        [Authorize]
        [HttpDelete("{photoId}")]
        public async Task<ActionResult<int>> Delete(int photoId)
        {
            int applicationUserId = int.Parse(User.Claims.First(i => i.Type == JwtRegisteredClaimNames.NameId).Value);

            var foundPhoto = await _photoRepository.GetAsync(photoId);

            if (foundPhoto != null && foundPhoto.ApplicationUserId == applicationUserId)
            {
                var blogs = await _blogRepository.GetAllByUserIdAsync(applicationUserId);

                var usedInBlog = blogs.Any(b => b.Photoid == photoId);

                if (usedInBlog) return BadRequest("Cannot remove photo as it is being used in published blog(s).");

                var deleteResultService = await _photoService.DeletePhotoAsync(foundPhoto.PublicId);

                if (deleteResultService.Error != null) return BadRequest(deleteResultService.Error.Message);

                var deleteResultRepository = await _photoRepository.DeleteAsync(foundPhoto.PhotoId);

                return Ok(deleteResultRepository);
            }
            else
            {
                return BadRequest("Photo was not uploaded by the current user or not exist.");
            }

        }

    }
}
