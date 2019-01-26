using MimeKit;

namespace Strive.Communication.Emails
{
	/// <summary>
	/// Предоставляет интерфейс, необходимый для построения email сообщений
	/// </summary>
	public interface IEmailBuilder
    {
        /// <summary>
        /// Построение части письма, отвечающей за отправителя
        /// </summary>
        void SetFrom();

        /// <summary>
        /// Построение части письма, отвечающей за получателя
        /// </summary>
        /// <param name="receiverName">Имя получателя</param>
        /// <param name="preceiverEmail">Адрес электронной почты получателя</param>
        void SetTo(string preceiverName, string preceiverEmail);

        /// <summary>
        /// Построение темы письма
        /// </summary>
        void SetSubject();

        /// <summary>
        /// Построение тела письма
        /// </summary>
        void SetBody();

        /// <summary>
        /// Создание письма
        /// </summary>
        MimeMessage Build();
    }
}
