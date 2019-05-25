namespace Strive.Exceptions
{
    public class StriveSecurityException : StriveException
    {
        public StriveSecurityException() : base("StriveSecurityException")
        {
        }

        public StriveSecurityException(string message) : base(message)
        {
        }
    }
}