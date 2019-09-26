using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using ReactCrudDemo.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ReactCrudDemo.Controllers
{
    
    public class CandidateController : Controller
    {
        CandidateDataAccessLayer objCandidate = new CandidateDataAccessLayer();

        [HttpGet]
        [Route("api/Candidate/GetAllCandidates")]
        public IEnumerable<Candidate> Index()
        {
            return objCandidate.GetAllCandidates();
        }

        [HttpPost]
        [Route("api/Candidate/Create")]
        public int Create(Candidate candidate)
        {
            return objCandidate.AddCandidate(candidate);
        }

        [HttpGet]
        [Route("api/Candidate/CandidateDetails/{id}")]
        public Candidate Details(int id)
        {
            return objCandidate.GetCandidateData(id);
        }

        [HttpPut]
        [Route("api/Candidate/Edit")]
        public int Edit(Candidate candidate)
        {
            return objCandidate.UpdateCandidate(candidate);
        }

        [HttpDelete]
        [Route("api/Candidate/Delete/{id}")]
        public int Delete(int id)
        {
            return objCandidate.DeleteCandidate(id);
        }

    }
}
