using GreenDegrees.API.Entities;
using GreenDegrees.API.Services;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc.NewtonsoftJson;
using Microsoft.AspNetCore.JsonPatch;

namespace GreenDegrees.API.Controllers
{
    [ApiController]
    [Route("api/plant")]
    public class PlantController : ControllerBase
    {
        private readonly IPlantRepository plantRepository;

        public PlantController(IPlantRepository plantRepository)
        {
            this.plantRepository = plantRepository ?? throw new ArgumentNullException(nameof(plantRepository));
        }

        [HttpGet]
        public async Task<ActionResult<List<Plant>>> GetPlantsAsync()
        {
            IEnumerable<Plant> plants = await plantRepository.GetPlantsAsync();

            return Ok(plants);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Plant>> GetPlantByIdAsync(int id)
        {
            Plant plant = await plantRepository.GetPlantByIdAsync(id);

            if (plant == null)
            {
                return NotFound();
            }

            return Ok(plant);
        }

        [HttpPatch]
        public async Task<ActionResult> UpdatePlantAsync(Plant plant)
        {
            try
            {
                await plantRepository.UpdatePlantAsync(plant.Id, plant.IsPresentInGreenHouse);
            }
            catch (Exception)
            {
                return NotFound();
            }

            return NoContent();
        }
    }
}
