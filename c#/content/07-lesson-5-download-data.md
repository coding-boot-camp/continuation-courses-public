## Introduction

So far, we’ve been manually entering employee data, which is definitely a useful feature to have in the app. However, if we needed to import hundreds or thousands of employees, this wouldn't be sustainable. So let's automate it. One approach would be to import a CSV, which would just require looking into the `StreamReader` class. Another method would be to download all of this data from an API. Because working with APIs is a big part of software development, let’s solve this problem from that perspective.

Here's a high-level overview of what we'll do in this final lesson:

1. Create the `PeopleFetcher` class.

2. Request data from the Random User Generator API.

3. Convert JSON to C# data types.

4. Create a new employee for each person that we fetched from the API.

## Preview

In this lesson, we make a request to an API in order to automate the badge-creation process.

To do this, we'll execute the following steps:

1. Generate employee data by using the Random User Generator API.

2. Pseudocode the steps.

3. Prepare the `PeopleFetcher` class.

4. Call the API.

5. Convert the JSON.

6. Create the employees.

7. Add the finishing touches.

Now that we have a plan, it's time to get started!

## Generate Employee Data by Using an API

We couldn't convince any companies to hand over their employee data, so we’ll use the next best thing: the [Random User Generator API](https://randomuser.me/documentation). This is a great API for prototyping front-end and back-end features when we don’t yet have access to real users. The API provides many options, but we’re only concerned with one endpoint: [https://randomuser.me/api/?results=10&nat=us&inc=name,id,picture](https://randomuser.me/api/?results=10&nat=us&inc=name,id,picture).

This will give us 10 random US citizens along with their names, fake id numbers, and thumbnail photos in JSON format. Visit the URL in another tab and skim over the data to get familiar with how we'd parse it. Note the nested object structure, as follows:

```json
{
  "results": [
    {
      "name": {
        "title": "mr",
        "first": "nicholas",
        "last": "reid"
      },
      "id": {
        "name": "SSN",
        "value": "410-26-4992"
      },
      "picture": {
        "large": "https://randomuser.me/api/portraits/men/75.jpg",
        "medium": "https://randomuser.me/api/portraits/med/men/75.jpg",
        "thumbnail": "https://randomuser.me/api/portraits/thumb/men/75.jpg"
      }
    }
  ]
}
```

Dust off those JavaScript skills and think about how you'd grab the name, id, and picture from this data. With plain JavaScript, it would look something like the following example:

```js
// FirstName
results[0].name.first

// Id
results[0].id.value

// PhotoUrl
results[0].picture.large
```

Even though you can’t use JavaScript here and the syntax will be a little different, pocket that knowledge&mdash;it’ll help you later.

## Pseudocode the Steps

You're in the final stretch, so the provided code snippets will become less complete, to give you a chance to flex your new C# muscles. Regardless, you should still have a solid plan before proceeding. Pseudocoding can help you develop that plan.

Remember, we want to keep the manual input feature but add another feature to download employee data from the API. Because the app is growing again, this would also be a good time to do more refactoring. Take that into account when pseudocoding these last few steps.

> **Hint**
>
> The `Util` class ended up being used for all output. What could we do for all input?

The following steps represent the pseudocode for this final lesson:

1. Create a new `PeopleFetcher.cs` file in the root project directory.

2. Create the `PeopleFetcher` class in the new `PeopleFetcher.cs` file with the following code:

    ```c#
    using System;
    using System.Collections.Generic;

    namespace  CatWorx.BadgeMaker 
    {
      class PeopleFetcher 
      {
        // code from GetEmployees() in Program.cs
      }
    }
    ```

3. Remove the `GetEmployees()` function from the `Program.cs` and place it into the new `PeopleFetcher` class in the `PeopleFetcher.cs` file.

4. In the new `PeopleFetcher.cs` file, create a new method called `GetFromApi()`.

5. Make an HTTP request to the API endpoint.

6. Convert JSON to C# data types.

7. Create a new `Employee` for each person that we fetched from the API.

## Prepare the PeopleFetcher Class

This section represents steps 1–3 in our pseudocode. We chose to call the new class `PeopleFetcher`, because its purpose is to fetch people's data from various places, be it the command line or an API. Calling on the `PeopleFetcher` class, we can call the method, `GetEmployees()`, and store the data in `employees`, as shown in the following code:

```c#
employees = PeopleFetcher.GetEmployees();
```

If you get stuck, refer back to the steps we took with `Util` and printing the employees to the console.

> **Hint**
>
> Remember that methods need to be made public to be accessed from other classes.

This is another example of moving things around for the sake of organization. It’s perfectly normal to find yourself doing this at various stages during development. As you write more code, you’ll frequently spot places where you could divide a class into other classes. In fact, some design principles suggest that a class should only ever have one job, but no need to go that far today.

With the new `PeopleFetcher` class in place, run the app again as a quick sanity test to make sure everything still works before moving on. If things look good, add another method to `PeopleFetcher`, called `GetFromApi()`. This method will also return a `List` of `Employee` instances. It’s okay if it returns an empty `List` for now. Your work should look like the following code:

```c#
public static List<Employee> GetFromApi() 
{
  List<Employee> employees = new List<Employee>();
  return employees;
}
```

We’ll worry about populating it later. Comment out the existing assignment in `Program.cs` for `employees` and add the following statement:

```c#
employees = PeopleFetcher.GetFromApi();
```

This is temporary, for testing whether the API is returning the employee names properly.

## Call the API

This section represents step 4 in the pseudocode steps. Finally, the app is ready for that new feature! In `PeopleFetcher`, import the `System.Net.Http` namespace. You might remember needing to import this namespace in the previous module when it was time to download images. You can use the same `HttpClient` class from `System.Net.Http` to download information from API endpoints. Add the following code to the `GetFromApi()` method in `PeopleFetcher.cs` file, right before that method's return statement:

```c#
using (HttpClient client = new HttpClient())
{

}
```

Remember that to use an asynchronous method, we will need to make updates to the method we are using the asynchronous code in, and we will need to change the place that we call the method from. In this case,  we need to update the `GetFromApi()` method and the `Main()` method. Update the `GetFromApi()` to look like the following:

```c#
async public static Task<List<Employee>> GetFromApi()
{
  ...
}
```

Notice that here we are using the `Task` return type that looks like `Task<TResult>` like we discussed previously. Because this method is asynchronous and does not return `null`, we need to specify the return type and replace `<TResult>` with the return type, which in this case is `List<Employee>`. As a result of this, we end up with a return type of `Task<List<Employee>>`.

> **Hint**
>
> Don't forget to import the `System.Threading.Tasks` namespace in `PeopleFetcher.cs`!

We will also need to update the call in the `Main()` method to look like the following:

```c#
employees = await PeopleFetcher.GetFromApi();
```

We’ll use a different method this time from the `HttpClient` method we used the last time. This time we will be using a method called `GetStringAsync()` rather than `GetStreamAsync()`. Add the following code to our `using` block in the `GetFromApi()` method:

```c#
string response = await client.GetStringAsync("https://randomuser.me/api/?results=10&nat=us&inc=name,id,picture");
```

The `GetStringAsync()` method will do exactly what it sounds like: return all of the information from this URL as a `string`. Save your work and print the response to the console to verify that the API request is working. If you see a massive block of unformatted JSON, as follows, you’re on the right track:

```json
{"results":[{"name":{"title":"ms","first":"danielle","last":"reid"},"id":{"name":"SSN","value":"801-52-3803"},"picture":{"large":"https://randomuser.me/api/portraits/women/37.jpg","medium":"https://randomuser.me/api/portraits/med/women/37.jpg","thumbnail":"https://randomuser.me/api/portraits/thumb/women/37.jpg"}}],"info":{"seed":"ad252bbde80093d2","results":1,"page":1,"version":"1.2"}}
```

## Convert the JSON

This section will take care of pseudocode step 5. Here’s the good news: you have the data that you wanted. The bad news: it’s all in a string. If you’re comfortable with JavaScript, your instinct might be to convert the string back to JSON, because that’s the way the API was structured to begin with. But if you look at the data more objectively, you’ll notice that it’s a mix of data types: arrays, objects, sub-objects, strings, integers, and so on. So how does a complex JavaScript object fit into a language like C#, where data types must be declared?

While C# doesn’t necessarily have JavaScript-like objects, it does have classes, and classes can hold multiple data types. The `Employee` class contains strings, integers, and methods, after all. Fortunately, there are ways to **serialize**, or convert, a C# class to JSON, as well as ways to **deserialize** JSON into a C# class. Unfortunately, this really only works if we have a direct, one-to-one match between the data.

Something like the following code would deserialize perfectly:

```json
{
  "FirstName": "darrell",
  "LastName": "diaz",
  "Id": 427783006,
  "PhotoUrl": "https://randomuser.me/api/portraits/men/47.jpg"
}
```

Alas, what we get from the API doesn’t line up that nicely. This is where the solution becomes a bit more open-ended, which is actually a good thing! One thing that makes programming fun is how there’s always more than one way to solve a problem. If you google "C# parse json," you’ll find a wide variety of suggestions. One approach would be to create another class that acts as a **model** for the API and accounts for all of its nested properties. There are also additional .NET packages that could help us out here.

Let’s try using the Json.NET framework, because it won’t feel like such a big departure from how we would do things the JavaScript way.

> **Deep Dive**
>
> To learn more, refer to the [Json.NET documentation](https://www.newtonsoft.com/json/help/html/Introduction.htm).

Json.NET is available under the package name `Newtonsoft.Json`, so make sure you install it the same way you installed the `SkiaSharp` package in the previous section. Run the following command in the CLI:

```bash
dotnet add package Newtonsoft.Json 
```

Once installed, import the correct namespace in the top of the `PeopleFetcher.cs` file:

```c#
using Newtonsoft.Json.Linq;
```

This gives us access to a new class called `JObject` that will allow us to parse the JSON. In fact, the first method we’ll use is called `Parse()`. Delete the statement `Console.Write(response);`, which we used to test the app. Add the following code in its place (after the response assignment):

```c#
JObject json = JObject.Parse(response);
```

This will convert the string that we downloaded from the API into a `JObject`, which has a useful method attached to it called `SelectToken()`. Go ahead and run the following console logs to see what happens:

```c#
Console.WriteLine(json.SelectToken("results[0].name.first"));
Console.WriteLine(json.SelectToken("results[1].name.first"));
Console.WriteLine(json.SelectToken("results[2].name.first"));
```

If you encountered an error, look at the error message in the CLI as the first clue toward the fix.

If you see the following error message, it means that a module that's necessary for the application to work is missing.:

```bash
Unhandled Exception: The type initializer for 'Gdip' threw an exception. Unable to load DLL `libgdiplus`: The specified module could not be found.
```

This error only affects non-Windows users, due to a missing library. For macOS users, install the missing module by typing the following command:

```bash
brew install mono-libgdiplus
```

Now we should be able to pull data out of the JSON string using a syntax we’re already familiar with: `results[0].name.first`. One caveat is that it was a string we had to pass into the `SelectToken()` method.

Knowing this, the command `json.SelectToken("results")` should give us the entire array of people objects for us to iterate over. Remember, though, this isn't really an array or a list. It's a `JObject`. So a normal `for` loop won't help us here.

Do a bit of research and trial-and-error to see if you can successfully loop over results, console logging each person's first name (and only the first name for now) on every iteration.

> **Pause**
>
> **Question:** What makes JSON difficult to use in C#?
>
> **Answer:** C# doesn’t have JavaScript-like objects.

## Create the Employees

This section completes pseudocode step 6. That last step was probably a bit tricky, but hopefully you have a loop set up now that's accessing a new `JObject` on every iteration, allowing you to perform sub queries, as shown here:

```c#
// "person" is a new JObject derived from "results[i]"
person.SelectToken("name.first")
```

If you came across a different approach in your search, that's fine, too. What matters is that you were able to get the data (the 10 first names). At the same time, you'll want to make sure that you can get each person's last name, id, and photo URL. All of this will feed nicely into the `Employee` constructor, as shown in the following code:

```c#
Employee employee = new Employee
(
  person.SelectToken("name.first"),
  person.SelectToken("name.last"),
  // etc...
);
```

But wait, an `Employee` takes in three strings and an integer&mdash;and these aren't strings. They're `JObject` data types. Look into how you can convert these to the right data types before giving them to the constructor. Fair warning, the id won't be as straightforward to convert to an integer as it might seem.

Once the data types are correct, add each new employee to the `List` that this method returns. The correct coding solution should more or less match the following code:

```c#
foreach (JToken token in json.SelectToken("results")) {
  // Parse JSON data
  Employee emp = new Employee
  (
    token.SelectToken("name.first").ToString(),
    token.SelectToken("name.last").ToString(),
    Int32.Parse(token.SelectToken("id.value").ToString().Replace("-", "")),
    token.SelectToken("picture.large").ToString()
  );
  employees.Add(emp);
}
```

Run the app. If successful, your `data` folder will become populated with 10 random user badges!

You may notice that there are warnings showing up when you run the application at this point. They are mentioning a possible null reference. Earlier we tackled a similar warning when we were using the `Console.ReadLine()` method earlier. See if you can find a way to get the warnings to go away.

One solution could be to use the null-forgiving operator `!` like in the following code:

```c#
foreach (JToken token in json.SelectToken("results")!) {
  // Parse JSON data
  Employee emp = new Employee
  (
    token.SelectToken("name.first")!.ToString(),
    token.SelectToken("name.last")!.ToString(),
    Int32.Parse(token.SelectToken("id.value")!.ToString().Replace("-", "")),
    token.SelectToken("picture.large")!.ToString()
  );
  employees.Add(emp);
}
```

This tells the compiler that this expression is not null. For more information, see the [Microsoft docs on ! (null-forgiving) operator](https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/operators/null-forgiving).

## Add the Finishing Touches

Earlier, you swapped out the manual `GetEmployees()` method with the new `GetFromApi()` method, but you want both options to be available in the final version of the app. Ideally, the app will first ask if the user wants to fetch data from the API. If they answer "yes," it will run the `GetFromApi()` method. If "no," it will run the `GetEmployees()` method. In either case, once the employee data is collected, the app will still generate the CSV file and badge images. Go ahead and implement these final changes however you see fit. No hints; you got this!

Afterwards, make sure to properly celebrate (and ask for a raise from CatWorx leadership)! This app will save you and your company a lot of time now when it comes to creating new security badges for employees. Granted, there's always more that could be added to it, which means a chance to continue learning and strengthening your C# skills.

For instance, a fun bonus feature would be to upload the images to an online service like Google Drive or Imgur, save the employee data in a MySQL database, or add a default profile picture if one doesn't exist for any given user. You could also think about other companies potentially wanting to use this application, so adding a company name as one of the input options would be a great addition. Whatever you do, just keep practicing and building cool stuff!

> **Deep Dive**
>
> To learn more, refer to the [Imgur API documentation](https://apidocs.imgur.com/).

## Reflection

You did a great job working through a dense lesson of concepts, syntax, and package installs. The application is now properly situated to receive a response from an API and produce security badges. You have successfully automated the badge creation process, and now CatWorx can spend more time focusing on their core products and services!

In this lesson, you completed the following tasks:

* Made a request to the Random User Generator API for employee data.

* Parsed the JSON response into C# data types.

* Created a separate badge for each employee.

Now that we've reached the end of this module, let's take a moment to reflect on some of the key tasks we accomplished using C#:

* Set up the development environment by installing a VS Code extension and the .NET Core SDK.

* Used namespaces to organize the code and import libraries from the .NET framework.

* Defined functions and classes by using C# syntax.

* Used the `System.IO` namespace to write to a CSV file.

* Imported the `SkiaSharp` package to use graphics tools to create the badge template background.

* Used the `HttpClient` class to insert employee data into the badge template.

Although many differences are evident between C# and JavaScript, there are also many similarities that reduced the learning curve, such as understanding and leveraging the object-oriented approach to programming.

With your newfound familiarity with C#, a new world of development possibilities has emerged. C# is exceptionally versatile. Along with the .NET framework and a few extensions, you can use it to create many different types of apps, including mobile, web, desktop, cloud, and even gaming. By adding C# to your skill set, you've added a modern general-purpose language known for its speed and reliability with a vast community of resources and developers (including the backing of Microsoft!), which ensures a long and successful development existence.

---

© 2025 edX Boot Camps LLC. Confidential and Proprietary. All Rights Reserved.
