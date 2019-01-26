namespace Strive.Communication.Emails.EmailBuilders
{
	/// <summary>
	/// Реализует функционал, необходимый для построения email сообщений
	/// подтверждения регистрации учетных записей пользователей
	/// </summary>
	public class ConfirmRegistrationEmailBuilder : EmailBuilder
    {
        private readonly string _emailConfirmationLink;

        public ConfirmRegistrationEmailBuilder(string pemailConfirmationLink) : base()
        {
            _emailConfirmationLink = pemailConfirmationLink;
        }

        public override void SetSubject()
        {
            // @todo locale
            _message.Subject = "Strive register";
        }

        public override void SetBody()
        {
            // @todo locale
            AddBodyTextPart($"Strive register <a href=\"{_emailConfirmationLink}\">link</a>");
            base.SetBody();
        }
    }
}
