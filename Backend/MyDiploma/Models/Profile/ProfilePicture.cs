﻿using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MyDiploma.Models.Profile
{
    public class FormData
    {
        public string FileName { get; set; }
        public IFormFile FormFile { get; set; }

    }
}
