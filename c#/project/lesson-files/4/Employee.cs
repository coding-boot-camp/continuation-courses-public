namespace CatWorx.BadgeMaker
{
    class Employee
    {

        private string FirstName;
        private string LastName;
        private int Id;
        private string PhotoUrl;
        private string CompanyName = "CatWorx";

        public Employee(string firstName, string lastName = "", int id = 0, string photoUrl = "")
        {
            FirstName = firstName;
            LastName = lastName;
            Id = id;
            PhotoUrl = photoUrl;
        }

        public string GetFullName()
        {
            return FirstName + " " + LastName;
        }

        public int GetId()
        {
            return Id;
        }

        public string GetPhotoUrl()
        {
            return PhotoUrl;
        }
        public string GetCompanyName()
        {
            return CompanyName;
        }
    }
}
