using CORE;
using DataAccess;
using Library;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using CORE;

namespace CMS
{
    public partial class Main : CORE.CORE_Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            this.CheckRedirectPage();
            
        }

    }
}