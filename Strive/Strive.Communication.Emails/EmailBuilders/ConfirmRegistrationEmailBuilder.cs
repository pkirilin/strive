namespace Strive.Communication.Emails.EmailBuilders
{
	/// <summary>
	/// Реализует функционал, необходимый для построения email сообщений
	/// подтверждения регистрации учетных записей пользователей
	/// </summary>
	public class ConfirmRegistrationEmailBuilder : EmailBuilder
	{
		private readonly string _emailConfirmationLink;

		public ConfirmRegistrationEmailBuilder(EmailConfig pemailConfig,
			EmailLocalizationParameters plocalizationParameters,
			string pemailConfirmationLink) : base(pemailConfig, plocalizationParameters)
		{
			_emailConfirmationLink = pemailConfirmationLink;
		}

		public override void SetSubject()
		{
			base.SetSubject();
		}

		public override void SetBody()
		{
			base.SetBody();
			AddBodyTextPart($":<br><a href=\"{_emailConfirmationLink}\">{_emailConfirmationLink}</a>");
		}
	}
}
