using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EntitiesExt
{

    public  class ContentExtEN
    {
        public int ID { get; set; }
        public Nullable<int> Type { get; set; }
        public string Title { get; set; }

        public string Intro { get; set; }
        public Nullable<int> Status { get; set; }
        public string CreatedBy { get; set; }
        public Nullable<bool> Disable { get; set; }
        public string Tag { get; set; }
        public Nullable<System.DateTime> DateCreated { get; set; }
        public Nullable<System.DateTime> DateEdited { get; set; }
        public string UpdateBy { get; set; }
        public Nullable<System.DateTime> PublishDate { get; set; }
        public Nullable<System.DateTime> ExpireDate { get; set; }
        public string CodeCategoryLevel1 { get; set; }
        public string Image { get; set; }
     
        public Nullable<int> IDLang { get; set; }
        public string Code { get; set; }
     
        public Nullable<long> ViewCount { get; set; }

    }
}