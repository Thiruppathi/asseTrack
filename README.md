## asseTrack
Asset Management System

## Problem Description
QA Team uses various type of devices(assets) such as Mobile Phones, Tablets, Mac & PCs on a daily basis for testing WebApp/MobileApp.

Team Tracks these assets with following details through a mundane manual process.
- List of Available assets and their details. (Spreadsheet)
- Who is the owner and who holds responsibility of the asset. (Spreadsheet)
- Current status of the asset such as who has it, last user of the asset. (Paperwork using a Device Register)
- Date & Time of the asset CheckIn/CheckOut Details. (Paperwork using a Device Register)

Here is the list of problems with this process.
- No Control over the Spreadsheet info. Can't rely on this for concrete info.
- Paperwork is not reliable and maintainable
- Can't find the status of a asset quickly, without having access to the Device Register.
- If Device Register is gone, we loose all the details and historical data.

## Solution

The proposed solution is to track the assets through asseTrack - a Web Application.
Note that the solution is about automating the tracking process; not automating the secured way of CheckIn/CheckOut process.

### Proposed Features

Here is the list of features proposed for asseTrack.

| Features |
| :------------- |
| Create an Asset |
| Create a User |
| See List of Assets and their status |
| See List of Users and the details of the assets they have |
| Historical data of the CheckIn/CheckOut process of all assets |
| Search an asset based on Brand(Apple, Samsung), Platform(iOs, Android, Blackberry), Availability(CheckedIn/CheckedOut) |
| Search a user based on UserName, Project Name(DTO,ESP,V4), Practice(QA,Dev,AEM) |
| Create alerts to notify the availability of the device on slack |
| Authentication using oAuth(Google for MVP); Email Authentication for Final product |
| DashBoard to show the following details |
| No of Available devices (8/10) |
| List of users who didn't return the device. |
| Send an alert to the admin and the respective user, when an asset is not returned by EOD. (Push Notification/slack) |
| Display battery status of the device using BatteryAPI |
| Notify When a device is available |
| Preference to allow one user to checkout on behalf of another user |
| Preference to have list of favorite devices, preferences |
| Restrict Signup process through verification system |
| Have tabs for different kind of devices in Assets page e.g. iOs, android, tablet |
| Have tabs for different type of users in Users Page. e.g. Project, Practice, Company |
| Handle Mulitiple session and concurrent transaction|
| Enable offline support using service worker|
| Add Animation.css |
| Mobile Support and Splash Screen |
| Authentication & Authorisation |
| Add Easter Eggs - Arvy & Girls. :) |
| Add Comment Box before CheckedIn/checkout |

### Constraints/Dependencies
- User has to CheckOut through asseTrack when he takes an asset for usage.
- User has to CheckIn through asseTrack when he returns an asset.

## MVP
The task is to create a MVP(Minimal Viable Product) in 32 Hours, which should have the MVP features listed here.

| Features | Due Date | Status |
| :------------- | :------------- | :------------- |
| Create an Asset |21-Dec |✓|
| Create a User |21-Dec|✓|
| See List of Assets and their status |22-Dec|✓|
| See List of Users and the details of the assets they have |22-Dec|✓|
| CheckOut an Asset |22-Dec|✓|
| CheckIn an Asset |23-Dec|✓|
| Historical data of the CheckIn/CheckOut process of all assets |23-Dec|✓|
| Search an asset based on Brand (Apple/LG), OS (iOs/Android), Availability, Asset ID, IMEI |23-Dec|✓|
| Search a user based on UserName, Project(DTO,ESP), Practice(QA,Dev) |24-Dec|✓|
| Handle Mulitiple session and concurrent transaction| 24-Dec |✓|
| Enable offline support using service worker|24-Dec|✓|
| Mobile Support and Splash Screen | 24-Dec |✓|
| Authentication & Authorisation |24-Dec|✓|

Because of the time constraint, few of the features won't be available for MVP.


### List of Tasks
- UI Widgets Creation
- Responsive Pages
- Firebase DB Setup - Security rules.
- Data Migration from Spreadsheet to Firebase
