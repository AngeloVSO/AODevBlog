﻿using System;
using System.Collections.Generic;
using System.Text;

namespace AODevBlog.Models.Blog
{
    public class PageResults<T>
    {
        public IEnumerable<T> Items { get; set; }
        public int TotalCount { get; set; }
    }
}