using System;
using System.Collections.Generic;
using System.Text;
using MimeKit;
using MimeKit.Text;

namespace Strive.Communication.Emails
{
    /// <summary>
    /// Реализует общий функционал, необходимый для построения email сообщений
    /// </summary>
    public class EmailBuilder : IEmailBuilder
    {
        protected readonly MimeMessage _message;

        protected readonly Multipart _messageBodyMultipart;

        public EmailBuilder()
        {
            _message = new MimeMessage();
            _messageBodyMultipart = new Multipart("mixed");
        }

        /// <summary>
        /// Построение части письма, отвечающей за отправителя
        /// </summary>
        public virtual void SetFrom()
        {
            // @todo yandex -> ?
            _message.From.Add(new MailboxAddress("Strive admin", "strive.tms@yandex.ru"));
        }

        /// <summary>
        /// Построение части письма, отвечающей за получателя
        /// </summary>
        /// <param name="preceiverName">Имя получателя</param>
        /// <param name="preceiverEmail">Адрес электронной почты получателя</param>
        public virtual void SetTo(string preceiverName, string preceiverEmail)
        {
            _message.To.Add(new MailboxAddress(preceiverEmail));
        }

        /// <summary>
        /// Построение темы письма
        /// </summary>
        public virtual void SetSubject()
        {
            _message.Subject = "";
        }

        /// <summary>
        /// Построение тела письма
        /// </summary>
        public virtual void SetBody()
        {
            _message.Body = _messageBodyMultipart;
        }

        /// <summary>
        /// Добавление в тело письма блока текста
        /// </summary>
        /// <param name="ptext">Добавляемый текст</param>
        protected void AddBodyTextPart(string ptext)
        {
            _messageBodyMultipart.Add(new TextPart(TextFormat.Html)
            {
                Text = ptext
            });
        }

        /// <summary>
        /// Создание письма
        /// </summary>
        public virtual MimeMessage Build()
        {
            return _message;
        }
    }
}
