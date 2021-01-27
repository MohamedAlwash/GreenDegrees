using GreenDegrees.API.Entities;
using GreenDegrees.API.Services;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace GreenDegrees.API.Controllers
{
    [ApiController]
    [Route("api/greenhouse")]
    public class GreenHouseController : ControllerBase
    {
        private readonly IGreenHouseRepository greenHouseRepository;

        public GreenHouseController(IGreenHouseRepository greenHouseRepository)
        {
            this.greenHouseRepository = greenHouseRepository ?? throw new ArgumentNullException(nameof(greenHouseRepository));
        }

        [HttpGet]
        public async Task<ActionResult<List<GreenHouse>>> GetGreenHouseAsync()
        {
            IEnumerable<GreenHouse> greenHouses = await greenHouseRepository.GetGreenHouseAsync();

            return Ok(greenHouses);
        }

        [HttpGet ("tempature")]
        public async Task<ActionResult<GreenHouse>> GetGreenHouseTemperatureAsync()
        {
            GreenHouse greenHouse = await greenHouseRepository.GetGreenHouseTemperatureAsync();

            return Ok(greenHouse.Temperature);
        }

        [HttpPost]
        public async Task<ActionResult> CreateGreenHouseAsynchAsync(GreenHouse greenHouse)
        {
            if (greenHouse == null)
            {
                return BadRequest(greenHouse);
            }

            await greenHouseRepository.CreateGreenHouseAsync(greenHouse.MeasuredTemperature);

            return NoContent();
        }

        [HttpPatch]
        public async Task<ActionResult> UpdateGreenHouseAsync(GreenHouse greenHouse)
        {
            await greenHouseRepository.UpdateGreenHouseAsync(greenHouse.Temperature);

            return NoContent();
        }
    }
}
