## Introduction

Now that we have a C# application that can successfully create employee instances, it's time to actually do something with that data. The ultimate goal is to superimpose this employee data onto badge images, but let's tackle a smaller problem first. We need a way to save all the information we're gathering in case the company needs to reference it again. One way to accomplish this would be to insert records into a database, but if we don't want to deal with the hassle of databases right now, we could also write it to a local file.

As we start adding more features and functionality to the app, it’s important to keep the codebase organized and not let any one file or class get too complex and unwieldy. This goes back to the SOLID design principles that we touched on previously.

The following steps show how we'll approach the objectives for this lesson:

1. Create a `Util` class, which we'll use to populate the CSV file.

2. Create the `data` folder to house the CSV file.

3. Import the `System.IO` namespace in order to enable writing to a CSV file.

Along the way, you'll learn how to do the following:

* Use `static` to keep code neatly organized.

* Populate a CSV file with `Util`.

* Manage memory with the `using` keyword.

Next up, we'll preview how we'll approach this lesson.

## Preview

The goal for this lesson is to complete the badge-maker application's first big feature: write employee data to a CSV file.

To accomplish this, we will follow these steps:

1. Clean up the code by using classes.

2. Pseudocode the steps.

3. Add a new method to `Util` and call it from `Program.cs`.

4. Check for and create the data folder.

5. Create the CSV file.

6. Loop over the employees and write the data.

Now let's follow these steps to implement this feature!

## Clean Up the Code by Using Classes

First, let's clean up the code by creating some new classes. To start, create a new file called `Util.cs` in the same directory as `Program.cs`. This class is where we’ll handle any output-related logic. Type the following code in this new file:

```c#
namespace CatWorx.BadgeMaker
{
  class Util
  {

  }
}
```

Does this look familiar? We started the `Employee` class this way. Note that we want to make this available in the same namespace so that other classes like `Program` can see and use it. Unlike `Employee`, though, we won't create new instances of this class. See the following code for an example:

```c#
// What you won't be doing
Util thing = new Util();
```

Instead, this class will be a collection of general methods that can be used again and again&mdash;like the `WriteLine()` method that's available on the `Console` class.

We're already familiar with the `public` modifier, because it was integral to the `Employee` class. We’ll want the methods on `Util` to be public as well, but we need an extra modifier to make this work correctly, as shown in the following example:

```c#
namespace CatWorx.BadgeMaker
{
  class Util
  {
    // Method declared as "static"
    public static void PrintEmployees()
    {

    }
  }
}
```

We defined the preceding `PrintEmployees()` method as **static**, meaning that it belongs to the class itself instead of individual instances or objects. In other words, we don’t have to create a new `Util` object to use it. We can access this method directly from the class name, as follows:

```c#
Util.PrintEmployees();
```

If you look back at the `Program` class, you’ll recognize that the first method given to us was also declared as static, as shown in the following example:

```c#
static void Main(string[] args)
{

}
```

.NET won't create a new instance of `Program` to run the app; it only looks for a `Main()` method on the class itself (or other classes, if one doesn’t exist on `Program`). If you remove the `static` modifier, the app will break, because .NET can't see and run `Program.Main()` as is. Review the following example:

```c#
class Example
{
  // Example.StaticMethod();
  public static void StaticMethod()
  {
    Console.WriteLine("Bananas");
  }
  
  // Example thing = new Example();
  // thing.InstanceMethod();
  public void InstanceMethod()
  {
    Console.WriteLine("Oranges");
  }
}
```

Yes, it’s possible for a class to have both, but whether or not you should combine them largely depends on how you intend to use the class. In this case, it makes sense that `Util` will only ever have static methods.

Now is a good opportunity to start cleaning up the main `Program`. Move the previous `for` loop and console-writing logic out of `Program` and into the static method in `Util`. You might get some errors during the transfer; think about what might be missing from `Util` to get everything hooked up again.

> **Hint**
>
> Lists aren't part of the `System` namespace. Think about what we want to "give" this method.

Your code should resemble the following example:

```c#
// Import correct packages
using System;
using System.Collections.Generic;

namespace CatWorx.BadgeMaker
{
  class Util
  {
    // Add List parameter to method
    public static void PrintEmployees(List<Employee> employees) 
    {
      for (int i = 0; i < employees.Count; i++) 
      {
        string template = "{0,-10}\t{1,-20}\t{2}";
        Console.WriteLine(String.Format(template, employees[i].GetId(), employees[i].GetFullName(), employees[i].GetPhotoUrl()));
      }
    }
  }
}
```

In the `Main()` method in `Program.cs`, delete the old `PrintEmployees()` method and replace the call to it with a call to the `Util` method, as follows:

```c#
Util.PrintEmployees(employees);
```

Run the app again to confirm that everything still works.

Congratulations! You just finished some much-needed code cleanup and made it easier to add future features. Next you'll deepen your understanding of static and instance methods before moving on.

### About CSV Files

Incidentally, the `Util` class will do more than just print names to the console. It will also populate a CSV file and, later, create nifty badge images. **CSV** files are simply text files containing lines of **comma-separated values**.

You can create your own CSV in any code editor by saving the following text as a CSV file:

```csv
1,sam,samerson

2,jane,janerson
```

If you have Excel installed, you can open this file as a spreadsheet. Alternatively, there are VS Code extensions that will display the CSV as a table. In any case, the CSV file type is versatile and fairly easy to make programmatically, so it’s a great fit here.

## Pseudocode the Steps

Any time we start building a new feature, it’s a good idea to take a step back and pseudocode how we plan to approach it.

The goal at this point is to save all of the employee data to a CSV file located in `data/employees.csv`. Write down in plain language how you'd approach this problem before moving on.

> **Hint**
>
> What needs to exist first, before other things can happen?

Your plan might resemble the following steps:

1. Add another static method to the `Util` class, which will make the CSV file.

2. Call this method from within `Program`, passing in the list of employees.

3. In the method, check whether a `data` folder exists. If not, create it.

4. Create a new file located at `data/employees.csv`.

5. Loop over the given employees.

6. Write each employee’s info as a comma-separated string to the CSV file.

Even if your steps don’t 100% match up with the ones listed here, that doesn’t mean you got it wrong. Everyone codes differently, and this is simply one way to approach the task.

With this plan in place, let's get to work!

## Add a New Method to Util and Call from Program

Mirroring what we did previously with the `PrintEmployees()` method, add another static method, called `MakeCSV()`, to `Util`. The code should look like the following example:

```c#
using System;
using System.Collections.Generic;

namespace CatWorx.BadgeMaker
{
  class Util
  {
    public static void PrintEmployees(List<Employee> employees) 
    {
      // ...
    }

    public static void MakeCSV(List<Employee> employees)
    {
        
    }
  }
}
```

Although this method doesn’t actually do anything yet, let’s prep the main `Program.cs` to use it. Doing so will make it easier to test as we go along. Put the following code in the `Main()` function of `Program.cs`, beneath `List<Employee> employees = GetEmployees();`:

```c#
Util.PrintEmployees(employees);
Util.MakeCSV(employees);
```

## Check for and Create the Data Folder

Ultimately, we want to output the CSV to a new folder called `data`, but there’s a problem&mdash;we don’t have a folder called `data`. We could create the folder manually, but if the folder ever got deleted, the app would break.

Instead, let’s handle this with a bit of code. Inside the `MakeCSV()` method, write the following:

```c#
// Check to see if folder exists
if (!Directory.Exists("data")) 
{
  // If not, create it
  Directory.CreateDirectory("data");
}
```

This code will look for the folder first; if it doesn’t exist, the app will create it for the first time. However, you probably already saw some errors pop up, because the `Util` class doesn’t know what `Directory` means. What does that usually suggest? How could you solve this problem?

> **Hint**
>
> How did we fix this issue with the `List` class?

Yep, we’re missing a namespace. The documentation for the `Directory` class tells us that it falls under the `System.IO` namespace. Let’s add that alongside the other imports, as follows:

```c#
using System;
using System.IO;
using System.Collections.Generic;
```

> **Deep Dive**
>
> To learn more, refer to the [Microsoft Docs on the Directory class](https://docs.microsoft.com/en-us/dotnet/api/system.io.directory).

Okay, now we'll run the app and confirm that everything currently works as expected. If so, a `data` folder will be created in the same directory as the other classes.

## Create the CSV

The `System.IO` namespace in the .NET framework provides other classes, besides `Directory`, that can aid file system operations. One such class is `System.IO.StreamWriter`, which facilitates creating and writing to files. Let's put that one to use!

After the directory logic, create a new `StreamWriter` object, as shown in the following example:

```c#
StreamWriter file = new StreamWriter("data/employees.csv");
```

That alone will make a new (albeit empty) CSV file in the `Data` folder. However, we’re not really following best practices here. In .NET apps, memory management is pretty important; we don’t want to waste memory on potentially heavy resources that are no longer being used.

So we could manually dispose of the `StreamWriter` object once we’re done with it&mdash;or we could let .NET do that for us with a `using` statement. This `using` statement would resemble the following example:

```c#
using (StreamWriter file = new StreamWriter("data/employees.csv"))
{
  // Any code that needs the StreamWriter would go in here
}
```

Yes, the keyword `using` has two distinct meanings that depend on the context (importing a namespace versus temporarily using a resource). Just remember that whatever is defined in the parentheses is ONLY available within the subsequent set of curly braces. Once that block of code runs, the resource (in this case, `StreamWriter`) is removed.

> **Deep Dive**
>
> To learn more, refer to the [Microsoft Docs on IDisposable](https://docs.microsoft.com/en-us/dotnet/api/system.idisposable).

## Loop Over the Employees and Write the Data

Let’s write the first line of the CSV file inside the `using` statement. This line will provide column headings to help users make sense of the data. It should resemble the following example:

```c#
using (StreamWriter file = new StreamWriter("data/employees.csv"))
{
  file.WriteLine("ID,Name,PhotoUrl");
}
```

Run the code and verify that the text `"ID,Name,PhotoUrl"` appears in the CSV file.

Cool, we’re almost there! The last thing to do is to populate the file with actual employee data. We can repurpose the `for` loop and console log logic we wrote earlier&mdash;just change `Console.WriteLine()` to `file.WriteLine()`.

Try it on your own before referencing the following completed code:

```c#
using (StreamWriter file = new StreamWriter("data/employees.csv"))
{
  file.WriteLine("ID,Name,PhotoUrl");

  // Loop over employees
  for (int i = 0; i < employees.Count; i++)
  {
    // Write each employee to the file
    string template = "{0},{1},{2}";
    file.WriteLine(String.Format(template, employees[i].GetId(), employees[i].GetFullName(), employees[i].GetPhotoUrl()));
  }
}
```

Run the app and check whether your employee data made it into the CSV. Then celebrate! Knowing how to create files gives you a lot more power in developing applications.

> **Deep Dive**
>
> Along with creating files, it’s also pretty useful to be able to read the contents of a file. To learn more, refer to the [Microsoft Docs on the StreamReader class](https://docs.microsoft.com/en-us/dotnet/api/system.io.streamreader).

Fantastic work. You've completed another important phase of the badge-maker application build! The next step will be creating image files.

## Reflection

Now for a recap. In this lesson, we refactored the badge-maker app's code by adding another class whose methods were defined as static. One of those static methods used the `StreamWriter` class to write content to a file. We achieved the following tasks:

* Used `static` to keep code neatly organized.

* Populated a CSV file with `Util`.

* Managed memory with the `using` keyword.

Before you move on, take a few minutes to review the key concepts you've just learned. Specifically, what does the `static` modifier mean? And why was it necessary to wrap `StreamWriter` in a `using` statement?

As you move on to creating image files, you'll find that the syntax differs from what you've seen up till now. But you’re well prepared for the challenge if you’ve made it this far!

---

© 2025 edX Boot Camps LLC. Confidential and Proprietary. All Rights Reserved.
