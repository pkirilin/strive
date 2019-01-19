using System;
using System.Collections.Generic;
using System.Text;
using MimeKit;

namespace Strive.Communication.Emails
{
    /// <summary>
    /// Предоставляет функционал, необходимый для создания email сообщений
    /// </summary>
    public class EmailCreator
    {
        private readonly IEmailBuilder _builder;

        public EmailCreator(IEmailBuilder pbuilder)
        {
            _builder = pbuilder;
        }

        public MimeMessage Create(string preceiverEmail)
        {
            _builder.SetFrom();
            _builder.SetTo("", preceiverEmail);
            _builder.SetSubject();
            _builder.SetBody();
            return _builder.Build();
        }
    }
}
