using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;

namespace WebApiReservations.Models
{
    public class ReservationContext : DbContext
    {
        public ReservationContext(DbContextOptions<ReservationContext> options)
            : base(options)
        { }

        public DbSet<Room> Rooms { get; set; }
        public DbSet<Reservation> Reservations { get; set; }

        public DbSet<Person> Persons { get; set; }
    }

    public class Reservation
    {
        public int ReservationId { get; set; }
        public int PersonId {get;set;}
        public int RoomId {get;set;}
        public DateTime From { get; set; }
        public DateTime To { get; set; }
        public Person Person { get; set; }
        public Room Room { get; set; }
    }

    public class Room
    {
        public int RoomId { get; set; }
        public string Name { get; set; }
        public List<Reservation> Reservations { get; set; }
    }

    public class Person
    {
        public int PersonId { get; set; }
        public string FirstName{ get; set; }
        public string LastName{ get; set; }

        public List<Reservation> Reservations {get;set;}
    }
}