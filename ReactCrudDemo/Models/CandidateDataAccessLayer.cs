using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReactCrudDemo.Models
{
    //This class is to handle database operations
    public class CandidateDataAccessLayer
    {
        CRUDLocalDBContext db = new CRUDLocalDBContext();

        public IEnumerable<Candidate> GetAllCandidates()
        {
            try
            {
                return db.Candidate.ToList();
            }

            catch
            {
                throw;
            }

        }

        // Add new candidate
        public int AddCandidate(Candidate candidate)
        {
            try
            {
                db.Candidate.Add(candidate);
                db.SaveChanges();
                return 1;
            }

            catch
            {
                throw;
            }
        }

        // Update candidate
        public int UpdateCandidate(Candidate candidate)
        {
            try
            {
                db.Entry(candidate).State = EntityState.Modified;
                db.SaveChanges();
                return 1;
            }

            catch
            {
                throw;
            }
        }

        // Get data of a candidate
        public Candidate GetCandidateData(int id)
        {
            try
            {
                Candidate candidate = db.Candidate.Find(id);
                return candidate;
            }

            catch
            {
                throw;
            }
        }

        // Delete a candidate
        public int DeleteCandidate(int id)
        {
            try
            {
                Candidate candidate = db.Candidate.Find(id);
                db.Candidate.Remove(candidate);
                db.SaveChanges();
                return 1;
            }

            catch
            {
                throw;
            }
        }
    }
}
