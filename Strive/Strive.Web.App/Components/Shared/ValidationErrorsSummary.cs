using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace Strive.Web.App.Components.Shared
{
	public class ValidationErrorsSummary : ViewComponent
	{
		public IViewComponentResult Invoke()
		{
			return View();
		}
	}
}
