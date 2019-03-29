using System;

namespace Strive.Exceptions
{
	/// <summary>
	/// Base app exception class
	/// </summary>
	public class StriveException : Exception
	{
		public StriveException(string message) : base(message)
		{
		}
	}
}
