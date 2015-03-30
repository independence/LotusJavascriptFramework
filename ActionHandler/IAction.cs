using System.Web;

namespace ActionHandler
{
    public interface IAction
    {
        void Do(HttpContext context);
    }
}