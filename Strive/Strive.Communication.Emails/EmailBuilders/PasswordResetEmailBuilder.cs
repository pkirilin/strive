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
			string ppasswordResetLink) : base(pemailConfig)
		{
			_passwordResetLink = ppasswordResetLink;
		}

		public override void SetSubject()
		{
			// @todo locale
			_message.Subject = "Strive reset password";
		}

		public override void SetBody()
		{
			// @todo locale
			AddBodyTextPart($"Strive reset password <a href=\"{_passwordResetLink}\">link</a>");
			base.SetBody();
		}
	}
}
