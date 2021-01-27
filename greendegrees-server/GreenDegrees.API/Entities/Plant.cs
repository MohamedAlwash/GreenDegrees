using System;

namespace GreenDegrees.API.Entities
{
    public class Plant
    {
        public int Id { get; set; }
        public double Temperature { get; set; }
        public string Description { get; set; }
        public string ImageUrl { get; set; }
        public string Name { get; set; }
        public Boolean IsPresentInGreenHouse { get; set; }
        public string Harvest { get; set; }
    }
}