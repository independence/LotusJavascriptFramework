using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DataAccess;
namespace EntitiesExt
{
    public class ContentsExt: Contents
    {
        public string CategoryNameLevel1 { get; set; }
        public void SetValue(Contents aNews)
        {
            this.ID = aNews.ID;
            this.Type = aNews.Type;
            this.Title = aNews.Title;
            this.Info = aNews.Info;
            this.Intro = aNews.Intro;
            this.Status = aNews.Status;
            this.CreatedBy = aNews.CreatedBy;
            this.Disable = aNews.Disable;
            this.Tag = aNews.Tag;
            this.DateCreated = aNews.DateCreated;
            this.DateEdited = aNews.DateEdited;
            this.UpdateBy = aNews.UpdateBy;
            this.PublishDate = aNews.PublishDate;
            this.ExpireDate = aNews.ExpireDate;

            this.Image = aNews.Image;
            this.Image1 = aNews.Image1;
            this.Image2 = aNews.Image2;
            this.Image3 = aNews.Image3;
            this.ViewCount = aNews.ViewCount;
          

            this.IDAlbum = aNews.IDAlbum;
            this.IDLang = aNews.IDLang;
            this.Code = aNews.Code;
            this.ExtendProperties1 = aNews.ExtendProperties1;
            this.ExtendProperties2 = aNews.ExtendProperties2;
            this.ExtendProperties3 = aNews.ExtendProperties3;

        }
        public Contents ConvertToCotents()
        {
            Contents aContent = new Contents();
            aContent.ID = this.ID;
            aContent.Type = this.Type;
            aContent.Title = this.Title;
            aContent.Info = this.Info;
            aContent.Intro = this.Intro;
            aContent.Status = this.Status;
            aContent.CreatedBy = this.CreatedBy;
            aContent.Disable = this.Disable;
            aContent.Tag = this.Tag;
            aContent.DateCreated = this.DateCreated;
            aContent.DateEdited = this.DateEdited;
            aContent.UpdateBy = this.UpdateBy;
            aContent.PublishDate = this.PublishDate;
            aContent.ExpireDate = this.ExpireDate;

            aContent.Image = this.Image;
            aContent.Image1 = this.Image1;
            aContent.Image2 = this.Image2;
            aContent.Image3 = this.Image3;
            aContent.ViewCount = this.ViewCount;


            aContent.IDAlbum = this.IDAlbum;
            aContent.IDLang = this.IDLang;
            aContent.Code = this.Code;
            aContent.ExtendProperties1 = this.ExtendProperties1;
            aContent.ExtendProperties2 = this.ExtendProperties2;
            aContent.ExtendProperties3 = this.ExtendProperties3;
            return aContent;
        }
  
    }
}
