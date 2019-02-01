namespace Strive.Communication.Emails
{
	/// <summary>
	/// Класс, предназначенный для хранения локализованных параметров письма
	/// </summary>
	public class EmailLocalizationParameters
	{
		/// <summary>
		/// Локализованная секция отправителя
		/// </summary>
		public string From { get; set; }

		/// <summary>
		/// Локализованная секция темы
		/// </summary>
		public string Subject { get; set; }

		/// <summary>
		/// Локализованная секция тела
		/// </summary>
		public string Body { get; set; }
	}
}
