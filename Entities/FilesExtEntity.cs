using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DataAccess;
namespace EntitiesExt
{
    public class FilesExt: Files
    {
        public string AlbumsName { get; set; }
        public void SetValue(Files aFiles)
        {
            this.AlbumsName = "";
            this.Code = aFiles.Code;
            this.CodeAlbums = aFiles.CodeAlbums;
            this.CreateByIDUser = aFiles.CreateByIDUser;
            this.Disable = aFiles.Disable;
            this.DownloadCount = aFiles.DownloadCount;
            this.Height = aFiles.Height;
            this.Width = aFiles.Width;
            this.ID = aFiles.ID;
            this.IDLang = aFiles.IDLang;

            this.Image = aFiles.Image;
            this.Image1 = aFiles.Image1;
            this.Image2 = aFiles.Image2;
            this.Image3 = aFiles.Image3;
            this.Info = aFiles.Info;
            this.Status = aFiles.Status;
            this.Type = aFiles.Type;
            this.UploadDate = aFiles.UploadDate;
            this.ViewCount = aFiles.ViewCount;

            this.Info = aFiles.Info;
            this.Intro = aFiles.Intro;
            this.Title = aFiles.Title;

      
          

        }
        public Files ConvertToCotents()
        {
            Files aFiles = new Files();

            aFiles.Code = this.Code;
            aFiles.Info = this.Info;
            aFiles.Intro = this.Intro;
            aFiles.Title = this.Title;

            aFiles.CodeAlbums = this.CodeAlbums;
            aFiles.CreateByIDUser = this.CreateByIDUser;
            aFiles.Disable = this.Disable;
            aFiles.DownloadCount = this.DownloadCount;
            aFiles.Height = this.Height;
            aFiles.Width = this.Width;
            aFiles.ID = this.ID;
            aFiles.IDLang = this.IDLang;

            aFiles.Image = this.Image;
            aFiles.Image1 = this.Image1;
            aFiles.Image2 = this.Image2;
            aFiles.Image3 = this.Image3;
            aFiles.Info = this.Info;
            aFiles.Status = this.Status;
            aFiles.Type = this.Type;
            aFiles.UploadDate = this.UploadDate;
            aFiles.ViewCount = this.ViewCount;

            return aFiles;
        }
  
    }
}
