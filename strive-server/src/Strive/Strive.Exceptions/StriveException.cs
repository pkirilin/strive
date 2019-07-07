using System;

namespace Strive.Exceptions
{
    /// <summary>
    /// Base app exception class
    /// </summary>
    public class StriveException : Exception
    {
        public string Description { get; private set; }

        public StriveException() : base("Internal server error")
        {
        }

        public StriveException(string description) : base("Internal server error")
        {
            Description = description;
        }

        public StriveException(string message, string description) : base(message)
        {
            Description = description;
        }
    }
}