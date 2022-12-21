using CloudinaryDotNet.Actions;
using Microsoft.AspNetCore.Http;
using System;
using System.Threading.Tasks;

namespace AODevBlog.Services
{
    public interface IPhotoService
    {
        public Task<ImageUploadResult> AddPhotAsync(IFormFile file);
        public Task<DeletionResult> DeletePhotoAsync(string publicId);
    }
}
