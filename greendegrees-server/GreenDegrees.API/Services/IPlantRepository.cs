using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using GreenDegrees.API.Entities;

namespace GreenDegrees.API.Services
{
    public interface IPlantRepository
    {
        Task<IEnumerable<Plant>> GetPlantsAsync();

        Task<Plant> GetPlantByIdAsync(int id);

        Task UpdatePlantAsync(int id, Boolean isPresentInGreenHouse);

        void Save();
    }
}