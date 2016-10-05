# DashboardSolution
ASP.NET Core Plus Angular 2 Sample

This is an demo application that shows integration between ASP.Net Core and Angular 2.
It is a lot richer in functionality than the Tour of Heroes used by the offical Angular 2 Web Site.
As such is not a tutorial but an application that tries to demonstrate many of the features of the Angular 2 framework.

The project consist of a Visual Studio 2015 solution for ASP.NET Core.

In order to open and run the project you need to:

1- Ensure the node_modules folder is restored properly to reestablish the npm dependencies for Angular2 and other utilities.
This should happen automatically when you open the solution.

2- You need to create a local sql database and then change the default connection string to point to your local database.

3- After the database has been created. Open a command prompt window and run the following command: "dotnet ef database update".
This should update the database schema and creates the tables that support the data access layer for the application.


