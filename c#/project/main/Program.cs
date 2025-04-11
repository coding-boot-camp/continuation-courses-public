using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CatWorx.BadgeMaker
{
    class Program
    {
        async static Task Main(string[] args)
        {
            List<Employee> employees = new List<Employee>();

            Console.Write("Fetch data from API? [yes]/no ");
            string answer = Console.ReadLine() ?? "";

            answer = answer.ToLower();

            if (answer == "no" || answer == "n") 
            {
                employees = PeopleFetcher.GetEmployees();
            } 
            else 
            {
                employees = await PeopleFetcher.GetFromApi();
            }

            Util.MakeCSV(employees);
            await Util.MakeBadges(employees);
        }
    }
}
