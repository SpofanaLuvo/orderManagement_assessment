Setup Instructions

- Clone the following repo https://github.com/SpofanaLuvo/orderManagement_assessment.git

if you happen to clone the Reo and then come back to the solution after a few hours, please run "git pull" to update the repository;

- Navigate to the client project on your terminal and run "npm i" to install the dependencies.
- On your SQL server, create a database and name it “order_management”.
- Get your SQL Express server name, and append it to the connection string inside appsettings.json found in orderManagement.Server

Inside Visual Studio
• Install the following packages from the NuGet Package Manager: - Microsoft.AspNetCore.SpaProxy - Microsoft.EntityFrameworkCore - Microsoft.EntityFrameworkCore.SqlServer - Microsoft.EntityFrameworkCore.Tools - Microsoft.EntityFrameworkCore.Cors.
Open the NuGet Package Manager console and run the following command:
• Update-Database
On your SQL server, right-click on the order_management database, and add a script. Populate the Products table by running the script found inside the script.sql file.

- Ensure to set the project to use https so that the server can listen on port 7158
Start the server;
