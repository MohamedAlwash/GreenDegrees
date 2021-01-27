using System;

namespace GreenDegrees.API.Entities
{
    public class GreenHouse : Entity
    {
        public DateTime dateTime { get; set; }
        public double MeasuredTemperature { get; set; }
    }
}