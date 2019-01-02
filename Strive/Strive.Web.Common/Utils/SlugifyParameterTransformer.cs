﻿using System;
using System.Collections.Generic;
using System.Text;
using System.Text.RegularExpressions;

using Microsoft.AspNetCore.Routing;

namespace Strive.Web.Common.Utils
{
    /// <summary>
    /// Средство преобразования camel-case путей в slug-пути
    /// </summary>
    public class SlugifyParameterTransformer : IOutboundParameterTransformer
    {
        public string TransformOutbound(object value)
        {
            return value == null ? null : Regex.Replace(value.ToString(), "([a-z])([A-Z])", "$1-$2").ToLower();
        }
    }
}
