## Introduction

By now, you've explored full-stack web development and several front-end and back-end tech stacks. And, you've explored the inner workings of JavaScript execution, performant web applications, the internet itself, and more.

We could easily stop there. But these days, the internet has become embedded in how we find new customers and interact with them. Companies thus need more than a website&mdash;they need a way to consistently, reliably, and economically deliver that website to consumers. So in this module, we'll examine how cloud computing has solved this problem&mdash;and caused a paradigm shift in how companies deliver web solutions to consumers.

We'll be working with an application called "Deep Thoughts," which allows users to post their thoughts. It uses MongoDB, Express.js, React, and Node.js, which makes it a MERN application. We'll deploy this app to the cloud and replace the back-end API with cloud resources to handle the storage, database, and computing.

We've chosen AWS to fulfill this role. We chose AWS over other providers, like Microsoft Azure or Google Cloud Platform, because AWS is currently the most comprehensive and widely adopted cloud platform. AWS offers the widest range of web services, a vast array of customers (from startups to enterprises), and an extensive free tier. We'll use AWS throughout this course.

> **Note**
>
> To integrate with AWS, you'll need to create an AWS account, which requires a credit card. However, you won't be charged any fees, because you'll use the free tier, which is available for a year. You'll also learn how to set up notifications for billing changes and how to protect your account. Additionally, you will be creating and using a private GitHub repository so that your repository is not searchable or open to the public.

The following image shows an example of the deployed Deep Thoughts application:

![A screenshot depicts three cards, each containing a user post that includes the date, the time, and an image.](./assets/lesson-1/100-home-page.png)

In this lesson, we'll explain the economics of cloud computing, set up an AWS account, analyze the core services that AWS makes available, and configure the AWS Command Line Interface (CLI) with access keys.

Remember that a solid grasp of emerging technologies can help you stand out to job recruiters! Learning new technologies and skills is crucial for solving the kinds of problems that web developers and IT administrators face every day.

## Preview

The goals of this lesson are to introduce AWS as a cloud services provider and to set up our Deep Thoughts project in AWS.

To get there, we’ll follow this game plan:

1. Set up the project.

2. Introduce cloud computing.

3. Set up an AWS account (including billing preferences and security).

4. Explore AWS services (particularly those on the free tier).

5. Create and access an Amazon S3 bucket.

> **Note**
>
> The front-end code for this project will be provided so that we can focus on the necessary permissions and connection patterns for integrating AWS.

Let's get started!

## Set Up the Project

Before we write any code, let's set up the project in AWS, Git, and GitHub.

### Set Up the GitHub Repository and Issues

In GitHub, create a new private repository called `aws-thought`. You will create a private repository because we'll be working with AWS credentials and we do not want our repository to be searchable or viewable by the public.

Then create the following GitHub issues to capture the work ahead:

```md
**Title:** Create an AWS account

**User Stories**

* As a developer, I want to be able to view the management console in AWS.

* As a developer, I want to manage my IAM role.

* As a developer, I want to set up a billing alert.
```

```md
**Title:** Set up API endpoints

**User Stories**

* As a developer, I need to create a route to query all the thoughts.

* As a developer, I need to create a route to query all the thoughts from a user.

* As a developer, I need to create a route to create a thought.
```

```md
**Title:** Integrate the database calls into the front end

**User Stories**

* As a user, I want to view all the thoughts.

* As a user, I want to be able to create a new thought.

* As a user, I want to view thoughts of a user
```

```md
**Title:** Add Images to the Application

**User Stories**

* As a user, I want to add an image to my thought.

* As a user, I want to see all images.

* As a user, I want to view images of a user
```

```md
**Title:** Deploy the app to an EC2 instance

**User Stories**

* As a user, I want to be able to visit the app on a public URL.
```

Next, we'll download the code for the front end.

### Download the Starter Code, and Add It to GitHub

Now let's download the starter code for the Deep Thoughts application by following these steps:

1. Download the [zipped project folder](https://static.fullstack-bootcamp.com/continuation-courses/aws/module-1/aws-thought.zip) that contains the starter code. Unzip the code and place it into your working directory. We'll add this to your GitHub repo next. Open the `starter` folder and check to see if there's a folder named `server` inside. If not, create a folder named `server`. Before moving on, confirm that you now have both `client` and `server` folders inside the `starter` directory.

   > **Note**
   >
   > The name of the unzipped project folder is `starter`. This `starter` folder will be the root folder in your project workspace as you work through this module.

2. In GitHub, copy the URL for the `aws-thought` repo.

3. Return to the project files on your computer and initialize Git in the working directory that contains the starter code.

4. Use the following command to connect the local directory and the GitHub repo:

   ```bash
   git remote add origin https://github.com/<githubname>/aws-thought.git
   ```

   Replace `<githubname>` in the preceding statement with your GitHub username.

5. Now that we've established version control for the project, let's create a development branch to isolate the work. Checkout to the `develop` branch, then checkout to a branch called `feature/s3-setup`.

### Create a Gitignore File

We'll be generating a lot of files that don't need to be committed with Git, so the first thing you must do on your new feature branch is create a `.gitignore` file.

Open the `.gitignore` file and add the following lines:

```text
# See https://help.github.com/articles/ignoring-files/ for more about ignoring files.

# dependencies
/node_modules
/.pnp
.pnp.js

# testing
/coverage

# production
/build

# misc
.DS_Store
.env.local
.env.development.local
.env.test.local
.env.production.local

npm-debug.log*
yarn-debug.log*
yarn-error.log*
```

Make sure to also create the `.gitignore` file with the code above in both the "client" folder as well as the "server" folder. In total, you should have three `.gitignore` files in your repository.

Okay, now that we've completed the initial project setup, let's learn a bit more about cloud computing!

## Introduce Cloud Computing

In the previous step, we set up the project. In this step, we'll introduce cloud computing.

Before we start integrating web services into the Deep Thoughts application, we'll explore cloud computing a bit to better understand the context and terminology.

Before the cloud came into existence, companies hosted their web applications using **on-premises** servers. Depending on the amount of traffic that a company handles, this can be quite costly. Consider how many servers would be required to handle the amount of traffic that's occurring online these days, with companies like Facebook and Uber handling hundreds of thousands of requests per second. That's a lot of requests&mdash;and a lot of servers! So many, in fact, that some companies maintain server farms, called **data centers**, like the one that the following image shows:

![An illustration of a data center, which consists of several large buildings.](./assets/lesson-1/200-data-center.png)

Although most companies don't need this level of capacity, it can still be a challenge to design an IT system that can accommodate exactly the right server capacity. Hardware costs, rental space, and utilities have to be considered, as well as maintenance and data center operators to oversee both software and hardware. A static system like this also makes it difficult to scale up, and sunk costs can hinder scaling down when necessary. What's more, potential system crashes can add to all of these expenses. A crashed website can cost even average-sized companies roughly $100,000 per hour! As a result, on-premises solutions are cost-prohibitive for many small companies.

Fortunately, with advancements in internet speed, cloud computing has become a viable solution. **Cloud computing** is the on-demand availability of computer system resources through the internet, which enables companies to use remote data centers to serve applications on a pay-as-you-go basis.

**The cloud** refers to servers that are accessed through the internet. For example, when you back up images on your phone to the cloud, the photos aren't stored on-premises (in other words, on your phone) but in a remote server connected via the internet. Many email services use the cloud too, allowing you to send and receive hundreds or even thousands of messages at any time. In this way, cloud storage serves as a reliable backup that preserves data even if you lose or break your device.

> **Deep Dive**
>
> For more information, refer to the [AWS article about cloud computing](https://aws.amazon.com/what-is-cloud-computing/).

Cloud computing offers flexible capacity so that a remote data center's servers can be added or removed based on the demands of the application. This makes large-scale computing more affordable, even for small companies. The following image illustrates the advantages of cloud computing over on-premises solutions:

![An illustration compares on-premises and cloud computing regarding effort and costs.](./assets/lesson-1/300-cloud-v-premise.png)

As the preceding image shows, on-premises computing requires 9 percent of the total costs up front, and these come from software licenses. By contrast, cloud computing requires 68 percent of the total costs up front, and these come from subscription fees. However, the hidden, ongoing costs of on-premises computing exceed those of cloud computing. Specifically, on-premises computing has costs for implementation customization, training, hardware, IT personnel, and maintenance. By contrast, cloud computing has hidden, ongoing costs only for implementation customization and training.

That is, with cloud computing, many costs that relate to purchasing and maintaining servers are deferred to a usage-based subscription fee. This approach relieves the initial cost burden and the time and energy that would be spent on planning a fixed-cost system that might not even be used.

With cloud computing, a company can instead focus on their core competencies and shift the administrative infrastructure and IT work onto a cloud provider. Managers don't have to worry about costly server failures anymore, because cloud providers replicate their code on redundant systems, guaranteeing to provide 99.999% uptime (Source: [AWS/Amazon](https://aws.amazon.com/blogs/publicsector/achieving-five-nines-cloud-justice-public-safety/#:~:text=The%20accepted%20availability%20standard%20for,system%20must%20work%20seamlessly%20together.)).

Another key advantage is that cloud computing leverages not just a single data center but a global infrastructure of data centers that can serve consumers at previously unthinkable speeds. Such a comprehensive network of data centers allows even a small company to serve performant applications globally.

### Deployment Models

If all of this seems too good to be true, you have a right to be skeptical. Cloud computing isn't the single right solution for every situation. In many cases, cloud computing isn't the best option, for several reasons.

For one thing, certain industries like healthcare, finance, and government require more rigorous security measures because of the sensitive nature of the information they store. A breach of this type of data can lead to national security concerns or other serious problems. Advancements in technology have helped reduce the extent of data breaches, but security should remain a major concern for all cloud users.

Adherence to security protocol is ultimately the best safeguard against data breaches, because most occur due to human error. That said, cloud computing offers different deployment models to accommodate varying security concerns, including private clouds, public clouds, and hybrid clouds:

* When security is a top concern, a **private cloud** provides more security than a public cloud, but less than an on-premises server. The private cloud has specific access points that only certain devices or IP addresses can enter.

* The **public cloud**, on the other hand, can be accessed from any device through any IP address.

* And as you might imagine, a **hybrid cloud** combines features of public and private clouds&mdash;which is useful for organizations like a government agency that needs both high security to store private data and a public-facing interface for the community.

> **Deep Dive**
>
> For more information, review the [Wikipedia page on cloud computing security](https://en.wikipedia.org/wiki/Cloud_computing_security).

Note that numerous cloud providers offer these deployment models for a subscription fee. Although we've chosen AWS, any one of them would meet the needs for the project that we're tackling.

### Service Models

Cloud providers offer many types of computer resources, because the needs of applications are wide-ranging. Cloud providers also offer many levels of service depending on how much time, energy, and control is available. Let's explore a few.

#### Platform as a Service (PaaS)

Imagine that Company A does not have the extra personnel, time, or desire to configure their own cloud solution. They might have a very simple application that won't strain resources, so they would like a solution right out of the box. The best service model in this scenario would be a **Platform as a Service**, or **PaaS**.

Heroku is an example of a PaaS. When we want to deploy an app on Heroku, we don't need to specify computer system requirements; we simply connect the GitHub repo and optimize the build for deployment. PaaS models are built for developers that don't have an IT administrative background and just want to plug-and-play.

> **Nerd Note**
>
> Heroku is actually built on top of AWS and uses their public cloud.

#### Software as a Service (SaaS)

**SaaS**, or **Software as a Service**, is another popular service model. The difference between PaaS and SaaS is that SaaS is for end users. In the PaaS model, the application is served to users through the cloud, which runs the application and stores the user's data, typically for a subscription fee. GitHub is an example of a SaaS, as many companies pay GitHub to secure their source code and use their tools. The repos are stored in the cloud, and the interface connects users to their accounts. Other popular SaaS companies include Zoom, Microsoft Office, Adobe, Salesforce, DoorDash, and Peloton. E-commerce sites are often not thought of as SaaS due to the difference in the business model and the exchange of hard goods.

The meteoric rise and success of companies that use the SaaS business model illustrates the extent to which cloud computing is a powerful economic vehicle that can scale globally to reach millions of consumers and handle this load efficiently. The amazing profit margins that a SaaS company can attain demonstrates the economic feasibility of using cloud computing to deliver software solutions in a consistent and reliable manner.

#### Infrastructure as a Service (IaaS)

Although there are many more service models, the last one we'll cover is **Infrastructure-as-a Service**, or **IaaS**. This model is used mainly by IT administrators and developers who are savvy with computer systems. IaaS resembles PaaS but offers more control in choosing computer system requirements such as operating system, networking, middleware, and runtime environments. IaaS provides the lowest level of control of the computer resources available in the cloud. This enables resources to be more easily scaled to meet customer demands, and it allows greater cost control.

> **Deep Dive**
>
> To learn more, refer to the [Wikipedia page on aaS](https://en.wikipedia.org/wiki/As_a_service).

Now that we have more context in the role of cloud computing in web development, let's start setting up the web services for our app!

## Set Up an AWS Account

In the previous step, we introduced cloud computing. In this step, we'll set up an AWS account.

To begin, we must first create an AWS account by navigating to the [AWS sign-up page](https://aws.amazon.com/free/), shown in the following image:

![A screenshot depicts the AWS Free Tier page, which has a button named Create a Free Account.](./assets/lesson-1/500-aws-signup.png)

This brings us right to the AWS Free Tier page. Although we're using the free tier, we will still be prompted for a credit card. Don't worry&mdash;we will take measures to ensure that you're aware of your usage so that you can prevent any accidental charges to your credit card!

> **Important**
>
> In order to ensure we are not charged for going over the Free Tier limits or for using an AWS service that is not covered by the Free Tier, we will set up billing and budget alerts, as well as terminate any AWS resources we used at the end of a module.

Follow these steps to set up your account:

1. Select Create a Free Account.

2. Fill in the form with the following information:

   * Email address

   * Password

   * Confirm password

   * AWS account name

3. Select Continue, which will take you to a new form.

4. For the account type, select Personal.

5. Fill out the form with your information.

6. Check the box to agree with the AWS Customer Agreement.

7. Select Create Account and Continue, which will take you to the Payment Information form.

8. Input your credit card information on the Payment Information form.

9. Choose whether you want the account verification sent to you by email or text. Once the verification code has been entered, you'll be redirected to the Support Plan.

10. Click Free to select the Basic Plan. You'll be directed to the Welcome to Amazon Web Services page. You've successfully created an AWS account!

11. Select the "Go to the AWS Management Console" button, which will redirect you to the sign-in page.

12. We'll sign in with the root user email, so choose that link (located under the Sign In button).

13. Verify that the root user has been selected, and enter the root user email address.

14. Select Next.

15. Enter the password.

16. Select Sign In.

If you've been redirected to the AWS Management Console, you've entered your account page! This is the main hub that can connect to all the AWS services as well as information on tutorials, documentation, and help.

> **Important**
>
> Having problems signing in? Select the "Forget your Password" link to create a new password.

As you can see, the AWS ecosystem is very big. There are more than 175 web services to choose from, spanning many different categories. Before we go much further, let's create billing alerts to safeguard the account against unintended charges.

### Set Up Your Billing Preferences

From the AWS Management Console, go to the menu bar and select "Billing Dashboard" under your account name, as shown in the following image:

![A screenshot points out My Billing Dashboard from your account name drop-down menu.](./assets/lesson-1/600-billing-dashboard.png)

As shown in the preceding image, we'll be redirected to another page, where we can see the spend summary and expense reports.

Select "Billing preferences", located on the left side menu, as shown in the following image:

![A screenshot points out "Billing preferences" on the navigation menu.](./assets/lesson-1/700-billing-preferences.png)

Select the following preferences:

* Receive PDF Invoice By Email

* Receive Free Tier Usage Alerts

* Receive Billing Alerts

Then save these preferences.

By selecting these preferences, you'll be alerted if you get charged for services beyond the Free Tier.

### Set Up Your Budget Alerts

While we are in the Billing & Cost Management dashboard, let's set up a budget alert so that we are notified **before** we incur any charges.

Select "Budgets", located on the left-side menu, and then select the "Create budget" button.

Follow these steps to set up the budget alert:

1. Select "Cost budget" and click "Next".

2. Under the "Set budget amount", set the "Period" dropdown to "Monthly".

3. For "Budget effective date", select "Recurring budget" and choose the current month as the "Start month".

4. Select "Fixed" under "Choose how to budget" and enter an amount for the "Budgeted amount". For example, if you want to be alerted when your estimated charges are over $1, enter `1.00` for "Enter your budgeted amount ($)", as shown in the following image:

   ![A screenshot depicts $1.00 in the "Budgeted amount" box on the "Set your budget" page.](./assets/lesson-1/710-budget-amount.png)

5. Under "Details", name the budget, such as "Monthly AWS budget" and click "Next".

6. You'll be taken to the "Configure alerts" page. From here click the "Add an alert threshold" button.

7. Set the alert threshold trigger to "Forecasted" and alert threshold at "100% of budgeted amount". This means that the threshold is set based on "Forecasted cost" when it is greater than 100% ($1.00).

8. Enter the email address where the budget notification will be sent. The alert threshold configurations should look like the following image:

   ![A screenshot depicts the final "Alert #1" page.](./assets/lesson-1/720-budget-threshold.png)

9. Select "Next" to save your changes and select "Next" again.

10. Review the budget details and alert settings. If everything looks correct, select "Create budget".

> **Important**
>
> As discussed previously, cloud computing delivers computing resources on a pay-as-you-go method. AWS has set up the Free Tier with a number of services that offer a sample of either time, memory, or requests. Once the initial free sample has been used, charges will begin to incur. To understand exactly how much time, storage, or requests are available, visit the [AWS Free Tier webpage](https://aws.amazon.com/free/?all-free-tier.sort-by=item.additionalFields.SortRank&all-free-tier.sort-order=asc). The free tier is only available for one year. After that, some of the services will begin to incur fees.

Excellent work. You've set up the project starter code, created an AWS account, and set up alerts to guard against charges.

The next step is to set up the permissions, so let's navigate back to the Management Console.

### Set Up AWS Security

We're almost finished setting up the AWS account, but we still have another important task to accomplish: creating the AWS IAM user. **IAM** stands for **Identity and Access Management**. This is the system that AWS has devised to set up permissions for their web services.

> **Deep Dive**
>
> For more information, refer to the [AWS documentation on IAM identities, users, groups, and roles](https://docs.aws.amazon.com/IAM/latest/UserGuide/id.html).

As discussed previously, having an effective security system in place is an integral part of using the cloud. AWS achieves this by having the IAM only allow access according to the services using IAM roles or grant permission to users with IAM users. An IAM group is a set of service permissions that an IAM user can be assigned to, for quick access.

#### Activate Two-Step Authentication

First we need to follow best practices by creating an MFA authentication step for the root user account. To do that, follow these steps:

1. To begin, let's navigate to the IAM console by typing "IAM" in the services input field.

2. Select IAM to navigate to the IAM Dashoboard.

3. In the Security Alert section, we'll see a warning that requests an MFA to be enabled. Select "Add MFA".

4. You'll then be taken to the "Your Security Credentials" page. From here, click the "Activate MFA" button.

5. Select "Virtual MFA device", then click "Continue".

6. Add the Google Authenticator app to your phone.

7. Once the app has been downloaded, scan the QR code or enter the code given into Google Authenticator.

8. Insert two consecutive MFA codes into the input fields.

Once the MFA authentication has been accepted, we can rest assured that even if the email and password to the AWS account are compromised, this extra layer of security will prevent illicit access.

#### Create an AWS IAM User

The next step is to create a new user. According to the AWS documentation, "Don't use your AWS account root user credentials to access AWS, and don't give your credentials to anyone else. Instead, create individual users for anyone who needs access to your AWS account."

> **Deep Dive**
>
> For more information, refer to the [AWS documentation on security best practices in IAM](https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html).

Follow these steps to create an IAM user:

1. In the IAM console Dashboard, select the Users option in the left-hand menu.

2. Select Add user.

3. Enter the User name in the input field. **Make sure to also copy down this information somewhere, as you do with other usernames and passwords.**

4. For Access type, select "Access key - Programmatic access" and "Password - AWS Management Console access".

5. Select "Custom Password" and create a password for this user. **Make sure to also copy down this information somewhere, as you do with other usernames and passwords.**

6. Uncheck "Require password reset" and click "Next: Permissions".

7. In the Set permission section, select "Create group".

8. In the Group name input field, type Admins.

9. Check the box for Administrator Access.

10. Select the "Create group" button to add this user to the Admins security group.

11. Select "Next: Tags".

12. Select "Next: Review".

13. Select "Create user".

#### Safeguard the Access Key ID

Now that the admin user has been created, the AWS Access Key ID and the AWS Secret Access Key for your IAM user have been created. Safeguard this information and keep it in a secure, retrievable location.

> **Important**
>
> You'll need this information later to configure the AWS CLI!

To send the access key ID to yourself, follow these steps:

1. Select the "Send email" link to send yourself the login instructions as well as the sign-in URL and IAM username.

2. Click on your username located in the menu bar on top.

3. In the drop-down menu copy the Account ID 12-digit number and save it as it will be used to login.

### Log In as the IAM User

Now that we've created a new user, we need to log out as the root user (admin) and log back in as the IAM user that we just created. The root user should not be used for daily operations, as it creates too much of a security risk.

Go ahead and log out, then log back in using the account ID, IAM username, and password for the user you just created.

Good work. Although that process might have seemed long and tedious, keeping a record of permissions, access keys, usernames, and passwords will keep your account safe.

> **Important**
>
> IAM users are easy to remove and replace, but a root user isn't replaceable&mdash;so keep it safe!

## Explore AWS Services

In the previous step, we set up an AWS account. In this step, we'll explore AWS services.

Let's return to the AWS Management Console to explore the services that are available to us. To do so, select the AWS logo in the top-left menu bar.

Now let's examine the AWS services available by expanding the "All services" item under "AWS Services". You can see that a wide selection of services are available. The categories include Developer Tools, Databases, Machine Learning, Storage, Compute, Internet of Things (IoT), and much more.

In this module, we'll focus on the following three categories of services:

* The **Compute** category offers services that allow computer systems to be provisioned to run applications, calculate complex calculations, and respond to requests.

* The **Storage** category offers services that store data in the cloud.

* The **Database** category includes relational and non-relational databases that can be used to store and query large amounts of data.

> **Important**
>
> Although these services seem pretty ordinary, they are built for scalability. For example, unlike a storage device like DropBox or iCloud, S3 can handle up to 5,500 requests per second. The S3 database services are also built to scale exponentially without losing any performance.

As you explore these categories, you'll notice that they contain several types of services from which to choose. This might seem incredibly daunting due to the breadth of options. You'll soon find that the services in each category actually have many similarities, with some slight variations.

> **Important**
>
> For every web service that AWS offers, there is a console for that service. We can interface and manage the service through the console to check permissions or view the status or data.

### Amazon S3

As a case in point, let's look at the Storage service category. Amazon **S3**, which stands for **Simple Storage Service**, was one of the original services that AWS launched in 2006. S3 provides 5 GB of memory in the Free Tier, and it stores files on their computing systems, which you can access if you have the correct permissions. These files can be accessed anywhere with a convenient link for downloading. Often referred to as an **S3 bucket**, this storage resource can handle many requests per second.

Another service, Amazon **S3 Glacier**, is designed for long-term storage. Downloads take longer (sometimes hours), but this service is much less expensive. The main distinction of S3 Glacier is the availability and speed at which we can access the stored files.

For our purposes, we'll use an S3 bucket.

## Create and Access an Amazon S3 Bucket

In the previous step, we explored AWS services. In this step, we'll create and access an Amazon S3 bucket.

Now that we've successfully set up an AWS account, it's time to integrate a web service into the Deep Thoughts application. We'll begin by creating an S3 bucket, which we'll use to store static assets. Although we could use the S3 console to create and manage the resource, instead we'll focus on how to use an AWS npm package to access the web service programmatically in the Deep Thoughts application.

### Install the Node.js Dependencies

Follow these steps to install the Node.js dependencies:

1. In the command prompt, navigate to the root directory of the Deep Thoughts application.

2. Run the command `npm install` to download the dependencies to the `node_modules` folder from npm.

Next, we'll install the AWS command-line interface.

### Install the AWS CLI

The AWS CLI lets you configure the access keys and communicate with the various web services directly from the command line. Follow the instructions for your operating system (macOS or Windows).

#### Install the AWS CLI on macOS

On macOS, follow these steps to install AWS CLI:

1. Download the [AWS CLI installer for macOS](https://awscli.amazonaws.com/AWSCLIV2.pkg).

2. Double-click the downloaded file to launch the installer.

3. Install to the recommended location: `/usr/local/aws-cli`. This might require an OS password for `sudo` write permissions.

4. The installer automatically creates a symlink at `/usr/local/bin/aws` that links to the main program in the installation folder mentioned in the preceding step.

5. Verify a successful installation by running the following command:

   ```bash
   aws --version
   ```

That's all there is to it!

#### Install the AWS CLI on Windows

On Windows, follow these steps to install the AWS CLI:

1. Download the [AWS CLI MSI installer for Windows (64-bit)](https://awscli.amazonaws.com/AWSCLIV2.msi).

2. Run the downloaded MSI installer and follow the on-screen instructions. By default, the AWS CLI installs to `C:\Program Files\Amazon\AWSCLIV2`.

3. To verify the installation, open the Start menu, search for `cmd` to open a command-prompt window, and at the command prompt use the `aws --version` command.

> **Deep Dive**
>
> If Windows can't find the program, you might need to close and reopen the command-prompt window to refresh the path or add the installation directory to your PATH environment variable manually.
>
> For more information, refer to the [AWS documentation on adding the installation directory to your command-line path](https://docs.aws.amazon.com/cli/latest/userguide/install-windows.html#awscli-install-windows-path).

### Configure Your AWS Credentials

Next we'll set up the AWS CLI by running the following command:

```bash
aws configure
```

This will open a prompt at the command line that looks similar to the following:

```bash
$ aws configure
AWS Access Key ID [None]: AKIAIOSFODNN7EXAMPLE
AWS Secret Access Key [None]: wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY
Default region name [None]: us-east-2
Default output format [None]: json
```

Replace the preceding values with your own values for the AWS Access Key ID and the AWS Secret Access Key for your IAM user.

Notice that the value for the **region name** is `us-east-2`. This region points to area availability zones located in Ohio. Each region is a separate geographic area. **Availability zones**, however, are isolated locations within each region. **Local zones** enable you to place resources, such as compute and storage, in multiple locations closer to your end users. Although the `us-east-2` region might not be the one closest to you, you'll use it throughout this course for consistency.

One of the major benefits of cloud computing is leveraging the vast infrastructure systems of a cloud provider. With the global reach of AWS, we can connect to users by orders of magnitude faster due to the number of data centers AWS uses throughout the world. There are six regions in the US currently, with more being built at a steady rate around the globe.

> **Deep Dive**
>
> To learn more, review the [AWS documentation on global infrastructure](https://aws.amazon.com/about-aws/global-infrastructure/).

High performance and speed is relative to the distance that the request must travel from the data center. For example, when an S3 bucket is created, we must designate a region so that AWS knows which data center contains the S3 bucket.

> **Important**
>
> Different regions will have different access to services. So if you have trouble finding a web service you created, you might be in the wrong region.

### Create the Interface between Node.js and AWS

In this step, we'll use the `aws-sdk` package to interface with AWS from the Node.js application. This package is a **software development kit**, or **SDK**.

Follow these steps to start using the AWS SDK:

1. Create a new folder called `server` in the root directory of the Deep Thoughts application if you have not done so already.

2. In this folder, create a file named `create-bucket.js`.

3. In VS Code, open `create-bucket.js` and add the following expression at the top of the file:

   ```js
   // Load the AWS SDK for Node.js
   const AWS = require('aws-sdk');
   ```

   This package is responsible for the API that allows the application to communicate with the web service.

4. Import the `uuid` package to create a unique S3 bucket name by adding the following code to `create-bucket.js`:

   ```js
   const { v4: uuidv4 } = require('uuid');
   ```

5. Next, add the following statement to configure the region:

   ```js
   // Set the region
   AWS.config.update({ region: 'us-east-2' });
   ```

   The region must be updated to communicate with the web service.

6. Create the S3 service object by adding the following expression:

   ```js
   // Create S3 service object
   const s3 = new AWS.S3({ apiVersion: '2006-03-01' });
   ```

   The preceding expression creates the `s3` instance object with the designated API. By specifying the API version, we ensure that the API library we're using is compatible with the following commands.

7. Next, create the `bucketParams` object that assigns the metadata of the bucket (such as the bucket name) by adding the following code:

   ```js
   // Create the parameters for calling createBucket
   var bucketParams = {
     Bucket: 'user-images-' + uuidv4(),
   };
   ```

8. Now we'll call the `s3` instance object to create an S3 bucket using the `bucketParams`&mdash;by adding the following code:

   ```js
   // call S3 to create the bucket
   s3.createBucket(bucketParams, (err, data) => {
     if (err) {
       console.log('Error', err);
     } else {
       console.log('Success');
     }
   });
   ```

   In the preceding statement, we used a callback function with the `createBucket` method and the `bucketParams` object to create an S3 bucket.

9. Now let's download the NPM packages to the `node_modules` directory with the following command:

   ```bash
   npm install aws-sdk uuid
   ```

10. Now run the `create-bucket.js` file at the command line from the server directory of the Deep Thoughts application, as follows:

    ```bash
    node create-bucket.js
    ```

    You should see a success message in the command line if you've successfully created a new S3 bucket.

11. Let's verify that the bucket was created by going to the S3 console from the AWS Management Console in the browser, where we should see something like the following image:

    ![A screenshot depict an S3 bucket, named user-images, that's listed in the S3 console.](./assets/lesson-1/800-user-images.png)

Congratulations, you've just connected to your first web service. With a successful connection, you confirmed that `aws-sdk` could use the credentials that you configured, using the AWS CLI to communicate with S3. This technique allows you to use the keys without exposing them in the code.

### Commit Your Changes, and Close the GitHub Issue

Before we forget, let's close the GitHub issue, add and commit the work, and then merge the `feature/s3-setup` branch into the `develop` branch before moving on to the next feature.

Soon we'll build on this setup by using `aws-sdk` and the AWS CLI to interface with AWS to form the back end of the Deep Thoughts application.

## Reflection

You did a great job of completing a conceptual lesson that also contained lots of setup and configuration! The latter part was vital to protect the source code, the data, and the account itself.

In this lesson, you accomplished the following:

* Explained the economics of cloud computing.

* Set up an AWS account.

* Analyzed the core services that AWS makes available.

* Configured the AWS CLI with access keys.

Now that we created an S3 bucket, we'll use it to store static files after we set up the database. The next step will be to model the data&mdash;so that AWS can reproduce the back-end operations for storing and querying user data.

---

© 2025 edX Boot Camps LLC. Confidential and Proprietary. All Rights Reserved.
