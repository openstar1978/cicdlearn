using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Application.Common
{
    public class PagedRequest
    {
        public int Page { get; set; } = 1;
        public int PageSize { get; set; } = 10;

        public string SortField { get; set; } = "Id";
        public string SortOrder { get; set; } = "asc";
    }
    public class PagedResult<T>
    {
        public List<T> Data { get; set; }
        public int Total { get; set; }
    }
}
