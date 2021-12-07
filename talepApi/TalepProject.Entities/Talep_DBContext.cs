using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;
using TalepProject.Entities.Entities;

namespace TalepProject.Entities
{
    public class Talep_DBContext :DbContext
    {
        public Talep_DBContext(DbContextOptions<Talep_DBContext> dbContextOptions)
      : base(dbContextOptions)
        {

        }

        public Talep_DBContext() { }

        public DbSet<Cinsiyet> cinsiyet { get; set; }
        public DbSet<Sektor> sektor { get; set; }
        public DbSet<Sirket> sirket { get; set; }
        public DbSet<Departman> departman { get; set; }
        public DbSet<Statu> statu { get; set; }
        public DbSet<Durum> durum { get; set; }
        public DbSet<Personel> personel { get; set; }

        public DbSet<Talep> talep { get; set; }
        public DbSet<Yetkili> yetkili { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            //Scans a given assembly for all types that implement IEntityTypeConfiguration, and registers each one automatically
            modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());

            base.OnModelCreating(modelBuilder);
        }

      
    }
}
