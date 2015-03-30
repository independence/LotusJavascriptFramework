using DataAccess;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EntitiesExt
{
   public class CategoryLevel2ExtEN
    {
            public int ID { get; set; }
            public string CategoryNameLevel2 { get; set; }
            public Nullable<int> Status { get; set; }

            public Nullable<bool> Disable { get; set; }
            public string Code { get; set; }
            public Nullable<int> IDLang { get; set; }

            public Nullable<int> Type { get; set; }
            public string Note { get; set; }
            public string Image { get; set; }

            public string Image1 { get; set; }
            public string Image2 { get; set; }
            public string Image3 { get; set; }

            public string Tag { get; set; }
            public string Info { get; set; }
            public string Intro { get; set; }

            public Nullable<int> IDAlbum { get; set; }
            public Nullable<long> ViewCount { get; set; }


            public void SetValue(CategoryLevel2 aCategoryLevel2)
            {
                this.ID = aCategoryLevel2.ID;
                this.Type = aCategoryLevel2.Type;
                this.Status = aCategoryLevel2.Status;

                this.CategoryNameLevel2 = aCategoryLevel2.CategoryNameLevel2;
                this.Info = aCategoryLevel2.Info;
                this.Intro = aCategoryLevel2.Intro;
                
                this.Disable = aCategoryLevel2.Disable;
                this.Tag = aCategoryLevel2.Tag;
                this.Image = aCategoryLevel2.Image;

                this.Image1 = aCategoryLevel2.Image1;
                this.Image2 = aCategoryLevel2.Image2;
                this.Image3 = aCategoryLevel2.Image3;

                this.ViewCount = aCategoryLevel2.ViewCount;
                this.IDAlbum = aCategoryLevel2.IDAlbum;
                this.IDLang = aCategoryLevel2.IDLang;

                this.Code = aCategoryLevel2.Code;
                this.Note = aCategoryLevel2.Note;


            }
            public CategoryLevel2 ConvertToCotents()
            {
                CategoryLevel2 aCategoryLevel2 = new CategoryLevel2();

                aCategoryLevel2.ID = this.ID;
                aCategoryLevel2.Type = this.Type;
                aCategoryLevel2.Status = this.Status;

                aCategoryLevel2.CategoryNameLevel2 = this.CategoryNameLevel2;
                aCategoryLevel2.Info = this.Info;
                aCategoryLevel2.Intro = this.Intro;

                aCategoryLevel2.Disable = this.Disable;
                aCategoryLevel2.Tag = this.Tag;
                aCategoryLevel2.Image = this.Image;

                aCategoryLevel2.Image1 = this.Image1;
                aCategoryLevel2.Image2 = this.Image2;
                aCategoryLevel2.Image3 = this.Image3;

                aCategoryLevel2.ViewCount = this.ViewCount;
                aCategoryLevel2.IDAlbum = this.IDAlbum;
                aCategoryLevel2.IDLang = this.IDLang;

                aCategoryLevel2.Code = this.Code;
                aCategoryLevel2.Note = this.Note;

                return aCategoryLevel2;
            }

   
    }
}
