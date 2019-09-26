using System;
using System.Collections.Generic;

namespace ReactCrudDemo.Models
{
    public partial class Candidate
    {
        public int CandidateId { get; set; }
        public string Name { get; set; }
        public string Gender { get; set; }
        public string Position { get; set; }
        public string Notation { get; set; }
    }
}
