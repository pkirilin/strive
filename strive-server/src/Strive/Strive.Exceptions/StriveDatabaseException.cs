namespace Strive.Exceptions
{
    public class StriveDatabaseException : StriveException
    {
        public StriveDatabaseException() : base()
        {
        }

        public StriveDatabaseException(string description) : base(description)
        {
        }

        public StriveDatabaseException(string message, string description) 
            : base(message, description)
        {
        }
    }
}