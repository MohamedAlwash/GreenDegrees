using GreenDegrees.API.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace GreenDegrees.API.Services
{
    public interface IGreenHouseRepository
    {
        Task<IEnumerable<GreenHouse>> GetGreenHouseAsync();

        Task<GreenHouse> GetGreenHouseTemperatureAsync();

        Task CreateGreenHouseAsync(double measuredTemperature);

        Task UpdateGreenHouseAsync(double temperature);

    }
}
