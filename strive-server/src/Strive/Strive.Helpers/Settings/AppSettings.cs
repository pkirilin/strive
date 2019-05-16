namespace Strive.Helpers.Settings
{
	/// <summary>
	/// Basic application settings
	/// </summary>
	public class AppSettings
	{
		/// <summary>
		/// Secret key used for signing and generating JWT-tokens
		/// </summary>
		public string Secret { get; set; }
	}
}
