## Introduction

By now you should be well aware that, in the beginning, much of your time spent building an application involves setting up the right environment, pseudocoding steps to help guide the workflow, and procuring resources or data for the testing process.

So far, that's what we've achieved for our badge-maker app. But now we’ve reached the point when we can create the security badges and deliver the end result!

In this lesson, you'll learn how to do the following:

* Use pseudocode to break down each step ahead of time and outline your workflow.

* Research and use classes and methods to manipulate images and text.

* Convert objects into more usable data types.

* Designate placement and size of images using `SKRect`.

* Create a new file with the `SaveTo()` method.

## Preview

The goal in this lesson is to make the actual badges that we set out to create in the first place!

In order to do this, we'll proceed using the following steps:

1. Pseudocode the steps you'll take for this feature.

2. Create the `MakeBadges()` method in the `Util` class.

3. Import the `SkiaSharp` package to use its graphics tools to create the badge template.

4. Set up the badge template in the `MakeBadges()` method.

5. Build the badges by using the `HttpClient` class to insert employee data into the badge template.

6. Render the employee photo using the `SKBitmap` class.

7. Insert the image onto the badge by converting the `SKBitmap` into a `SKCanvas` object.

8. Print the employee's information on the badge.

Now let's get started.

## Pseudocode the Steps

As always, let's start by identifying the key tasks and mapping out the right sequence of these tasks. We'll think in terms of specific actions or functional steps required.

Remember, the end goal is to produce a security badge that displays the employee picture, employee name, company name, and employee id number. That might seem like a lot, so let's break it down into smaller objectives building up to the overall goal.

To make one badge for one employee, you might pseudocode the following steps:

1. Import the badge template image file that will work as the background image.

2. Customize each employee's badge by adding information specific to each employee&mdash;namely, the employee's name, picture, and id number.

3. Add this new image file to the data folder.

That seems more manageable, right? In the next section, you'll start to work through these steps.

## Create the MakeBadges() Method

We need a badge template before we can do much of anything! Navigate to [https://imgur.com/0EMSs68](https://imgur.com/0EMSs68) to find that. Place that image file in the root directory of the application. Rename the image file `badge.png`.

Now let's go ahead and create a placeholder method called `MakeBadges()`.

Consider the following as you think about creating this method:

* Which file should declare this method?

* Having learned about modifiers in the last section, which modifiers would help identify this method's utility?

* Also think about how this method will function in the context of the app&mdash;meaning how it will be invoked and when.

These are some of the basic questions that should be asked when declaring any method.

Not sure what to write yet? Go back and review, then come back and think about your answers again.

> **Hint**
>
> When this method is invoked, will it be on the class or object scope? What is the purpose of this method, and do we need it to return anything?

The following code shows the three methods we'll have in the `Util` class by the end of this lesson:

```c#
class Util
{
  public static void PrintEmployees(List<Employee> employees) {} 
  public static void MakeCSV(List<Employee> employees) {}
  async public static Task MakeBadges(List<Employee> employees) {}
}
```

The first two have already been created. Go ahead and add the `MakeBadges()` function to your `Util` class, in the location indicated in the code.

For now, the `MakeBadges()` method should look like the following:

```c#
class Util
{
  public static void MakeBadges(List<Employee> employees) {}
}
```

We will update the method to use the `async` keyword and `Task` return type when we add in asynchronous processing from the `HttpClient` object.

As you'll see in your VS Code editor, the new method `MakeBadges()` will be outlined in red. It will be very similar to the other `Util` methods in scope and function in that it will use the application's employee data to output a file or print to the console.

To clarify, all the methods in the preceding code are closed. This is just to show a possible placement of each method, because the actual order of the methods in the class is arbitrary.

Let’s break down the parts of the code:

* `async`&mdash;The `MakeBadges()` method will be asynchronous and use an `async`/`await` syntax that is similar to JavaScript. This is necessary because the method we use from the `HttpClient` object is asynchronous.

* `Task`&mdash;This is the required return type for an asynchronous method that returns no value.

* `public`&mdash;Must be accessible by the `Main()` method.

* `void`&mdash;The purpose of these methods is to create a file or print information, so there is no need for a return.

* `static`&mdash;Scoped to class, so can be invoked directly without instantiating an object.

* `List<Employee>`&mdash;Employees parameters, the data source of employee info.

## Set Up the SkiaSharp Namespace

If you do a quick internet search for `SkiaSharp`, you will see that it is a graphics system for .NET and C# for rendering 2D images. You will likely find that this API is based on [Google's Skia Graphics Library](https://skia.org/), that is used extensively throughout various Google products.

Next we will want to look at the specific docs for the [SkiaSharp Namespace](https://docs.microsoft.com/en-us/dotnet/api/skiasharp?view=skiasharp-2.88). There is quite a lot here, but quickly read over the descriptions for `SKBitmap`, `SKData`, `SKCanvas`, `SKImage`, and `SKPaint` as these will be relevant for our application.

Take a look at the [SKImage docs](https://docs.microsoft.com/en-us/dotnet/api/skiasharp.skimage?view=skiasharp-2.80.2). Our first objective is convert our `badge.png` file into an `SKImage` object.

> **Pause**
>
> **Question:** Why is it necessary to create a new `SKImage` object?
>
> **Answer:** The image must be translated into an instance object of the `SKImage` class to use the tools or methods in this class.

Note that location of the badge template file is crucial. We can simply call for the `badge.png` in this case, because we saved it in the root directory.

Now let's type the following code into the `MakeBadges()` method:

```c#
public static void MakeBadges(List<Employee> employees) {
  // Create image
  SKImage newImage = SKImage.FromEncodedData(File.OpenRead("badge.png"));
}
```

To create a new `SKImage` object with our `badge.png` file, we are using a static method on the `SKImage` class called `FromEncodedData()`. This method takes a data type called a `Stream`. `System.IO.Stream` is a class that allows reading and writing of bytes or data from a source. To convert our `badge.png` file into a `Stream`, we will use another class from the `System.IO` namespace called `File` and more specifically, the `OpenRead()` method. This method takes in a `string` with the file path.

> **Deep Dive**
>
> To learn more, refer to the [Microsoft Docs on the Stream class](https://docs.microsoft.com/en-us/dotnet/api/system.io.stream?view=net-6.0).

And now we'll call the method in the `Program.cs` file's `Main()` method just to see if the code is working, as follows:

```c#
static void Main(string[] args)
{
  List<Employee> employees = new List<Employee>();
  employees = GetEmployees();
  Util.MakeCSV(employees);
  Util.MakeBadges(employees);
}
```

But wait, how do we check to see if this `newImage` object was created correctly?

One option would be to save this `SKImage` object into a new file. This option is appealing because it is a step we'll need to accomplish anyway in the last step of the pseudocode.

The first step of this process is to encode our `SKImage` into the image format that we want. Take a look at the [docs for the Encode() method](https://docs.microsoft.com/en-us/dotnet/api/skiasharp.skimage.encode?view=skiasharp-2.80.2#skiasharp-skimage-encode). You can see that running the `Encode()` method with no arguments encodes the image in a png format, which is the format that we want to use. You can also see that the `Encode()` method returns the type `SKData`. Because of this, we will have to store it in a variable with that type.

Add the following code:

```c#
public static void MakeBadges(List<Employee> employees)
{
  SKImage newImage = SKImage.FromEncodedData(File.OpenRead("badge.png"));

  SKData data = newImage.Encode();
}
```

Now that we have our `SKImage` encoded in a png format, we will want to find a method to use on the `SKData` class that will allow us to save it to a file. Take a look at the [docs for the SKData Class](https://docs.microsoft.com/en-us/dotnet/api/skiasharp.skdata?view=skiasharp-2.80.2). Is there any method that looks promising in there? The `SaveTo()` method looks like it will accomplish what we are looking for. This method takes in a `Stream` to save the data into. Similar to before, we will use another method from the `File` class to convert the file we want to save to into a `Stream`. We will use the `OpenWrite()` method, which is used similarly to the `OpenRead()` method that we used before. We need to provide the file path to the `OpenWrite()` method as an argument.

Add the following code:

```c#
public static void MakeBadges(List<Employee> employees)
{
  SKImage newImage = SKImage.FromEncodedData(File.OpenRead("badge.png"));

  SKData data = newImage.Encode();
  data.SaveTo(File.OpenWrite("data/employeeBadge.png"));
}
```

Notice that we prefixed the argument in the `OpenWrite()` method with `data/` to ensure that the new image is stored in the `data` folder. Otherwise, the images would simply be stored in the project's root directory.

When you try to run the application at this point, you will get an output that looks similar to the following:

```console
$ dotnet run
Util.cs(41,13): error CS0246: The type or namespace name 'SKImage' could not be found (are you missing a using directive or an assembly reference?)
Util.cs(41,32): error CS0103: The name 'SKImage' does not exist in the current context 
Util.cs(42,13): error CS0246: The type or namespace name 'SKData' could not be found (are you missing a using directive or an assembly reference?)

The build failed. Fix the build errors and run again.
```

In the `Util.cs` file, add the `using` directive, as follows:

```c#
using SkiaSharp;
```

Now let's try to run the program again.

Hmm, we're running into the same issue. Now what are we missing? Let's focus on the second part of the error fix suggestion: it looks like we're missing an assembly reference. But what is an **assembly reference**? Think of it like in Node.js and npm, how we often had to manually import packages using `npm install`.

Basically, we're being told that `SkiaSharp` isn't available in .NET Core, so we'll manually add this package to the application. How do we go about that task? Let's google another query, something like, "how to use `SkiaSharp` in .NET Core".

This search leads to many responses that pertain to a new package called `SkiaSharp`. Look over the [NuGet documentation on SkiaSharp](https://www.nuget.org/packages/SkiaSharp/) and see if you can identify whether this is the right fit and how to install or add this package to your application.

As you can see, the types or classes available for graphics functionality are the same ones you discovered when researching the `SkiaSharp` namespace. There are multiple tabs showing how to install this package depending on your coding platform or text editor. Use the one for .NET CLI, which you've been using with the .NET Core tool.

Type the following into the command prompt associated with the root directory:

```console
dotnet add package SkiaSharp --version 2.88.0
```

Now head over to the `CatWorx.BadgeMaker.csproj` file to see if the package was included properly, as shown in the following example:

```xml
<Project Sdk="Microsoft.NET.Sdk">

  <PropertyGroup>
    <OutputType>Exe</OutputType>
    <TargetFramework>net6.0</TargetFramework>
    <ImplicitUsings>enable</ImplicitUsings>
    <Nullable>enable</Nullable>
  </PropertyGroup>

  <ItemGroup>
    <PackageReference Include="SkiaSharp" Version="2.88.0" />
  </ItemGroup>

</Project>
```

Now let's run the app from the root directory and see if we successfully imported the template into the application. By looking into the data directory, we should now see an image file called `employeeBadge.png`.

Success! We were able to import the badge template and create a new image file! While the image itself isn't very impressive, this marks an essential step. Now let's work on modifying the image and customizing the graphics. For now remove the code that we added in the `MakeBadges()` method, as we will need to make some modifications in the next sections.

Your `MakeBadges()` method should now look like the following:

```c#
public static void MakeBadges(List<Employee> employees)
{
  
}
```

## Build the Badges

Next, we'll be inserting the employee information into the badge template, to complete the second pseudocode step in this section. To do this, we'll need another tool from the .NET Core that will allow us to import or download the employee information from the employee list. For this, we'll use the `HttpClient` class.

This is an essential and powerful tool to have in your C# tool belt. This package can also be used to send HTTP requests, read files, download webpages, and upload data from a resource using a multitude of methods.

To use the `HttpClient` class, we can either use the fully specified name `System.Net.Http.HttpClient` or add the `using` directive to include the namespace `System.Net.Http`. In this case, we've decided to include the namespace for simplicity and readability.

Add the following code to the `Util.cs` file:

```c#
using System;
using System.IO;
using System.Collections.Generic;
using System.Net.Http;
using SkiaSharp;
```

Now that we can use the `HttpClient` in the application, let's take a moment to explore the power and utility of this class.

> **Deep Dive**
>
> Refer to the [Microsoft Docs on the HttpClient class](https://docs.microsoft.com/en-us/dotnet/api/system.net.http.httpclient?view=net-6.0) and these [examples of using HttpClient in a .NET Console app](https://zetcode.com/csharp/httpclient/).

In the following expression, we will create a new instance, `client`, of the `HttpClient` class:

```c#
HttpClient client = new HttpClient();
```

Because importing files and downloading photos will consume a lot of memory, `HttpClient` will be a resource hog in the application.

.NET has a special statement that allows this resource to be removed once the code has finished running. Can you remember what this statement is?

> **Hint**
>
> You used it for the `StreamWriter` class in the last section.

Go ahead and insert that statement into the `MakeBadges()` method:

```c#
public static void MakeBadges(List<Employee> employees)
{
  // instance of HttpClient is disposed after code in the block has run
  using(HttpClient client = new HttpClient())
  {

  }
}
```

The rest of the code for this section should reside in this function block. Thanks to .NET Core's `using` method, the resource dedicated in the parentheses will be disposed of after the code in the block has run, freeing up this memory after use.

Now let's take a moment and think about the steps needed to complete the badge formatting:

1. Place the employee picture onto the badge template.

2. Write the company name.

3. Write the employee name.

4. Write the employee id number.

5. Create a new file.

To access all the information for each employee in the employee list, what type of function would you use to iterate through it?

> **Hint**
>
> How do you loop through an array in JavaScript?

That's right&mdash;a `for` loop! Let's implement a `for` loop into the function block. Add the following code:

```c#
using(HttpClient client = new HttpClient())
{
  for (int i = 0; i < employees.Count; i++)
  {

  }
}
```

Remember that the employees list was inputted as the argument of this `MakeBadges()` method, which allows us to access the employees list within the context of this `Util` method.

Now that we have access to the list on an object instance level, we'll be able to retrieve the employee information to populate the badge.

In the next section, we'll make the necessary file and URL conversions into the data type and class instances necessary to make modifications to the badge template.

## Render the Employee Photo

To render the employee photo onto the badge template, we'll need to successfully achieve a few smaller objectives. First we need the image file and photo URL to be converted to objects that can be manipulated in the `SKImage` class, as detailed in the following steps:

1. Convert the photo URL into `SKImage`.

2. Convert badge template into `SKImage`.

3. Place the images onto a canvas.

So first, let's get each employee photo and turn it into an `SKImage` stored in a variable called `photo`. Luckily, we created an instance method in the `Employee` class called `GetPhotoUrl()` that will get the `PhotoUrl` property of the employee instance.

Now before starting to code this step, let's determine some of the particular methods we might need to use to convert the photo URL into an `SKImage`:

1. Convert the URL into a `Stream`.

2. Convert this `Stream` into an `SKImage`.

The first method we'll use will be `HttpClient.GetStreamAsync()`. As the [Microsoft Docs on the HttpClient.GetStreamAsync method](https://docs.microsoft.com/en-us/dotnet/api/system.net.http.httpclient.getstreamasync?view=net-6.0) state, this "Sends a GET request to the specified Uri and returns the response body as a `Stream` in an asynchronous operation."

The second method will be the `SKImage.FromEncodedData()` that we used earlier. Recall, this method creates an `SKImage` from a `Stream`.

Now that we are going to implement an asynchronous method, we need to make some changes to some method declarations to allow for asynchronous processing.

The first method we need to change is the `MakeBadges()` method that we are working in now. We need to update it to look like the following:

```c#
async public static Task MakeBadges(List<Employee> employees) {
  using(HttpClient client = new HttpClient())
  {
    for (int i = 0; i < employees.Count; i++)
    {

    }
  }
}
```

In order to allow for asynchronous processing, we need to include the `async` keyword in the method name, which will allow us to use the `await` keyword within the method code block. An asynchronous method will have the return type of `Task` if the method does not return anything and the type `Task<TResult>` if it does, where `<TResult>` is replaced with the return type of the method.

In order to use the `Task` object, we need to include the following using statement within `Util.cs`:

```c#
using System.Threading.Tasks;
```

We will also need to include the following updates to the `Program.cs` Class:

```c#
using System.Threading.Tasks;

...

async static Task Main(string[] args)
{
    List<Employee> employees = GetEmployees();
    Util.PrintEmployees(employees);
    Util.MakeCSV(employees);
    await Util.MakeBadges(employees);
}

```

Notice, the return type of the `Main()` method is now `Task` as well, because our `Main()` method has no return type and would be `void` if it was not asynchronous. Note, we now include the `await` keyword when calling our `Util.MakeBadges()` method because it is now an asynchronous method.

> **Deep Dive**
>
> For more information, refer to the [Microsoft Docs on Asynchronous Programming](https://docs.microsoft.com/en-us/dotnet/csharp/async) and the [Microsoft Docs on the Async Return Types](https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/concepts/async/async-return-types).

## Insert the Image onto the Badge Template

Because we're dealing with an instance of the `HttpClient` as `client`, let's use it to call the `GetStreamAsync()` method and convert the `Stream` into an `SKImage`.

Add the following code:

```c#
using(HttpClient client = new HttpClient())
{
  for (int i = 0; i < employees.Count; i++)
  {
    SKImage photo = SKImage.FromEncodedData(await client.GetStreamAsync(employees[i].GetPhotoUrl()));
  }
}
```

Here we are using the `GetPhotoURL()` method on each `Employee` object in our `List`. We are then using the `GetStreamAsync()` method with the `await` keyword to tell the method to wait for this method to complete. We are then converting the `Stream` that is returned from the `GetStreamAsync()` method into an `SKImage` using the `FromEncodedData()` method.

Now that we've finished this step, how do we check whether we actually did anything?

> **Hint**
>
> One option is to use the `SKData.SaveTo()` method and `File.OpenWrite()` method to create an image file to ensure this step was done correctly.

All right, now type the following code into the block of your `for` loop:

```c#
using (HttpClient client = new HttpClient())
{
  for (int i = 0; i < employees.Count; i++)
  {
    SKImage photo = SKImage.FromEncodedData(await client.GetStreamAsync(employees[i].GetPhotoUrl()));
    
    SKData data = photo.Encode();
    data.SaveTo(File.OpenWrite("data/employeeBadge.png"));
  }
}
```

Now to run and test the application, we'll need an employee picture to enter at the command prompt for employee information. For testing purposes use the following URL: <http://placekitten.com/400/400>.

This file gets overwritten every time the application runs. How can we prevent an overwrite if we need to keep all the employee badge images? Keep this question in mind as we continue coding.

Let's move on to the second step: converting the badge template.

We actually accomplished this step already and checked the result. Replace `photo.Encode();` with the following statements:

```c#
using (HttpClient client = new HttpClient())
{
  for (int i = 0; i < employees.Count; i++)
  {
    SKImage photo = SKImage.FromEncodedData(await client.GetStreamAsync(employees[i].GetPhotoUrl()));
    SKImage background = SKImage.FromEncodedData(File.OpenRead("badge.png"));

    SKData data = background.Encode();
    data.SaveTo(File.OpenWrite("data/employeeBadge.png"));
  }
}
```

We changed the variable name to `background` to signify that the badge image will be the background image onto which we'll print the employee information.

Now that these image conversions are complete, it's time to tackle the third step. We need to temporarily comment out the `background.Encode()` statement and `data.SaveTo()` statement so that we can create the canvas where we'll place the images.

### Create an SKCanvas by Using the SKBitmap Class

We'll use the `SKBitmap` class to create a canvas to place the images and text. A **bitmap** is a representation of an image or graphic that uses **pixels**, or tiny dots of color, to create an image.

You'll find bitmaps everywhere, because pixels are used heavily in digital media, including television shows, monitors, cell phones, video games, and even some famous paintings.

> **Deep Dive**
>
> To learn more, see this [Art Institute of Chicago page on the painting "A Sunday on La Grande Jatte—1884"](https://www.artic.edu/artworks/27992/a-sunday-on-la-grande-jatte-1884).

The `SKBitmap` data type is very useful, as it allows the pixel count on the x-axis and y-axis of the 2D image to map placement and size precisely.

Let's create the canvas that we'll use to make the badge. To do that, we'll use the size constants that we will declare, as shown in the following code:

```c#
// Layout variables
int BADGE_WIDTH = 669;
int BADGE_HEIGHT = 1044;

using (HttpClient client = new HttpClient())
{
  for (int i = 0; i < employees.Count; i++)
  {
    SKImage photo = SKImage.FromEncodedData(await client.GetStreamAsync(employees[i].GetPhotoUrl()));
    SKImage background = SKImage.FromEncodedData(File.OpenRead("badge.png"));

    SKBitmap badge = new SKBitmap(BADGE_WIDTH, BADGE_HEIGHT);
  }
}
```

> **Note**
>
> The layout variables added at this step and that will be added later are pixel values that have been added to save the time and hassle of manual trial and error to determine the best values for a desired layout.

When we created a new `SKBitmap` instance, we had to initialize the size parameters. We chose the width and height of the `SKBitmap` to reflect the size of the badge.

Next we'll need to convert this `SKBitmap` into a `SKCanvas` object&mdash;so that we can use the `SKCanvas` methods to draw on the canvas, using the `DrawImage()` method. We've chosen to make `badge` the canvas where we'll make the graphical modifications (in other words, add pictures and text).

### Create an SKCanvas Object

The `SKCanvas` class acts much like a wrapper around the badge bitmap and allows direct graphical modifications to the badge.

Take a look at the Constructors section of the [Microsoft Docs on the SKCanvas Class](https://docs.microsoft.com/en-us/dotnet/api/skiasharp.skcanvas?view=skiasharp-2.80.2). Let's try using this constructor to create a new `SKCanvas`. How should it look?

> **Hint**
>
> For the correct syntax, refer to the [Microsoft Docs on the SKCanvas(SKBitmap) Constructor](https://docs.microsoft.com/en-us/dotnet/api/skiasharp.skcanvas.-ctor?view=skiasharp-2.80.2#skiasharp-skcanvas-ctor(skiasharp-skbitmap)).

Type out the following expression:

```c#
using (HttpClient client = new HttpClient())
{
  for (int i = 0; i < employees.Count; i++)
  {
    SKImage photo = SKImage.FromEncodedData(await client.GetStreamAsync(employees[i].GetPhotoUrl()));
    SKImage background = SKImage.FromEncodedData(File.OpenRead("badge.png"));

    SKBitmap badge = new SKBitmap(BADGE_WIDTH, BADGE_HEIGHT);
    SKCanvas canvas = new SKCanvas(badge);
  }
}
```

Now that the `SKCanvas` object has been created, we can use the methods in the `SKCanvas` class to insert images onto the badge.

Take another look at the [Microsoft Docs on the SKCanvas Class](https://docs.microsoft.com/en-us/dotnet/api/skiasharp.skcanvas?view=skiasharp-2.80.2) and see if you can find a method that will help you accomplish this goal. As you can see, there are many methods specific to drawing&mdash;especially shapes, images, and strings.

We'll use a method called `DrawImage()`. This method allows us to draw images onto the badge.

### Insert the Badge Template Image

Next, add the following highlighted code to insert a badge template `Image` object, named `background`, onto the badge:

```c#
using (HttpClient client = new HttpClient())
{
  for (int i = 0; i < employees.Count; i++)
  {
    SKImage photo = SKImage.FromEncodedData(await client.GetStreamAsync(employees[i].GetPhotoUrl()));
    SKImage background = SKImage.FromEncodedData(File.OpenRead("badge.png"));

    SKBitmap badge = new SKBitmap(BADGE_WIDTH, BADGE_HEIGHT);
    SKCanvas canvas = new SKCanvas(badge);

    canvas.DrawImage(background, new SKRect(0, 0, BADGE_WIDTH, BADGE_HEIGHT));
  }
}
```

Note the use of the `SKRect` class here. This special class is from `SkiaSharp` and allows us to allocate a position and size on the badge.

If we think back to constructors in JavaScript, we can examine the `SKRect` constructor's four arguments and think about how we'll instantiate a new object. The first two arguments indicate the coordinates for the upper-left corner of the rectangle: The first being the X coordinate of the upper-left corner, and the second being the Y coordinate of the upper-left corner. The next two arguments indicate the coordinates for the lower-right corner of the rectangle: the first being the X coordinate of the lower-right corner and the second being the Y coordinate of the lower-right corner.

> **Deep Dive**
>
> For more information, refer to the [Microsoft Docs on the SKRect Struct](https://docs.microsoft.com/en-us/dotnet/api/skiasharp.skrect?view=skiasharp-2.80.2).

To review, note that the `DrawImage()` method's arguments involved taking in an `SKImage` object, then using the `SKRectangle` object for placement and size.

### Insert the Employee Photo

Next, we'll insert the employee photo at the coordinates currently held by the placeholder image on the badge template, by adding the following code:

```c#
// Layout variables
int BADGE_WIDTH = 669;
int BADGE_HEIGHT = 1044;     

int PHOTO_LEFT_X = 184;
int PHOTO_TOP_Y = 215;
int PHOTO_RIGHT_X = 486;
int PHOTO_BOTTOM_Y = 517;

using (HttpClient client = new HttpClient())
{
  for (int i = 0; i < employees.Count; i++)
  {
    SKImage photo = SKImage.FromEncodedData(await client.GetStreamAsync(employees[i].GetPhotoUrl()));
    SKImage background = SKImage.FromEncodedData(File.OpenRead("badge.png"));

    SKBitmap badge = new SKBitmap(BADGE_WIDTH, BADGE_HEIGHT);
    SKCanvas canvas = new SKCanvas(badge);

    canvas.DrawImage(background, new SKRect(0, 0, BADGE_WIDTH, BADGE_HEIGHT));
    canvas.DrawImage(photo, new SKRect(PHOTO_LEFT_X, PHOTO_TOP_Y, PHOTO_RIGHT_X, PHOTO_BOTTOM_Y));
  }
}
```

This step allows us to insert the employee photo onto the `SKCanvas` object with specific location coordinates, as well as specific size dimensions using `SKRect`.

So how do we check that we're going in the right direction? We'll need to test the code.

### Test the Code

Save this image to a file, by adding the following code to the bottom of our `for` loop:

```c#
SKImage finalImage = SKImage.FromBitmap(badge);
SKData data = finalImage.Encode();
data.SaveTo(File.OpenWrite("data/employeeBadge.png"));
```

Notice, that we are able to use the `FromBitmap()` method on the `SKImage` class and pass in our `SKBitmap`. From there, we can use the same process as before to save the image.

Now let's check the image file to see if we were able to successfully input the employee picture onto the badge template. Run the application and create a single employee at the command prompt to create this badge image. Don't forget to include the URL for the employee test photo, you can use the same URL as before: `https://placekitten.com/400/400`.

Success!

You were able to create the image objects, transfer them onto a bitmap using the `SKCanvas` class, and then successfully place them with the correct size dimensions. Take a moment to bask in this accomplishment, knowing that your app is close to complete!

## Print Employee Information

In this section, we'll finish up the badge by inserting the text for each employee's information, including the company name, employee name, and employee id number.

Let's take another look at the [Microsoft Docs on the SKCanvas Class](https://docs.microsoft.com/en-us/dotnet/api/skiasharp.skcanvas?view=skiasharp-2.80.2) and see if we can find a method that will help us accomplish this goal. There are multiple drawing methods that allow us to draw shapes, images, and strings.

`DrawText()` sounds like the right method for this application. Take a minute to look over some examples in the [Microsoft Docs on the SKCanvas.DrawText method](https://docs.microsoft.com/en-us/dotnet/api/skiasharp.skcanvas.drawtext?view=skiasharp-2.80.2#skiasharp-skcanvas-drawtext(system-string-system-single-system-single-skiasharp-skpaint)).

As shown in the Overloads section of the documentation, a number of arguments are needed to format and style the string. Lets take a look at the one that looks like the following

```c#
DrawText(String, Single, Single, SKPaint);
```

This code draws the specified text string starting at the specified coordinates using an `SKPaint` object. The first argument specifies the text to be drawn. The second and third arguments give the X and Y coordinates that will be the origin of the text. You will notice these arguments take the type `Single`. This type is actually something we have seen before and is the same as the type `float`, in fact the `float` keyword is an alias for `System.Single`. See the [Microsoft Docs on Floating-Point Numeric Types](https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/builtin-types/floating-point-numeric-types) for more information about this. The final argument is an `SKPaint` object, which is an object we will use to define certain characteristics about the text we want to draw, such as color, font, font size, text alignment, and other specifications.

In the first step, let's try to print the company name onto the badge. How would we go about accessing the company name from the employee?

> **Hint**
>
> Look at the `Employee` class to see if there are any methods that could help us. We're still in a `for` loop, so what type of level scope are we on with the employee list?

We need to go back to the `Employee` class and add a function that will return the `CompanyName`. Add the following function to the `Employee` class:

```c#
public string GetCompanyName() {
  return "Cat Worx";
}
```

Because we're still in the `for` loop, we're on the object scope of the employee list and can access the instance method, `GetCompanyName()`, that we just added, as shown here:

```c#
employees[i].GetCompanyName();
```

Lets add an additional layout variable that we will need:

```c#
// Layout variables
int BADGE_WIDTH = 669;
int BADGE_HEIGHT = 1044;     

int PHOTO_LEFT_X = 184;
int PHOTO_TOP_Y = 215;
int PHOTO_RIGHT_X = 486;
int PHOTO_BOTTOM_Y = 517;

int COMPANY_NAME_Y = 150;
```

The second argument of the `DrawText()` method will be the X coordinate of the origin of the text to be drawn. Since we want this to be centered on the badge, we will compute the value to be half the width of the badge using `BADGE_WIDTH / 2f`. Adding the `f` suffix allows us to treat the 2 as a `float` and get a decimal for more precision since `BADGE_WIDTH` is an odd number. Without the `f` suffix, this value would be rounded to the nearest whole number since the `int` type cannot hold a decimal value.

The third argument of the `DrawText()` method will be the Y coordinate of the origin of the text to be drawn. This value is included in the layout variables and will be `COMPANY_NAME_Y`.

The fourth argument of the `DrawText()` method will be an `SKPaint` object. As mentioned previously, the `SKPaint` object will be used to define certain characteristics about the text we want to draw. Take a look at the [Microsoft Docs on the SKPaint object](https://docs.microsoft.com/en-us/dotnet/api/skiasharp.skpaint?view=skiasharp-2.80.2) for examples and a list of what you can do with this class. To create an `SKPaint` object and initialize it with the values we want to use for the company name text, add the following code:

```c#
SKPaint paint = new SKPaint();
paint.TextSize = 42.0f;
paint.IsAntialias = true;
paint.Color = SKColors.White;
paint.IsStroke = false;
paint.TextAlign = SKTextAlign.Center;
paint.Typeface = SKTypeface.FromFamilyName("Arial");
```

With this code, we are creating an instance of an `SKPaint` object and are altering the properties of the `SKPaint` instance to use the settings we want for drawing our company name text. We are altering the font, font size, color, alignment and a couple of other properties that you can read about in the [Microsoft Docs on the SKPaint object](https://docs.microsoft.com/en-us/dotnet/api/skiasharp.skpaint?view=skiasharp-2.80.2) if you want to learn more about any `SKPaint` properties.

Now that we have added everything we need for the `DrawText()` method to draw in the company name, go ahead and add these arguments into a `DrawText()` method call.

> **Important**
>
> The order of the arguments is critical!

When you're finished, your work should look like the following code, which should come just before the `finalImage` code and just after the `SKPaint` setup we just did:

```c#
// Company name
canvas.DrawText(employees[i].GetCompanyName(), BADGE_WIDTH / 2f, COMPANY_NAME_Y, paint);
```

Test the code to see if the company name appears in the right place.

Awesome. Now we just have a few more steps to finish the badge.

The next step will be to print the employee's name on the badge. Lets make the employee name text the color black as well. Try to do that on your own using only this additional layout variable:

```c#
// Layout variables
int BADGE_WIDTH = 669;
int BADGE_HEIGHT = 1044;     

int PHOTO_LEFT_X = 184;
int PHOTO_TOP_Y = 215;
int PHOTO_RIGHT_X = 486;
int PHOTO_BOTTOM_Y = 517;

int COMPANY_NAME_Y = 150;

int EMPLOYEE_NAME_Y = 600;
```

> **Hint**
>
> Leverage the previous step to fill out most of the arguments in the `DrawText()` method. Make sure that you are adding this code after the `DrawText()` method we used to draw the company name and before the `finalImage` saving code.

Using the previous step, shown in the following statement, we will use the `DrawText()` method again&mdash;but this time use the `GetFullName()` method to retrieve the employee name instead of the company name:

```c#
paint.Color = SKColors.Black;

// Employee name
canvas.DrawText(employees[i].GetFullName(), BADGE_WIDTH / 2f, EMPLOYEE_NAME_Y, paint);
```

The next step will be to print the employee id number to the page. For this step, we want to use the font Courier New instead of Arial. You will also need an additional layout variable:

```c#
// Layout variables
int BADGE_WIDTH = 669;
int BADGE_HEIGHT = 1044;     

int PHOTO_LEFT_X = 184;
int PHOTO_TOP_Y = 215;
int PHOTO_RIGHT_X = 486;
int PHOTO_BOTTOM_Y = 517;

int COMPANY_NAME_Y = 150;

int EMPLOYEE_NAME_Y = 600;

int EMPLOYEE_ID_Y = 730;
```

As before, the following new code should come before the `finalImage` saving code:

```c#
paint.Typeface = SKTypeface.FromFamilyName("Courier New");

// Employee ID
canvas.DrawText(employees[i].GetId().ToString(), BADGE_WIDTH / 2f, EMPLOYEE_ID_Y, paint);
```

Now let's run the program to check if the employee number printed correctly.

Let's run the application and create a single employee at the command prompt to create a badge image.

If the steps were followed correctly, we should have a badge image that looks similar to the following image:

![Example of the employee badge with the employee number, name, and picture.](./assets/lesson-4/image_10.png)

Excellent! Have you noticed that the file `employeeBadge.png` is being rewritten every time you run the application? This was okay for testing purposes, but if you need many badges, overwriting the badge image files won't serve the final objective of creating image files for many employee badges.

How can we implement a change to the code so that we can have individual files for every employee's badge image?

Try to code your solution.

> **Hint**
>
> Use string interpolation to insert the employee id number into the file name to differentiate each badge image file.

Refer to the following example:

```c#
data.SaveTo(File.OpenWrite("data/{0}_badge.png", employees[i].GetId());
```

Hm, this code is giving an error. It could be that the `OpenWrite()` method can't read the string interpolation. We need to convert the file name into a string before placing it into the `OpenWrite()` method argument.

See if you can figure out how to use `String.Format()` to output a file path that looks like `data/[id]_badge.png`.

When you're finished, your work should look like the following code:

```c#
string template = "data/{0}_badge.png";
data.SaveTo(File.OpenWrite(string.Format(template, employees[i].GetId())));
```

Now let's run this application and see if we were able to create the employee badges by creating multiple employees at the command prompt. See if different badges with the corresponding file names were created successfully in the `data` folder.

Excellent&mdash;great job! Take a moment to review some of the objectives that you accomplished in this section.

## Reflection

You put in an amazing effort to accomplish this lesson's main objective: to create a C# application that creates employee id badges. CatWorx leadership will be extremely happy with your contribution to their efforts to automate the badge-creation process.

In this lesson, you accomplished the following major tasks:

* Used pseudocode to break down each step ahead of time and outline your workflow.

* Researched and used classes and methods to manipulate images and text.

* Converted objects into more usable data types.

* Designated placement and size of images using `SKRect`.

* Created a new file with the `SaveTo()` method.

In the next and final lesson, we'll wrap up this project. To simulate a database full of many employees without manually needing to enter them one by one, we'll use an open API.

---

© 2025 edX Boot Camps LLC. Confidential and Proprietary. All Rights Reserved.
