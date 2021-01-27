using GreenDegrees.API.Entities;
using Microsoft.EntityFrameworkCore;
using System;

namespace GreenDegrees.API.Contexts
{
    public class GreenDegreesContext : DbContext
    {
        public DbSet<Plant> Plants { get; set; }
        public DbSet<GreenHouse> GreenHouses { get; set; }

        public GreenDegreesContext(DbContextOptions<GreenDegreesContext> options) : base(options)
        {
            Database.EnsureCreated();
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Plant>().HasData(
                new Plant()
                {
                    Id = 1,
                    Temperature = 20.2,
                    Harvest = "Je kunt ze het best in het voorjaar, vanaf april/mei, zaaien wanneer er geen nachtvorst meer is. Binnen voorzaaien kan al vanaf januari.",
                    ImageUrl = "https://freshweb.nl/wp-content/uploads/2018/09/radijs-log.png",
                    Name = "Radijs",
                    Description = "Er bestaan veel verschillende soorten in het zadenassortiment van de radijs. De meeste mensen zijn vooral bekend met de rode en witte radijzen, maar er bestaan ook gele, roze, paarse en geheel witte radijssoorten.",
                    IsPresentInGreenHouse = true,

                },
                new Plant()
                {
                    Id = 2,
                    Temperature = 28.2,
                    Harvest = "De vrucht wordt geoogst als deze nog donkergroen is. Een rijpe vrucht verkleurt naar geelgroe ",
                    ImageUrl = "https://upload.wikimedia.org/wikipedia/commons/c/c2/Komkommer_plant.jpg",
                    Name = "Komkommer",
                    Description = "De komkommer is een eenjarige plant uit de komkommerfamilie, waarvan de gelijknamige vrucht in Nederland en België vooral rauw als salade wordt gegeten.",
                    IsPresentInGreenHouse = false,
                },
                new Plant()
                {
                    Id = 3,
                    Temperature = 18.5,
                    Harvest = "Je oogst een krop sla zo kort mogelijk voor het eten. Als je direct gaat eten kun je de krop zo dicht mogelijk bij de grond met een mesje van de wortels afsnijden, maar als je haar pas later eet kun je beter met beide handen de krop vasthouden en haar zachtjes met wortel en al uit de grond trekken.",
                    ImageUrl = "https://moestuincursus.nl/wp-content/uploads/2015/05/20150514-sla-DSC_4416-1040x520.jpg",
                    Name = "Sla",
                    Description = "Sla heeft voeding nodig om genoeg blaadjes te maken en een mooie krop te vormen. In potgrond zit voldoende voeding voor 8 weken, en daar heb je voldoende aan want ongeveer 10 weken na het zaaien kun je de sla al oogsten.",
                    IsPresentInGreenHouse = false,
                });

            DateTime dateTime = DateTime.Today;

            modelBuilder.Entity<GreenHouse>().HasData(
                new GreenHouse()
                {
                    Id = 1,
                    dateTime = dateTime.AddDays(1),
                    MeasuredTemperature = 20,
                    Temperature = 20
                },
                new GreenHouse()
                {
                    Id = 2,
                    dateTime = dateTime.AddDays(2),
                    MeasuredTemperature = 25,
                    Temperature = 25
                },
                new GreenHouse()
                {
                    Id = 3,
                    dateTime = dateTime,
                    MeasuredTemperature = 30,
                    Temperature = 18
                });

            base.OnModelCreating(modelBuilder);
        }
    }
}