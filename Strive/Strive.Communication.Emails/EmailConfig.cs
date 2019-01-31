using System;
using System.Collections.Generic;
using System.Text;

namespace Strive.Communication.Emails
{
	/// <summary>
	/// Представляет объект конфигурации для отправки email-сообщений
	/// </summary>
	public class EmailConfig
	{
		/// <summary>
		/// Имя SMTP-сервера
		/// </summary>
		public string Host { get; set; }

		/// <summary>
		/// Порт для подключения к хосту
		/// </summary>
		public int Port { get; set; }

		/// <summary>
		/// Параметр, указывающий, нужно ли использовать SSL для подключения
		/// </summary>
		public bool UseSsl { get; set; }

		/// <summary>
		/// Имя пользователя для аутентификации в почтовом клиенте
		/// </summary>
		public string UserName { get; set; }

		/// <summary>
		/// Пароль для аутентификации в почтовом клиенте
		/// </summary>
		public string Password { get; set; }
	}
}
