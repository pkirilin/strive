namespace Strive.Exceptions
{
	public class StriveDatabaseException : StriveException
	{
		public StriveDatabaseException() : base("StriveDatabaseException")
		{
		}

		public StriveDatabaseException(string message) : base(message)
		{
		}
	}
}
