namespace Strive.Exceptions
{
    public class StriveSecurityException : StriveException
    {
        public StriveSecurityException() : base()
        {
        }

        public StriveSecurityException(string description) : base(description)
        {
        }

        public StriveSecurityException(string message, string description)
            : base(message, description)
        {
        }
    }
}