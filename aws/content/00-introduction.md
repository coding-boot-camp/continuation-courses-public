## Introduction to AWS

### Cloud Computing and AWS

All modern web applications revolve around data. With an ever-increasing number of users, many businesses and individuals struggle to maintain important information, programs, and systems on internal computer servers. Cloud computing offers a solution to this challenge, providing on-demand computer system resources like applications, data storage, and processing power&mdash;all typically delivered over the internet on a pay-as-you-go basis, and requiring no direct active management by the user.

The **cloud** is just another word for resources that are stored remotely on the internet. Whereas anything stored or saved directly on your computer is stored locally, anything that you access through an online, remote service is said to be stored in the cloud. Of course, these resources are actually stored on physical servers that users access through online services.

Cloud computing has been around since the late 90s, but its popularity has skyrocketed as data usage has grown. For example, you are probably already familiar with web-based email, such as Gmail, Hotmail, or Yahoo Mail, where users’ emails are stored on servers rather than their computers. This means that the user can check their email from any device with access to the internet. Other common examples include video streaming (Netflix, Prime Video, Hulu), file storage (Dropbox, Google Drive, iCloud), file sharing (Google Docs), and online backup (Carbonite).

These examples of cloud computing largely pertain to personal use, but what about companies that need to access large amounts of data over a secure online network connection? Cloud solutions that tailor their services to companies frequently follow the **aaS (as a service)** architecture, with three primary models: infrastructure as a service (IaaS), platform as a service (PaaS), and software as a service (SaaS). You don’t need to know the specifics of each of these models&mdash;just that the companies using them no longer have to set up infrastructure, install a platform, or install software on their local machines. Instead, they access the services through the internet.

**Amazon Web Services**, commonly known as **AWS**, is currently the most comprehensive and widely adopted cloud platform. It boasts the largest offering of web services, a vast array of customers ranging from startups to enterprise, and an extensive free tier of services.

In this course, you’ll refactor the existing MERN application Deep Thoughts, which allows users to sign up and create an account, post their thoughts, and share their thoughts and images with other users. You'll deploy this app to the cloud using AWS and replace the back-end API to use cloud resources for storage, database, and computing. To accomplish this, you’ll configure a database service with DynamoDB, store and retrieve static assets using S3, and deploy the app on an Ubuntu server to an EC2 instance.

Watch the following video to learn more about what you'll build:

<iframe src="https://fast.wistia.net/embed/iframe/nzwzw160y4?seo=false" title="Continuation Course: AWS Video" allow="autoplay; fullscreen" allowtransparency="true" frameborder="0" scrolling="no" class="wistia_embed" name="wistia_embed" allowfullscreen msallowfullscreen width="640" height="360"></iframe>

---

© 2025 edX Boot Camps LLC. Confidential and Proprietary. All Rights Reserved.
