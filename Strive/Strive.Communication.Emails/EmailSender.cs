using System.Threading.Tasks;
using MailKit.Net.Smtp;
using MimeKit;

namespace Strive.Communication.Emails
{
	/// <summary>
	/// Предоставляет функционал, необходимый для отправки email сообщений
	/// </summary>
	public class EmailSender
    {
        private readonly EmailCreator _emailCreator;

        public EmailSender(IEmailBuilder pemailBuilder)
        {
            _emailCreator = new EmailCreator(pemailBuilder);
        }

        /// <summary>
        /// Асинхронная отправка email сообщения
        /// </summary>
        public async Task SendEmailAsync(string preceiverEmail)
        {
            MimeMessage msg = _emailCreator.Create(preceiverEmail);

            using (var client = new SmtpClient())
            {
                // @todo придумать, как скрыть пароль
                // @todo вынести параметры почты, логин и пароль в конфиг
                await client.ConnectAsync("smtp.yandex.ru", 25, false);
                await client.AuthenticateAsync("strive.tms@yandex.ru", "nFwTjq5K23sdYLx");
                await client.SendAsync(msg);
                await client.DisconnectAsync(true);
            }
        }
    }
}
