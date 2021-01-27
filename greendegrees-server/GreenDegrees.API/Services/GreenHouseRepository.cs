using GreenDegrees.API.Contexts;
using GreenDegrees.API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace GreenDegrees.API.Services
{
    public class GreenHouseRepository : IGreenHouseRepository
    {
        private readonly GreenDegreesContext greenDegreesContext;
        
        public GreenHouseRepository(GreenDegreesContext greenDegreesContext)
        {
            this.greenDegreesContext = greenDegreesContext ?? throw new ArgumentNullException(nameof(greenDegreesContext));
        }

        public async Task<IEnumerable<GreenHouse>> GetGreenHouseAsync()
        {
            return await greenDegreesContext.GreenHouses.ToListAsync();
        }

        public async Task<GreenHouse> GetGreenHouseTemperatureAsync()
        {
            int greenHouseId = await greenDegreesContext.GreenHouses.MaxAsync(g => g.Id);

            return await greenDegreesContext.GreenHouses.FindAsync(greenHouseId);
        }

        public async Task CreateGreenHouseAsync(double measuredTemperature)
        {
            GreenHouse greenHouse = new GreenHouse();

            greenHouse.dateTime = DateTime.Today;
            greenHouse.MeasuredTemperature = measuredTemperature;

            await greenDegreesContext.GreenHouses.AddAsync(greenHouse);

            await greenDegreesContext.SaveChangesAsync();
        }

        public async Task UpdateGreenHouseAsync(double temperature)
        {
            int greenHouseId = await greenDegreesContext.GreenHouses.MaxAsync(g => g.Id);
            GreenHouse greenHouse = await greenDegreesContext.GreenHouses.FindAsync(greenHouseId);

            greenHouse.Temperature = temperature;

            await greenDegreesContext.SaveChangesAsync();
        }
    }
}