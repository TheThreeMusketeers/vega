using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using vega.Controllers.Resources;
using vega.Core;
using vega.Core.Models;
using vega.Persistence;

namespace vega.Controllers
{
    [Route("/api/vehicles/{vehicleId}/photos")]
    public class PhotosController : Controller
    {
        private readonly IHostingEnvironment host;
        private readonly IVehicleRepository repository;
        private readonly IMapper mapper;
        private readonly IPhotoRepository photoRepository;
        private readonly IPhotoService photoService;
        private readonly PhotoSettings photoSettings;
    
        public PhotosController(
            IHostingEnvironment host, 
            IVehicleRepository repository,
            IMapper mapper,
            IOptionsSnapshot<PhotoSettings> options,
            IPhotoRepository photoRepository,
            IPhotoService photoService)
        {
            this.repository = repository;
            this.mapper = mapper;
            this.photoRepository = photoRepository;
            this.photoService = photoService;
            this.host = host;
            this.photoSettings = options.Value;

        }

        [HttpGet]
        public async Task<IEnumerable<PhotoResource>> GetPhotos(int vehicleId)
        {
            var photos = await photoRepository.GetPhotos(vehicleId);
            return mapper.Map<IEnumerable<Photo>,IEnumerable<PhotoResource>>(photos);
        }

        [HttpPost]
        public async Task<IActionResult> Upload(int vehicleId, IFormFile file)
        {
            var vehicle = await repository.GetVehicle(vehicleId,includeRelated:false);
            if(vehicle == null)
                return NotFound();

            if(file == null) return BadRequest("File is null");
            if(file.Length == 0) return BadRequest("File is empty");
            if(file.Length > photoSettings.MaxBytes) return BadRequest("Maximum file size is excedeed"); 
            if(!photoSettings.IsSupported(file.FileName)) return BadRequest("Invalid file type");

            var uploadsFolderPath = Path.Combine(host.WebRootPath, "uploads");
            var photo = await photoService.UploadPhoto(vehicle,file,uploadsFolderPath);
            return Ok(mapper.Map<Photo,PhotoResource>(photo));
        }
    }//cs
}//ns