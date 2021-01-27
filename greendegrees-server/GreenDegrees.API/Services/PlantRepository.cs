using GreenDegrees.API.Contexts;
using GreenDegrees.API.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace GreenDegrees.API.Services
{
    public class PlantRepository : IPlantRepository
    {
        private readonly GreenDegreesContext greenDegreesContext;

        public PlantRepository(GreenDegreesContext greenDegreesContext)
        {
            this.greenDegreesContext = greenDegreesContext ?? throw new ArgumentNullException(nameof(greenDegreesContext));
        }

        public async Task<Plant> GetPlantByIdAsync(int id)
        {
            return await greenDegreesContext.Plants.FindAsync(id);
        }

        public async Task<IEnumerable<Plant>> GetPlantsAsync()
        {
            return await greenDegreesContext.Plants.ToListAsync();
        }

        public async Task UpdatePlantAsync(int id, Boolean isPresentInGreenHouse)
        {
            Plant plant = await GetPlantByIdAsync(id);

            if (plant == null)
            {
                throw new Exception();
            }

            plant.IsPresentInGreenHouse = isPresentInGreenHouse;

            await greenDegreesContext.SaveChangesAsync();
        }

        public void Save()
        {
            greenDegreesContext.SaveChanges();
        }
    }
}