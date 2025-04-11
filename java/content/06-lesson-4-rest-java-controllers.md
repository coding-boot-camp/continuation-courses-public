## Introduction

You've learned a serious amount of foundational Java concepts so far. You've created entity models and repository interfaces, and you've configured your database and Spring Session&mdash;allowing you to actually run your Java API. And thanks to all of that up-front work, your database, tables, and relationships were all created when you ran the API for the first time!

Now we'll create the server-side CRUD controllers. When we talk about **controllers** in Spring Boot Java, we're referring to how we'll process requests and responses both to and from the API. This concept is comparable to routes in Express.js, but the execution will differ in Java. The controllers that we create will manage the processing flow of the API.

Along the way, you'll learn how to do the following:

* Create the CRUD REST controllers that receive incoming data, process the transaction, and respond to that request.

* Manage the API routing through REST and the Spring `@RestController` classes.

* Test out new API endpoints with Insomnia.

Now let's look at the plan for creating this crucial piece of the Just Tech News API.

## Preview

The goal for this lesson is to create the controllers that will manage the server-side CRUD commands. We'll create the `UserController`, `PostController`, and `CommentController`, using  class-level and method-level annotations. We'll apply the RESTful standards that we've already learned and use Insomnia to test transactions and the CRUD controllers.

To accomplish all this, we'll complete the following steps:

1. Create the `UserController`.

2. Create the `PostController`.

3. Create the `CommentController`.

4. Create Insomnia JSON/REST test transactions for the CRUD controllers.

Time to write some code!

## Create the Server-Side CRUD Controllers

You probably recall that **CRUD** refers to the four basic functions of persistent storage: **create**, **read**, **update**, and **delete**. You'll create a controller to handle each of these methods for the API; each one will be associated with a model that you've created already. Essentially, the controllers give functionality to the models. 

With that in mind, let's make the first controller!

### Create the UserController

Navigate to IntelliJ. In the left-hand file navigation, select the `com.technews` package, which will be nested in the `src` folder, under `main` and then `java`. Create a new Java class like you've done before. Name the new class `controller.UserController`, as shown in the following image:

![Under New Java Class, the Class option is highlighted, and the user has entered controller.UserController at the top.](./assets/lesson-4/100-new-class.png)

The code for this new class should look like the following example:

```java
package com.technews.controller;

public class UserController {
   
}
```

For this class, we'll use a Spring annotation called `@RestController` that will allow it to process JSON/XML responses and send JSON/XML objects via the API&mdash;which will be vital for the controller's functionality. With that annotation, the basic class should look like the following example:

```java
package com.technews.controller;

import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {

}
```

Excellent. Now let's add the CRUD methods that will allow us to actually create, read, update, and delete information to and from the database! Copy and paste the following code into the controller:

```java
@Autowired
UserRepository repository;

@Autowired
VoteRepository voteRepository;

@GetMapping("/api/users")
public List<User> getAllUsers() {
  List<User> userList = repository.findAll();
  for (User u : userList) {
    List<Post> postList = u.getPosts();
    for (Post p : postList) {
        p.setVoteCount(voteRepository.countVotesByPostId(p.getId()));
    }
  }
  return userList;
}

@GetMapping("/api/users/{id}")
public User getUserById(@PathVariable Integer id) {
  User returnUser = repository.getById(id);
  List<Post> postList = returnUser.getPosts();
  for (Post p : postList) {
    p.setVoteCount(voteRepository.countVotesByPostId(p.getId()));
  }

  return returnUser;
}

@PostMapping("/api/users")
public User addUser(@RequestBody User user) {
  // Encrypt password
  user.setPassword(BCrypt.hashpw(user.getPassword(), BCrypt.gensalt()));
  repository.save(user);
  return user;
}

@PutMapping("/api/users/{id}")
public User updateUser(@PathVariable int id, @RequestBody User user) {
  User tempUser = repository.getById(id);

  if (!tempUser.equals(null)) {
    user.setId(tempUser.getId());
    repository.save(user);
  }
  return user;
}

@DeleteMapping("/api/users/{id}")
@ResponseStatus(HttpStatus.NO_CONTENT)
public void deleteUser(@PathVariable int id) {
  repository.deleteById(id);
}
```

Okay, that's a lot of code. Let's break it down and review all the different pieces, starting with Spring-specific annotation:

* The `@Autowired` annotation tells Spring to scan the project for objects that will need to be instantiated for a class or method to run. Unlike the `new` operator, which instantiates all objects before they're necessarily needed, `@Autowired` informs Spring to only instantiate each object as needed by the program. Then it can grab and inject the proper dependencies without having to manually wire anything in the XML. This form of dependency injection improves efficiency and keeps the program light.

Now we'll review the GET requests, as follows:
 
* The `@GetMapping("/api/users")` annotation on the `getAllUsers()` method combines the route `("/api/users")` and the type of HTTP method used (GET), providing the method with a unique endpoint. 

* In the body of the `getAllusers()` method, we set the return type to `List<User>`, because we want it to return a list of users. 

  > **Note** 
  >
  > Remember, all methods without the `void` keyword must have a return type.

* Calling the inherited `findAll()` method on the `repository` object, we can get a list of users and assign it to the `userList` variable. 

* Next we call the `getPosts()` function for every `User`, assigned to the variable `u` inside `userList`. That function won't work until we finish setting up the `PostController`. At that point, we'll iterate over each post, invoking the `setVoteCount()` method, passing in the `countVotesByPostId()` method, and finally using `getId()` to obtain the id of the post. 

* Instead of returning a list, the `getUserById()` method will only return a single user. 
  
Let's move on to the POST requests, as follows:

* The `addUser()` method that's annotated with `PostMapping("/api/users")` will allow us to add a user to the database. Inside the definition of the `addUser()` method, we pass in the `@RequestBody` annotation&mdash;which will map the body of this request to a transfer object, then deserialize the body onto a Java object for easier use.  

* The `setPassword()` method offers protection to users. We'll use `BCrypypt` to encrypt the passwords for new users. After encryption, we save the new `user` and then return the newly created `user.`

The final two routes (PUT and DELETE) are straightforward: 

* The `updateUser()` method (annotated by `@PutMapping`) allows us to update a user based on a specific id. The `@PathVariable` will allow us to enter the `int id` into the request URI as a parameter, replacing the `/{id}` in `@PutMapping("/api/users/{id}")`.  

* Lastly, for DELETE, we use the `@PathVariable` to pass in an `int` to the request URI. Then, based on that specific id, we'll delete the associated user.

Wow, we've completed a lot of work at this point! We just need to set up the `PostController` and the `CommentController`, and then we can run some tests via Insomnia. The code for each controller is pretty similar, so you can take the code provided and enter it into the newly created class. 

### Create the PostController

Let's create the `PostController` first. On the left-hand file navigation of IntelliJ, select the `controller` package and create a new class called `PostController`. Copy and paste the following code into your newly created class file:

```java
package com.technews.controller;

import com.technews.model.Post;
import com.technews.model.User;
import com.technews.model.Vote;
import com.technews.repository.PostRepository;
import com.technews.repository.UserRepository;
import com.technews.repository.VoteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@RestController
public class PostController {

  @Autowired
  PostRepository repository;

  @Autowired
  VoteRepository voteRepository;

  @Autowired
  UserRepository userRepository;

  @GetMapping("/api/posts")
  public List<Post> getAllPosts() {
    List<Post> postList = repository.findAll();
    for (Post p : postList) {
      p.setVoteCount(voteRepository.countVotesByPostId(p.getId()));
    }
    return postList;
  }


  @GetMapping("/api/posts/{id}")
  public Post getPost(@PathVariable Integer id) {
    Post returnPost = repository.getById(id);
    returnPost.setVoteCount(voteRepository.countVotesByPostId(returnPost.getId()));

    return returnPost;
  }


  @PostMapping("/api/posts")
  @ResponseStatus(HttpStatus.CREATED)
  public Post addPost(@RequestBody Post post) {
    repository.save(post);
    return post;
  }


  @PutMapping("/api/posts/{id}")
  public Post updatePost(@PathVariable int id, @RequestBody Post post) {
    Post tempPost = repository.getById(id);
    tempPost.setTitle(post.getTitle());
    return repository.save(tempPost);
  }


  @PutMapping("/api/posts/upvote")
  public String addVote(@RequestBody Vote vote, HttpServletRequest request) {
    String returnValue = "";

    if(request.getSession(false) != null) {
      Post returnPost = null;

      User sessionUser = (User) request.getSession().getAttribute("SESSION_USER");
      vote.setUserId(sessionUser.getId());
      voteRepository.save(vote);

      returnPost = repository.getById(vote.getPostId());
      returnPost.setVoteCount(voteRepository.countVotesByPostId(vote.getPostId()));

      returnValue = "";
    } else {
      returnValue = "login";
    }

    return returnValue;
  }


  @DeleteMapping("/api/posts/{id}")
  @ResponseStatus(HttpStatus.NO_CONTENT)
  public void deletePost(@PathVariable int id) {
    repository.deleteById(id);
  }
}
```

For the most part, the `PostController` is structured very similarly to the `UserController`. The `getAllPosts()` and `getPost()` methods serve the same functions as `getAllUsers()` and `getUser()`&mdash;they'll retrieve multiple posts and a single post, respectively. 

The main difference here from `UserController` is the `addVote()` function. Because every post can be upvoted, we have to track the votes cast for each post. The `addVote()` method handles that functionality.

### Create the CommentController

Now we can create the `CommentController`! Once we've finished creating this method, we can move on to testing with Insomnia.

On the left-hand file navigation of IntelliJ, select the `controller` package and create a new class called `CommentController`. Copy and paste the following code into your newly created class file: 

```java
package com.technews.controller;

import com.technews.model.Comment;
import com.technews.repository.CommentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class CommentController {

  @Autowired
  CommentRepository repository;

  @GetMapping("/api/comments")
  public List<Comment> getAllComments() {
    return repository.findAll();
  }


  @GetMapping("/api/comments/{id}")
  public Comment getComment(@PathVariable int id) {
    return repository.getById(id);
  }


  @PostMapping("/api/comments")
  @ResponseStatus(HttpStatus.CREATED)
  public Comment createComment(@RequestBody Comment comment) {
    return repository.save(comment);
  }


  @PutMapping("/api/updateComment")
  public Comment updateComment(@RequestBody Comment comment) {
    return repository.save(comment);
  }


  @DeleteMapping("/api/comments/{id}")
  @ResponseStatus(HttpStatus.NO_CONTENT)
  public void deleteComment(@PathVariable int id) {
    repository.deleteById(id);
  }
}
```

This controller is much simpler than the previous two. Using the `@Autowired` annotation, we assign the `CommentRepository` and store it in a variable called `repository`. Then we use `@GetMapping`, `@PutMapping`, `@PostMapping`, and `@DeleteMapping` to create basic methods that will get one comment, get all of the comments, save a new comment, or delete comments. 

That's it! But before you move on, push all of your work up to GitHub as usual, using the following Git workflow:

```git
git add .
git commit -m "message"
git push origin main 
```

## Create Insomnia JSON/REST Test Transactions for the CRUD Controllers

Now that we've coded all this functionality, how do we test it? We can't test POST routes the same way that we can test GET routes using a browser, but we can use an application called Insomnia instead. 

You've used Insomnia before, so you should already have it downloaded. Open the application, and you should see a screen that resembles the following image:

![The Insomnia window displays three blank columns for managing requests, making requests, and viewing response data.](./assets/lesson-4/200-insomnia-main.jpg)

Insomnia allows users to import a JSON file of preconstructed test transactions, to help keep testing between teammates, departments, and other groups consistent across machines. After you finish writing a suite of tests in Insomnia, you can export the file and use it as needed. 

We'll use such a file, then import it into the Insomnia application. First, though, let's review the basic structure of the JSON for an Insomnia test file. 

To begin, you need to create the JSON file. Navigate to IntelliJ and right-click at the root of your project in the left-hand file navigation menu. Select New, then File, and enter the name `insomnia.json`. Paste the following code inside this file:

```json
{
  "_type": "export",
  "__export_format": 4,
  "__export_date": "2020-11-30T18:04:19.138Z",
  "__export_source": "insomnia.desktop.app:v2020.4.2",
  "resources": [
    {
      "_id": "req_a448c3f558b54948b329812d24645bca",
      "parentId": "fld_9a0c7dd086f045b69c6442e234990f72",
      "modified": 1606759408368,
      "created": 1606759408368,
      "url": "http://localhost:8082/api/users",
      "name": "POST - Java - Create User",
      "description": "",
      "method": "POST",
      "body": {
        "mimeType": "",
        "text": "{\n  \"username\": \"rwTest4\",\n  \"email\": \"rwtest4@email.com\",\n  \"password\": \"pass4444\"\n}"
      },
      "parameters": [],
      "headers": [
        {
          "name": "Content-Type",
          "value": "application/json"
        }
      ],
      "authentication": {},
      "metaSortKey": -1606758078085,
      "isPrivate": false,
      "settingStoreCookies": true,
      "settingSendCookies": true,
      "settingDisableRenderRequestBody": false,
      "settingEncodeUrl": true,
      "settingRebuildPath": true,
      "settingFollowRedirects": "global",
      "_type": "request"
    },
    {
      "_id": "fld_9a0c7dd086f045b69c6442e234990f72",
      "parentId": "wrk_d9d2a1f4cc00402185a673e2c1484f23",
      "modified": 1606759408377,
      "created": 1606759408303,
      "name": "Just Tech News Java",
      "description": "",
      "environment": {},
      "environmentPropertyOrder": null,
      "metaSortKey": -1000000000,
      "_type": "request_group"
    },
    {
      "_id": "wrk_d9d2a1f4cc00402185a673e2c1484f23",
      "parentId": null,
      "modified": 1576868547125,
      "created": 1576868547125,
      "name": "Insomnia",
      "description": "",
      "scope": null,
      "_type": "workspace"
    },
    {
      "_id": "req_3e481792fbdf4cb594797b53bded6263",
      "parentId": "fld_9a0c7dd086f045b69c6442e234990f72",
      "modified": 1606759408364,
      "created": 1606759408364,
      "url": "http://localhost:8082/api/users",
      "name": "GET - Java - Get All Users",
      "description": "",
      "method": "GET",
      "body": {},
      "parameters": [],
      "headers": [],
      "authentication": {},
      "metaSortKey": -1606758078081,
      "isPrivate": false,
      "settingStoreCookies": true,
      "settingSendCookies": true,
      "settingDisableRenderRequestBody": false,
      "settingEncodeUrl": true,
      "settingRebuildPath": true,
      "settingFollowRedirects": "global",
      "_type": "request"
    },
    {
      "_id": "req_f0ed80e3bd90463199bc64175fa6d237",
      "parentId": "fld_9a0c7dd086f045b69c6442e234990f72",
      "modified": 1606759408360,
      "created": 1606759408360,
      "url": "http://localhost:8082/api/users/1",
      "name": "GET - Java - Get User By Id",
      "description": "",
      "method": "GET",
      "body": {},
      "parameters": [],
      "headers": [],
      "authentication": {},
      "metaSortKey": -1606758078078,
      "isPrivate": false,
      "settingStoreCookies": true,
      "settingSendCookies": true,
      "settingDisableRenderRequestBody": false,
      "settingEncodeUrl": true,
      "settingRebuildPath": true,
      "settingFollowRedirects": "global",
      "_type": "request"
    },
    {
      "_id": "req_67fb401aa905461a916b41185a115eda",
      "parentId": "fld_9a0c7dd086f045b69c6442e234990f72",
      "modified": 1606759408357,
      "created": 1606759408357,
      "url": "http://localhost:8082/api/users/1",
      "name": "PUT- Java - Update User",
      "description": "",
      "method": "PUT",
      "body": {
        "mimeType": "",
        "text": "{\n    \"username\": \"Rich Widtmann\",\n    \"email\": \"rwidtmann@email.com\",\n    \"password\": \"pass9999\",\n    \"posts\": []\n}"
      },
      "parameters": [],
      "headers": [
        {
          "name": "Content-Type",
          "value": "application/json"
        }
      ],
      "authentication": {},
      "metaSortKey": -1606758078075,
      "isPrivate": false,
      "settingStoreCookies": true,
      "settingSendCookies": true,
      "settingDisableRenderRequestBody": false,
      "settingEncodeUrl": true,
      "settingRebuildPath": true,
      "settingFollowRedirects": "global",
      "_type": "request"
    },
    {
      "_id": "req_722e37a385ce40f2b923a07a87c13596",
      "parentId": "fld_9a0c7dd086f045b69c6442e234990f72",
      "modified": 1606759408353,
      "created": 1606759408353,
      "url": "http://localhost:8082/api/users/238",
      "name": "DELETE - Java - Delete a User",
      "description": "",
      "method": "DELETE",
      "body": {},
      "parameters": [],
      "headers": [],
      "authentication": {},
      "metaSortKey": -1606758078072,
      "isPrivate": false,
      "settingStoreCookies": true,
      "settingSendCookies": true,
      "settingDisableRenderRequestBody": false,
      "settingEncodeUrl": true,
      "settingRebuildPath": true,
      "settingFollowRedirects": "global",
      "_type": "request"
    },
    {
      "_id": "req_5ad450a8118e43fcaca70fcd6d655137",
      "parentId": "fld_9a0c7dd086f045b69c6442e234990f72",
      "modified": 1606759408348,
      "created": 1606759408348,
      "url": "http://localhost:8082/api/users/login",
      "name": "POST - Java - Login Request",
      "description": "",
      "method": "POST",
      "body": {
        "mimeType": "",
        "text": "{\n  \"email\": \"msmith@email.com\",\n  \"password\": \"pass2222\"\n}"
      },
      "parameters": [],
      "headers": [
        {
          "name": "Content-Type",
          "value": "application/json"
        }
      ],
      "authentication": {},
      "metaSortKey": -1606758078069,
      "isPrivate": false,
      "settingStoreCookies": true,
      "settingSendCookies": true,
      "settingDisableRenderRequestBody": false,
      "settingEncodeUrl": true,
      "settingRebuildPath": true,
      "settingFollowRedirects": "global",
      "_type": "request"
    },
    {
      "_id": "req_cbb951f1fdd74954acce79a162075d2c",
      "parentId": "fld_9a0c7dd086f045b69c6442e234990f72",
      "modified": 1606759408344,
      "created": 1606759408344,
      "url": "http://localhost:8082/api/posts",
      "name": "POST - Java - Create Post",
      "description": "",
      "method": "POST",
      "body": {
        "mimeType": "",
        "text": "{\n  \"title\": \"MSNBC Post 1\",\n  \"postUrl\": \"https://msnbc.com\",\n  \"userId\": 1\n}"
      },
      "parameters": [],
      "headers": [
        {
          "name": "Content-Type",
          "value": "application/json"
        }
      ],
      "authentication": {},
      "metaSortKey": -1606758078065,
      "isPrivate": false,
      "settingStoreCookies": true,
      "settingSendCookies": true,
      "settingDisableRenderRequestBody": false,
      "settingEncodeUrl": true,
      "settingRebuildPath": true,
      "settingFollowRedirects": "global",
      "_type": "request"
    },
    {
      "_id": "req_bb15059b53b74e37b2660cf8da294660",
      "parentId": "fld_9a0c7dd086f045b69c6442e234990f72",
      "modified": 1606759408339,
      "created": 1606759408339,
      "url": "http://localhost:8082/api/posts",
      "name": "GET- Java - Get All Posts",
      "description": "",
      "method": "GET",
      "body": {},
      "parameters": [],
      "headers": [],
      "authentication": {},
      "metaSortKey": -1606758078062,
      "isPrivate": false,
      "settingStoreCookies": true,
      "settingSendCookies": true,
      "settingDisableRenderRequestBody": false,
      "settingEncodeUrl": true,
      "settingRebuildPath": true,
      "settingFollowRedirects": "global",
      "_type": "request"
    },
    {
      "_id": "req_04d6225b6aec4eacacfa49fa34a4e8f1",
      "parentId": "fld_9a0c7dd086f045b69c6442e234990f72",
      "modified": 1606759408336,
      "created": 1606759408336,
      "url": "http://localhost:8082/api/posts/84",
      "name": "GET- Java - Get a Post",
      "description": "",
      "method": "GET",
      "body": {},
      "parameters": [],
      "headers": [],
      "authentication": {},
      "metaSortKey": -1606758078059,
      "isPrivate": false,
      "settingStoreCookies": true,
      "settingSendCookies": true,
      "settingDisableRenderRequestBody": false,
      "settingEncodeUrl": true,
      "settingRebuildPath": true,
      "settingFollowRedirects": "global",
      "_type": "request"
    },
    {
      "_id": "req_3304fd84d53f4fbd8ff1a7a969ef3fb5",
      "parentId": "fld_9a0c7dd086f045b69c6442e234990f72",
      "modified": 1606759408332,
      "created": 1606759408332,
      "url": "http://localhost:8082/api/posts/84",
      "name": "PUT - Java - Update a Post Title",
      "description": "",
      "method": "PUT",
      "body": {
        "mimeType": "",
        "text": "{\n  \"title\": \"Post 1 - edited 9\"\n}"
      },
      "parameters": [],
      "headers": [
        {
          "name": "Content-Type",
          "value": "application/json"
        }
      ],
      "authentication": {},
      "metaSortKey": -1606758078056,
      "isPrivate": false,
      "settingStoreCookies": true,
      "settingSendCookies": true,
      "settingDisableRenderRequestBody": false,
      "settingEncodeUrl": true,
      "settingRebuildPath": true,
      "settingFollowRedirects": "global",
      "_type": "request"
    },
    {
      "_id": "req_bececb0e5850413bae847dc0e7d7f8c5",
      "parentId": "fld_9a0c7dd086f045b69c6442e234990f72",
      "modified": 1606759408324,
      "created": 1606759408324,
      "url": "http://localhost:8082/api/posts/85",
      "name": "DELETE - Java - Delete a Post",
      "description": "",
      "method": "DELETE",
      "body": {},
      "parameters": [],
      "headers": [],
      "authentication": {},
      "metaSortKey": -1606758078053,
      "isPrivate": false,
      "settingStoreCookies": true,
      "settingSendCookies": true,
      "settingDisableRenderRequestBody": false,
      "settingEncodeUrl": true,
      "settingRebuildPath": true,
      "settingFollowRedirects": "global",
      "_type": "request"
    },
    {
      "_id": "req_f2482bcfb6d04d179c3a0006ec1388de",
      "parentId": "fld_9a0c7dd086f045b69c6442e234990f72",
      "modified": 1606759408320,
      "created": 1606759408320,
      "url": "http://localhost:8082/api/posts/upvote",
      "name": "PUT - Java - Upvote",
      "description": "",
      "method": "PUT",
      "body": {
        "mimeType": "",
        "text": "{\n  \"userId\": 2,\n  \"postId\": 5\n}"
      },
      "parameters": [],
      "headers": [
        {
          "name": "Content-Type",
          "value": "application/json"
        }
      ],
      "authentication": {},
      "metaSortKey": -1606758078049,
      "isPrivate": false,
      "settingStoreCookies": true,
      "settingSendCookies": true,
      "settingDisableRenderRequestBody": false,
      "settingEncodeUrl": true,
      "settingRebuildPath": true,
      "settingFollowRedirects": "global",
      "_type": "request"
    },
    {
      "_id": "req_08fe8ecf9d7a4c089c102f1bfaa85c77",
      "parentId": "fld_9a0c7dd086f045b69c6442e234990f72",
      "modified": 1606759408317,
      "created": 1606759408317,
      "url": "http://localhost:8082/api/comments",
      "name": "POST - Java - Create Comment",
      "description": "",
      "method": "POST",
      "body": {
        "mimeType": "",
        "text": "{\n    \"commentText\": \"Comment 87\",\n    \"userId\": 1,\n    \"postId\": 221\n}"
      },
      "parameters": [],
      "headers": [
        {
          "name": "Content-Type",
          "value": "application/json"
        }
      ],
      "authentication": {},
      "metaSortKey": -1606758078046,
      "isPrivate": false,
      "settingStoreCookies": true,
      "settingSendCookies": true,
      "settingDisableRenderRequestBody": false,
      "settingEncodeUrl": true,
      "settingRebuildPath": true,
      "settingFollowRedirects": "global",
      "_type": "request"
    },
    {
      "_id": "req_2c77e3e9e4134c93b5ac480c51b45c65",
      "parentId": "fld_9a0c7dd086f045b69c6442e234990f72",
      "modified": 1606759408313,
      "created": 1606759408313,
      "url": "http://localhost:8082/api/comments",
      "name": "GET - Java - Get All Comments",
      "description": "",
      "method": "GET",
      "body": {},
      "parameters": [],
      "headers": [],
      "authentication": {},
      "metaSortKey": -1606758078044,
      "isPrivate": false,
      "settingStoreCookies": true,
      "settingSendCookies": true,
      "settingDisableRenderRequestBody": false,
      "settingEncodeUrl": true,
      "settingRebuildPath": true,
      "settingFollowRedirects": "global",
      "_type": "request"
    },
    {
      "_id": "req_ebfaebf49924402dabf30acb85eeb1c6",
      "parentId": "fld_9a0c7dd086f045b69c6442e234990f72",
      "modified": 1606759408310,
      "created": 1606759408310,
      "url": "http://localhost:8082/api/comments/33",
      "name": "GET - Java - Get a Comment",
      "description": "",
      "method": "GET",
      "body": {},
      "parameters": [],
      "headers": [],
      "authentication": {},
      "metaSortKey": -1606758078041,
      "isPrivate": false,
      "settingStoreCookies": true,
      "settingSendCookies": true,
      "settingDisableRenderRequestBody": false,
      "settingEncodeUrl": true,
      "settingRebuildPath": true,
      "settingFollowRedirects": "global",
      "_type": "request"
    },
    {
      "_id": "req_463b36b65e284451ba4dde05a7259851",
      "parentId": "fld_9a0c7dd086f045b69c6442e234990f72",
      "modified": 1606759408306,
      "created": 1606759408306,
      "url": "http://localhost:8082/api/comments/239",
      "name": "DELETE - Java - Delete a Comment",
      "description": "",
      "method": "DELETE",
      "body": {},
      "parameters": [],
      "headers": [],
      "authentication": {},
      "metaSortKey": -1606758078038,
      "isPrivate": false,
      "settingStoreCookies": true,
      "settingSendCookies": true,
      "settingDisableRenderRequestBody": false,
      "settingEncodeUrl": true,
      "settingRebuildPath": true,
      "settingFollowRedirects": "global",
      "_type": "request"
    },
    {
      "_id": "env_ce1fe27f0017edab2273f88a46a21383d0ed092d",
      "parentId": "wrk_d9d2a1f4cc00402185a673e2c1484f23",
      "modified": 1576868547149,
      "created": 1576868547149,
      "name": "Base Environment",
      "data": {},
      "dataPropertyOrder": null,
      "color": null,
      "isPrivate": false,
      "metaSortKey": 1576868547149,
      "_type": "environment"
    },
    {
      "_id": "jar_ce1fe27f0017edab2273f88a46a21383d0ed092d",
      "parentId": "wrk_d9d2a1f4cc00402185a673e2c1484f23",
      "modified": 1576868547154,
      "created": 1576868547154,
      "name": "Default Jar",
      "cookies": [],
      "_type": "cookie_jar"
    },
    {
      "_id": "spc_a997d4d15ded4c499c0e8e2f65ab8248",
      "parentId": "wrk_d9d2a1f4cc00402185a673e2c1484f23",
      "modified": 1606327643563,
      "created": 1606327643563,
      "fileName": "Insomnia",
      "contents": "",
      "contentType": "yaml",
      "_type": "api_spec"
    }
  ]
}
```

Now open your Insomnia app. Click the "Import from File" button on the main screen (as shown in the following image), and choose the `insomnia.json` file (where you just pasted the preceding code):

![In Insomnia, a red arrow points at the "Import from File" button near the middle of the screen.](./assets/lesson-4/300-import-file.png)

If prompted "How would you like to import "Insomnia"?", select "Request Collection". Once you import the file, you should be prompted with a success message, as shown in the following image:

![A modal with a white background indicates "Import Succeeded" and summarizes the contents of the import.](./assets/lesson-4/400-import-success.png)

Click "Ok", and you'll be brought back to the main screen of Insomnia. On the left side, you should see the heading Just Tech News Java, plus all of the different routes we'll test. It should look something like the following image:

![On the left side of the Insomnia window, the Get User By ID POST route is highlighted.](./assets/lesson-4/500-just-tech-news-java-insomnia.png)

Great! However, we need to run the API again before we actually use these tests. Navigate to IntelliJ and run your API. Once that's done, navigate back to Insomnia. 

First you'll test the POST route for creating users. On the left-side navigation of Insomnia, click the `POST - Java - Create User` route. You can update the body of the request to any username, email address, and password you want. Once you've selected that first POST route, press Send. See the following image for reference:

![On the left side of the Insomnia window, the Create User POST route is highlighted. The request appares on the right side of the screen, with a red arrow pointing at Send in the top right.](./assets/lesson-4/600-post-test.png) 

Once you've pressed Send, the right side of the screen will process the request (very quickly), and you should see the successful creation of your user, as shown in the following image:

![Insomnia indicates the successful creation of the user.](./assets/lesson-4/700-success-new-user.png) 

Keep in mind that some of the routes provided will require minor changes to function properly. Changing the `id` parameters will normally resolve that issue and allow the route tests to function.

## Reflection

We're making fantastic progress creating a Java API for the Just Tech News website. At this point we have a functioning API that's capable of starting up and connecting to the database; we can also interact with it, by sending Insomnia JSON requests. We created controllers that will receive, process, and route request transactions. Furthermore, we can validate that the routing and processing works properly for each of those test transactions.

In this lesson, you've successfully completed the following tasks:

* Created the CRUD REST controllers that are critical to receiving incoming data and then processing the transaction and responding appropriately to that request.

* Managed the API routing through REST and the Spring `@RestController` controller classes. 

Next, we'll create the Thymeleaf templates&mdash;an exciting portion of building the API that involves direct interaction with the user!

---

© 2025 edX Boot Camps LLC. Confidential and Proprietary. All Rights Reserved.
