namespace Strive.Data.Entities
{
	/// <summary>
	/// Contains info about project
	/// </summary>
	public class Project
	{
		public int Id { get; set; }

		public string Name { get; set; }

		public string Description { get; set; }

		public int UserId { get; set; }

		public User User { get; set; }
	}
}
