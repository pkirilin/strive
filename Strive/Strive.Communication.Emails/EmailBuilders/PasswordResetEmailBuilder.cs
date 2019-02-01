namespace Strive.Communication.Emails.EmailBuilders
{
	/// <summary>
	/// Реализует функционал, необходимый для построения email сообщений
	/// сброса пароля учетных записей пользователей
	/// </summary>
	public class PasswordResetEmailBuilder : EmailBuilder
	{
		private readonly string _passwordResetLink;

		public PasswordResetEmailBuilder(EmailConfig pemailConfig,
			EmailLocalizationParameters plocalizationParameters,
			string ppasswordResetLink) : base(pemailConfig, plocalizationParameters)
		{
			_passwordResetLink = ppasswordResetLink;
		}

		public override void SetSubject()
		{
			base.SetSubject();
		}

		public override void SetBody()
		{
			base.SetBody();
			AddBodyTextPart($":<br><a href=\"{_passwordResetLink}\">{_passwordResetLink}</a>");
		}
	}
}
