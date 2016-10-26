using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

using NetProject.Models;

namespace NetProject
{
    public class PersonDBInitializer : DropCreateDatabaseAlways<PersonDBContext>
    {
        protected override void Seed(PersonDBContext context)
        {
            var persons = new List<Person> { 
                new Person { Id = 1, FirstName = "Alvaro", LastName = "Martinez"},
                new Person { Id = 2, FirstName = "Mauricio", LastName = "Hernandez"},
                new Person { Id = 3, FirstName = "Hazel", LastName = "Contreras"},
                new Person { Id = 4, FirstName = "Melisa", LastName = "Garcia"}
            };
            persons.ForEach(c => context.Person.Add(c));
            context.SaveChanges();
        }
    }
}